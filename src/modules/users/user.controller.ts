import type { Request, Response } from "express";
import { UserService } from "./user.service.js";
import type { AuthRequest } from "../../middleware/auth.js";

const userService = new UserService();

export class UserController {
  async signin(req: Request, res: Response): Promise<void> {
    try {
      const { email, password } = req.body as {
        email: string;
        password: string;
      };

      if (!email || !password) {
        res.status(400).json({
          success: false,
          message: "Email and password are required.",
        });
        return;
      }

      const result = await userService.signin(email, password);

      res.status(200).json({
        success: true,
        message: "Signin successfully.",
        data: result,
      });
    } catch (error) {
      res.status(401).json({
        success: false,
        message: "Failed to signin.",
        error: (error as Error).message,
      });
    }
  }

  async signup(req: Request, res: Response): Promise<void> {
    try {
      const { email, password } = req.body as {
        email: string;
        password: string;
      };

      if (!email || !password) {
        res.status(400).json({
          success: false,
          message: "Email and password are required.",
        });
        return;
      }

      const user = await userService.signup(email, password);

      res.status(201).json({
        success: true,
        message: "Signup successful.",
        data: user,
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: "Failed to signup.",
        error: (error as Error).message,
      });
    }
  }

  async self(req: AuthRequest, res: Response): Promise<void> {
    try {
      const userId = req.user?.userId;

      if (!userId) {
        res.status(401).json({
          success: false,
          message: "Unauthorized.",
        });
        return;
      }

      const user = await userService.getSelf(String(userId));

      if (!user) {
        res.status(404).json({
          success: false,
          message: "User not found.",
        });
        return;
      }

      res.status(200).json({
        success: true,
        message: "User data fetched successfully.",
        data: user,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Failed to fetch user data.",
        error: (error as Error).message,
      });
    }
  }
}

export default new UserController();
