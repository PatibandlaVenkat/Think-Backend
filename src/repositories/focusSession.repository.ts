import prisma from "../config/prisma";

export const createFocusSession = async (
  userId: string,
  taskId: string
) => {
  return await prisma.focusSession.create({
    data: {
      userId,
      taskId,
      startTime: new Date(),
    },
  });
};

export const getFocusSessionById = async (id: string) => {
  return await prisma.focusSession.findUnique({
    where: {
      id,
    },
  });
};

export const endFocusSession = async (
  id: string,
  endTime: Date,
  duration: number
) => {
  return await prisma.focusSession.update({
    where: {
      id,
    },
    data: {
      endTime,
      duration,
    },
  });
};

export const getUserFocusSessions = async (userId: string) => {
  return await prisma.focusSession.findMany({
    where: {
      userId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};