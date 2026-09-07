import { Router } from "express";
import { addTagToArticle, removeTagFromArticle } from "../controllers/articleTag.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/", authMiddleware, addTagToArticle);
router.delete("/:id", authMiddleware, removeTagFromArticle);

export default router;