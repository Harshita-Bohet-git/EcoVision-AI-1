import { Router, type IRouter } from "express";
import { uploadImage } from "../middleware/upload";
import { scanItem } from "../controllers/scan.controller";

const router: IRouter = Router();

/**
 * POST /api/scan
 * Middleware chain: parse + validate the uploaded image → controller
 */
router.post("/scan", uploadImage, scanItem);

export default router;
