import prisma from "../config/prisma";
import {
  createFocusSession,
  getFocusSessionById,
  endFocusSession,
  getUserFocusSessions,
} from "../repositories/focusSession.repository";

export const startFocusSession = async (
  userId: string,
  taskId: string
) => {
  const task = await prisma.task.findFirst({
    where: {
      id: taskId,
      userId,
    },
  });

  if (!task) {
    throw new Error("Task not found");
  }

  if (task.completed) {
    throw new Error("Task is already completed");
  }

  return await createFocusSession(userId, taskId);
};

export const finishFocusSession = async (
  userId: string,
  sessionId: string
) => {
  const session = await getFocusSessionById(sessionId);

  if (!session) {
    throw new Error("Focus session not found");
  }

  if (session.userId !== userId) {
    throw new Error("Unauthorized");
  }

  if (session.endTime) {
    throw new Error("Focus session already ended");
  }

  const endTime = new Date();

  const duration = Math.floor(
    (endTime.getTime() - session.startTime.getTime()) / 60000
  );

  return await endFocusSession(
    sessionId,
    endTime,
    duration
  );
};

export const getMyFocusSessions = async (userId: string) => {
  return await getUserFocusSessions(userId);
};