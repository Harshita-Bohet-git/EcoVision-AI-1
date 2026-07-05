import path from "path";
import os from "os";
import multer, { MulterError } from "multer";
import type { Request, Response, NextFunction } from "express";

const ALLOWED_MIME_TYPES = ["image/jpeg", "image/png", "image/webp"];
const MAX_FILE_SIZE_BYTES = 10 * 1024 * 1024; // 10 MB

/**
 * Disk storage — files land in the OS temp directory and are cleaned up
 * by the OS on reboot (or can be explicitly deleted after processing).
 */
const storage = multer.diskStorage({
  destination(_req, _file, cb) {
    cb(null, os.tmpdir());
  },
  filename(_req, file, cb) {
    const ext = path.extname(file.originalname).toLowerCase() || ".jpg";
    const unique = `${Date.now()}-${Math.random().toString(36).slice(2)}`;
    cb(null, `ecovision-scan-${unique}${ext}`);
  },
});

const multerInstance = multer({
  storage,
  limits: { fileSize: MAX_FILE_SIZE_BYTES },
  fileFilter(_req, file, cb) {
    if (ALLOWED_MIME_TYPES.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Only JPEG, PNG, and WEBP images are accepted"));
    }
  },
});

/**
 * Middleware: parse a single `image` field from multipart/form-data.
 * Multer errors are converted to structured JSON 400 responses so the
 * caller always gets a predictable error shape instead of an HTML page.
 */
export function uploadImage(req: Request, res: Response, next: NextFunction) {
  multerInstance.single("image")(req, res, (err: unknown) => {
    if (!err) return next();

    if (err instanceof MulterError) {
      const message =
        err.code === "LIMIT_FILE_SIZE"
          ? `File exceeds the ${MAX_FILE_SIZE_BYTES / (1024 * 1024)} MB limit.`
          : `Upload error: ${err.message}`;
      res.status(400).json({ error: message });
      return;
    }

    if (err instanceof Error) {
      res.status(400).json({ error: err.message });
      return;
    }

    next(err); // unexpected — let the global error handler deal with it
  });
}
