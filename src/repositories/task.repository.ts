import prisma from "../config/prisma";
import { Priority } from "@prisma/client";

export const createTask = async (
  userId: string,
  title: string,
  description?: string,
  priority: Priority = Priority.MEDIUM,
  dueDate?: Date
) => {
  return await prisma.task.create({
    data: {
      title,
      description,
      priority,
      dueDate,
      userId,
    },
  });
};

export const getTasksByUserId = async (userId: string) => {
  return await prisma.task.findMany({
    where: {
      userId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};

export const getTaskById = async (
  taskId: string,
  userId: string
) => {
  return await prisma.task.findFirst({
    where: {
      id: taskId,
      userId,
    },
  });
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
  return await prisma.task.updateMany({
    where: {
      id: taskId,
      userId,
    },
    data,
  });
};

export const completeTask = async (
  taskId: string,
  userId: string,
  completed: boolean
) => {
  return await prisma.task.updateMany({
    where: {
      id: taskId,
      userId,
    },
    data: {
      completed,
    },
  });
};

export const deleteTask = async (
  taskId: string,
  userId: string
) => {
  return await prisma.task.deleteMany({
    where: {
      id: taskId,
      userId,
    },
  });
};