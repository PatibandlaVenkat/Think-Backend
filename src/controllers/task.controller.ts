import { Response } from "express";
import { AuthRequest } from "../middleware/authMiddleware";
import { Priority } from "@prisma/client";
import * as taskService from "../services/task.service";

export const createTask = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const userId = req.user?.userId;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const {
      title,
      description,
      priority,
      dueDate,
    } = req.body;

    const task = await taskService.createTask(
      userId,
      title,
      description,
      priority || Priority.MEDIUM,
      dueDate ? new Date(dueDate) : undefined
    );

    return res.status(201).json({
      success: true,
      message: "Task created successfully",
      task,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Failed to create task",
    });
  }
};

export const getTasks = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const userId = req.user?.userId;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const tasks = await taskService.getTasks(userId);

    return res.status(200).json({
      success: true,
      tasks,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch tasks",
    });
  }
};

export const getTask = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const userId = req.user?.userId;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

const { id } = req.params;

if (typeof id !== "string") {
  return res.status(400).json({
    success: false,
    message: "Invalid task ID",
  });
}

const task = await taskService.getTask(
  id,
  userId
);

    return res.status(200).json({
      success: true,
      task,
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Task not found",
    });
  }
};

export const updateTask = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const userId = req.user?.userId;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const { id } = req.params;

    if (typeof id !== "string") {
      return res.status(400).json({
        success: false,
        message: "Invalid task ID",
      });
    }

    const {
      title,
      description,
      priority,
      dueDate,
    } = req.body;

    const task = await taskService.updateTask(
      id,
      userId,
      {
        title,
        description,
        priority,
        dueDate:
          dueDate === undefined
            ? undefined
            : dueDate === null
            ? null
            : new Date(dueDate),
      }
    );

    return res.status(200).json({
      success: true,
      message: "Task updated successfully",
      task,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Failed to update task",
    });
  }
};

export const completeTask = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const userId = req.user?.userId;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const { id } = req.params;

    if (typeof id !== "string") {
      return res.status(400).json({
        success: false,
        message: "Invalid task ID",
      });
    }

    const completed =
      req.body.completed === undefined
        ? true
        : req.body.completed;

    const task = await taskService.completeTask(
      id,
      userId,
      completed
    );

    return res.status(200).json({
      success: true,
      message: completed
        ? "Task completed"
        : "Task marked incomplete",
      task,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Failed to update task",
    });
  }
};

export const deleteTask = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const userId = req.user?.userId;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const { id } = req.params;

    if (typeof id !== "string") {
      return res.status(400).json({
        success: false,
        message: "Invalid task ID",
      });
    }

    await taskService.deleteTask(
      id,
      userId
    );

    return res.status(200).json({
      success: true,
      message: "Task deleted successfully",
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Task not found",
    });
  }
};