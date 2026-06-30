import { Request, Response } from 'express';
import Download from '../models/Download';
import { saveFile } from '../middleware/upload';
import path from 'path';

export const getDownloads = async (req: Request, res: Response): Promise<void> => {
  try {
    const { category } = req.query;
    const query: Record<string, unknown> = { isActive: true };
    if (category && category !== 'all') query.category = category;

    const downloads = await Download.find(query).sort({ order: 1, createdAt: -1 });
    res.json({ success: true, downloads });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

export const getAllDownloadsAdmin = async (_req: Request, res: Response): Promise<void> => {
  try {
    const downloads = await Download.find().sort({ category: 1, order: 1 });
    res.json({ success: true, downloads });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

export const createDownload = async (req: Request, res: Response): Promise<void> => {
  try {
    const { title, description, category, order } = req.body;
    if (!req.file) { res.status(400).json({ success: false, message: 'File is required' }); return; }

    const file = await saveFile(req.file.buffer, 'downloads', req.file.originalname);
    const fileType = path.extname(req.file.originalname).replace('.', '').toUpperCase();
    const fileSize = `${(req.file.size / 1024).toFixed(1)} KB`;

    const download = await Download.create({ title, description, category, file, fileType, fileSize, order: order || 0 });
    res.status(201).json({ success: true, download });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

export const updateDownload = async (req: Request, res: Response): Promise<void> => {
  try {
    const updateData: Record<string, unknown> = { ...req.body };
    if (req.file) {
      updateData.file = await saveFile(req.file.buffer, 'downloads', req.file.originalname);
      updateData.fileType = path.extname(req.file.originalname).replace('.', '').toUpperCase();
      updateData.fileSize = `${(req.file.size / 1024).toFixed(1)} KB`;
    }
    const download = await Download.findByIdAndUpdate(req.params.id, updateData, { new: true });
    if (!download) { res.status(404).json({ success: false, message: 'Download not found' }); return; }
    res.json({ success: true, download });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

export const deleteDownload = async (req: Request, res: Response): Promise<void> => {
  try {
    const download = await Download.findByIdAndDelete(req.params.id);
    if (!download) { res.status(404).json({ success: false, message: 'Download not found' }); return; }
    res.json({ success: true, message: 'Download deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};
