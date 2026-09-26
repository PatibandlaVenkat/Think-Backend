import { Router } from "express";
import {
  startFocus,
  endFocus,
  getFocusSessions,
} from "../controllers/focusSession.controller";
import { authMiddleware } from "../middleware/authMiddleware";

const router = Router();

router.post("/start", authMiddleware, startFocus);
router.put("/:id/end", authMiddleware, endFocus);
router.get("/", authMiddleware, getFocusSessions);

export default router;