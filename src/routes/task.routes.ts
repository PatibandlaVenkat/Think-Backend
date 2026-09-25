import { Router } from "express";

import {
  createTask,
  getTasks,
  getTask,
  updateTask,
  completeTask,
  deleteTask,
} from "../controllers/task.controller";

import { authMiddleware } from "../middleware/authMiddleware";

const router = Router();

router.post("/", authMiddleware, createTask);

router.get("/", authMiddleware, getTasks);

router.get("/:id", authMiddleware, getTask);

router.put("/:id", authMiddleware, updateTask);

router.patch(
  "/:id/complete",
  authMiddleware,
  completeTask
);

router.delete("/:id", authMiddleware, deleteTask);

export default router;