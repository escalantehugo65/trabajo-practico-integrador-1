import { Router } from "express";
import { getUsers, getUserById, deleteUser } from "../controllers/user.controller.js";
import { authMiddleware } from "../middlewares/auth.validation.js";
import { adminMiddleware } from "../middlewares/admin.validation.js";

const router = Router();

router.get("/", authMiddleware, adminMiddleware, getUsers);
router.get("/:id", authMiddleware, adminMiddleware, getUserById);
router.delete("/:id", authMiddleware, adminMiddleware, deleteUser);

export default router;