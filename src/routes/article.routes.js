import { Router } from "express";
import { getArticles, createArticle, updateArticle, deleteArticle } from "../controllers/article.controller.js";
import { authMiddleware } from "../middlewares/auth.validation.js";
import { ownerMiddleware } from "../middlewares/owner.validation.js";

const router = Router();

router.get("/", getArticles);
router.post("/", authMiddleware, createArticle);
router.put("/:id", authMiddleware, ownerMiddleware, updateArticle);
router.delete("/:id", authMiddleware, ownerMiddleware, deleteArticle);

export default router;