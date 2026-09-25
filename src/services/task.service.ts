import { Priority } from "@prisma/client";
import * as taskRepository from "../repositories/task.repository";

export const createTask = async (
  userId: string,
  title: string,
  description?: string,
  priority: Priority = Priority.MEDIUM,
  dueDate?: Date
) => {
  if (!title || title.trim().length === 0) {
    throw new Error("Task title is required");
  }

  return await taskRepository.createTask(
    userId,
    title.trim(),
    description,
    priority,
    dueDate
  );
};

export const getTasks = async (userId: string) => {
  return await taskRepository.getTasksByUserId(userId);
};

export const getTask = async (
  taskId: string,
  userId: string
) => {
  const task = await taskRepository.getTaskById(
    taskId,
    userId
  );

  if (!task) {
    throw new Error("Task not found");
  }

  return task;
};

export const updateTask = async (
  taskId: string,
  userId: string,
  data: {
    title?: string;
    description?: string;
    priority?: Priority;
    dueDate?: Date | null;
  }
) => {
  if (data.title !== undefined) {
    if (data.title.trim() === "") {
      throw new Error("Task title cannot be empty");
    }

    data.title = data.title.trim();
  }

  const existingTask = await taskRepository.getTaskById(
    taskId,
    userId
  );

  if (!existingTask) {
    throw new Error("Task not found");
  }

  await taskRepository.updateTask(
    taskId,
    userId,
    data
  );

  return await taskRepository.getTaskById(
    taskId,
    userId
  );
};

export const completeTask = async (
  taskId: string,
  userId: string,
  completed: boolean
) => {
  const existingTask = await taskRepository.getTaskById(
    taskId,
    userId
  );

  if (!existingTask) {
    throw new Error("Task not found");
  }

  await taskRepository.completeTask(
    taskId,
    userId,
    completed
  );

  return await taskRepository.getTaskById(
    taskId,
    userId
  );
};

export const deleteTask = async (
  taskId: string,
  userId: string
) => {
  const existingTask = await taskRepository.getTaskById(
    taskId,
    userId
  );

  if (!existingTask) {
    throw new Error("Task not found");
  }

  await taskRepository.deleteTask(
    taskId,
    userId
  );

  return true;
};