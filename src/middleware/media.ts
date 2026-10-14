import multer from "multer";
import path from "node:path";
import fs from "node:fs";
import type { Request, Response, NextFunction } from "express";

const uploadsDir = path.resolve(process.cwd(), "uploads");

if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (_req, file, cb) => {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    const ext = path.extname(file.originalname);
    cb(null, `data-${uniqueSuffix}${ext}`);
  },
});

const fileFilter = (
  _req: Request,
  file: Express.Multer.File,
  cb: multer.FileFilterCallback
): void => {
  const allowedExtensions = [".csv", ".xlsx", ".xls"];
  const ext = path.extname(file.originalname).toLowerCase();
  if (allowedExtensions.includes(ext)) {
    cb(null, true);
  } else {
    cb(
      new Error(
        "Invalid file type. Only CSV and Excel (.xlsx, .xls) files are allowed."
      )
    );
  }
};

export const uploadMedia = multer({
  storage,
  fileFilter,
  limits: { fileSize: 50 * 1024 * 1024 }, // 50MB max limit
});

export const handleSingleUpload =
  (fieldName: string) =>
    (req: Request, res: Response, next: NextFunction): void => {
      uploadMedia.single(fieldName)(req, res, (err) => {
        if (err) {
          res.status(400).json({
            success: false,
            message: (err as Error).message || "File upload failed.",
          });
          return;
        }
        next();
      });
    };

export default handleSingleUpload;
