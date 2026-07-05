import { Router, type IRouter, type Request, type Response, type NextFunction } from "express";
import multer, { MulterError } from "multer";

const router: IRouter = Router();

// Store uploads in memory — no disk writes needed since AI is not implemented yet
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB
  fileFilter(_req, file, cb) {
    const allowed = ["image/jpeg", "image/png", "image/webp"];
    if (allowed.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Only JPEG, PNG, and WEBP images are accepted"));
    }
  },
});

// Wraps multer.single() so its errors surface as controlled JSON 400s
// instead of Express's default HTML error pages or unstructured 500s.
function uploadSingle(field: string) {
  return (req: Request, res: Response, next: NextFunction) => {
    upload.single(field)(req, res, (err: unknown) => {
      if (!err) return next();

      if (err instanceof MulterError) {
        const message =
          err.code === "LIMIT_FILE_SIZE"
            ? "File is too large. Maximum size is 10 MB."
            : `Upload error: ${err.message}`;
        res.status(400).json({ error: message });
        return;
      }

      // fileFilter rejection or other known error
      if (err instanceof Error) {
        res.status(400).json({ error: err.message });
        return;
      }

      // Unexpected — pass to Express default error handler
      next(err);
    });
  };
}

router.post("/scan", uploadSingle("image"), (req, res) => {
  if (!req.file) {
    res.status(400).json({ error: "No image file provided" });
    return;
  }

  // AI analysis not yet implemented — return a placeholder result
  res.json({
    materialName: "Plastic Water Bottle",
    category: "PET Plastic (#1)",
    disposalMethod:
      "Empty all liquids completely. The bottle and cap are both recyclable. Reattach the cap before placing in your curbside recycling bin.",
    confidence: 94,
    recyclable: true,
    message: "AI analysis coming soon. This is a placeholder result.",
    filename: req.file.originalname,
    fileSizeBytes: req.file.size,
  });
});

export default router;
