import { Router } from "express";
import { getTags, createTag, deleteTag } from "../controllers/tag.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { adminMiddleware } from "../middlewares/admin.middleware.js";

const router = Router();

router.get("/", authMiddleware, getTags);
router.post("/", authMiddleware, adminMiddleware, createTag);
router.delete("/:id", authMiddleware, adminMiddleware, deleteTag);

export default router;