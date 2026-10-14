import { Router } from "express";
import { UserController } from "../modules/users/user.controller.js";
import { authenticate } from "../middleware/auth.js";
import type { AuthRequest } from "../middleware/auth.js";
import type { Request, Response } from "express";

const router = Router();
const userController = new UserController();


router.post("/signup", (req: Request, res: Response) =>
  userController.signup(req, res)
);

router.post("/signin", (req: Request, res: Response) =>
  userController.signin(req, res)
);

router.get("/self", authenticate, (req: Request, res: Response) =>
  userController.self(req as AuthRequest, res)
);

export default router;
