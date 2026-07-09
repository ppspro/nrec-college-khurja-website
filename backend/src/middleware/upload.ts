import multer from 'multer';
import sharp from 'sharp';
import path from 'path';
import fs from 'fs';
import { Request, Response, NextFunction } from 'express';

const UPLOAD_DIR = process.env.UPLOAD_DIR || 'uploads';

// Ensure directories exist
const dirs = ['logo', 'slider', 'gallery', 'faculty', 'curriculum', 'downloads', 'notices', 'news', 'pages', 'media'];
dirs.forEach((dir) => {
  const fullPath = path.join(UPLOAD_DIR, dir);
  if (!fs.existsSync(fullPath)) {
    fs.mkdirSync(fullPath, { recursive: true });
  }
});

const storage = multer.memoryStorage();

const fileFilter = (_req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
  const allowedMimeTypes = [
    'image/jpeg',
    'image/png',
    'image/webp',
    'image/svg+xml',
    'image/gif',
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/vnd.ms-excel',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'application/vnd.ms-powerpoint',
    'application/vnd.openxmlformats-officedocument.presentationml.presentation',
  ];

  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error(`File type ${file.mimetype} is not allowed`));
  }
};

export const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: parseInt(process.env.MAX_FILE_SIZE || '10485760') },
});

export const processImage = async (
  buffer: Buffer,
  folder: string,
  filename: string,
  width = 1200,
  height?: number,
  quality = 85
): Promise<string> => {
  const outputDir = path.join(UPLOAD_DIR, folder);
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const outputFilename = `${filename}.webp`;
  const outputPath = path.join(outputDir, outputFilename);

  let sharpInstance = sharp(buffer).resize(width, height, { fit: 'cover', withoutEnlargement: true });
  await sharpInstance.webp({ quality }).toFile(outputPath);

  return `/${UPLOAD_DIR}/${folder}/${outputFilename}`;
};

export const saveFile = async (buffer: Buffer, folder: string, originalName: string): Promise<string> => {
  const outputDir = path.join(UPLOAD_DIR, folder);
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const ext = path.extname(originalName);
  const filename = `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`;
  const outputPath = path.join(outputDir, filename);

  fs.writeFileSync(outputPath, buffer);
  return `/${UPLOAD_DIR}/${folder}/${filename}`;
};

export const deleteFile = (filePath: string): void => {
  const fullPath = path.join(process.cwd(), filePath);
  if (fs.existsSync(fullPath)) {
    fs.unlinkSync(fullPath);
  }
};
