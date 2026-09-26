import { Request, Response } from "express";
import {
  startFocusSession,
  finishFocusSession,
  getMyFocusSessions,
} from "../services/focusSession.service";

export const startFocus = async (req: Request, res: Response) => {
  try {
    const userId = req.user!.userId;
    const { taskId } = req.body;

    if (!taskId) {
      return res.status(400).json({
        success: false,
        message: "Task ID is required",
      });
    }

    const session = await startFocusSession(userId, taskId);

    return res.status(201).json({
      success: true,
      message: "Focus session started successfully",
      session,
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Something went wrong";

    return res.status(400).json({
      success: false,
      message,
    });
  }
};

export const endFocus = async (req: Request, res: Response) => {
  try {
    const userId = req.user!.userId;
    const id = req.params.id as string;

    const session = await finishFocusSession(userId, id);

    return res.status(200).json({
      success: true,
      message: "Focus session ended successfully",
      session,
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Something went wrong";

    return res.status(400).json({
      success: false,
      message,
    });
  }
};

export const getFocusSessions = async (
  req: Request,
  res: Response
) => {
  try {
    const userId = req.user!.userId;

    const sessions = await getMyFocusSessions(userId);

    return res.status(200).json({
      success: true,
      sessions,
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Something went wrong";

    return res.status(400).json({
      success: false,
      message,
    });
  }
};