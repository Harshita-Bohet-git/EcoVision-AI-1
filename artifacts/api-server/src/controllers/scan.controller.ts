import type { Request, Response } from "express";

/**
 * POST /api/scan
 *
 * Receives an image that was already parsed and stored on disk by the
 * `uploadImage` middleware. Returns a simple acknowledgement. AI
 * classification will be wired here in a future iteration.
 */
export async function scanItem(req: Request, res: Response): Promise<void> {
  if (!req.file) {
    res.status(400).json({ error: "No image file provided" });
    return;
  }

  // req.file is populated by multer with the temp-file metadata:
  //   fieldname, originalname, mimetype, size, filename (generated), path (absolute)
  res.status(200).json({
    success: true,
    message: "Image uploaded successfully",
  });
}
