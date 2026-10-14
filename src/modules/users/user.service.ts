import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "./users.schema.js";
import type { IUser } from "./users.schema.js";

export interface SafeUser {
  _id: unknown;
  fullName: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface SigninResult {
  token: string;
  user: SafeUser;
}

export class UserService {
  async signin(email: string, password: string): Promise<SigninResult> {
    const user = await User.findOne({ email }).select("+password").lean<IUser>();

    if (!user) {
      throw new Error("Invalid email or password.");
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error("Invalid email or password.");
    }

    const secret = process.env.JWT_SECRET || "insuredmine_secret";
    const expiresIn = (process.env.JWT_EXPIRES_IN || "7d") as jwt.SignOptions["expiresIn"];

    const { password: _pw, ...safeUser } = user as IUser & { password: string };
    void _pw;

    const token = jwt.sign({ userId: String(user._id) }, secret, { expiresIn });

    return { token, user: safeUser as SafeUser };
  }

  async signup(email: string, password: string): Promise<SafeUser> {
    const existing = await User.findOne({ email }).lean<IUser>();
    if (existing) {
      throw new Error("Email already in use.");
    }

    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({ email, password: hashed });

    const { password: _pw, ...safeUser } = user.toObject() as IUser & { password: string };
    void _pw;

    return safeUser as SafeUser;
  }

  async getSelf(userId: string): Promise<IUser | null> {
    return User.findById(userId).lean<IUser>();
  }
}

export default new UserService();
