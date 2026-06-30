import { Request, Response } from 'express';
import Settings from '../models/Settings';
import Page from '../models/Page';
import Slider from '../models/Slider';
import { processImage } from '../middleware/upload';

// ========== SETTINGS ==========

export const getSettings = async (_req: Request, res: Response): Promise<void> => {
  try {
    let settings = await Settings.findOne();
    if (!settings) {
      settings = await Settings.create({});
    }
    res.json({ success: true, settings });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

export const updateSettings = async (req: Request, res: Response): Promise<void> => {
  try {
    const updateData: Record<string, unknown> = { ...req.body };

    if (req.files && typeof req.files === 'object') {
      const files = req.files as Record<string, Express.Multer.File[]>;
      if (files.logo) {
        updateData.logo = await processImage(files.logo[0].buffer, 'logo', `logo-${Date.now()}`, 400, 200);
      }
      if (files.favicon) {
        updateData.favicon = await processImage(files.favicon[0].buffer, 'logo', `favicon-${Date.now()}`, 64, 64);
      }
    }

    ['phone', 'email', 'recognizedBy', 'footerLinks'].forEach((key) => {
      if (updateData[key] && typeof updateData[key] === 'string') {
        try { updateData[key] = JSON.parse(updateData[key] as string); } catch {}
      }
    });

    if (updateData.socialLinks && typeof updateData.socialLinks === 'string') {
      try { updateData.socialLinks = JSON.parse(updateData.socialLinks as string); } catch {}
    }

    let settings = await Settings.findOne();
    if (!settings) {
      settings = await Settings.create(updateData);
    } else {
      settings = await Settings.findOneAndUpdate({}, updateData, { new: true });
    }

    res.json({ success: true, settings });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// ========== PAGES ==========

export const getPage = async (req: Request, res: Response): Promise<void> => {
  try {
    const page = await Page.findOne({ key: req.params.key });
    if (!page) { res.status(404).json({ success: false, message: 'Page not found' }); return; }
    res.json({ success: true, page });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

export const upsertPage = async (req: Request, res: Response): Promise<void> => {
  try {
    const updateData: Record<string, unknown> = { ...req.body };
    if (req.file) {
      updateData.bannerImage = await processImage(req.file.buffer, 'pages', `banner-${Date.now()}`, 1920, 600);
    }
    if (updateData.sections && typeof updateData.sections === 'string') {
      try { updateData.sections = JSON.parse(updateData.sections as string); } catch {}
    }

    const page = await Page.findOneAndUpdate({ key: req.params.key }, updateData, { new: true, upsert: true });
    res.json({ success: true, page });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// ========== SLIDERS ==========

export const getSliders = async (_req: Request, res: Response): Promise<void> => {
  try {
    const sliders = await Slider.find({ isActive: true }).sort({ order: 1 });
    res.json({ success: true, sliders });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

export const getAllSlidersAdmin = async (_req: Request, res: Response): Promise<void> => {
  try {
    const sliders = await Slider.find().sort({ order: 1 });
    res.json({ success: true, sliders });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

export const createSlider = async (req: Request, res: Response): Promise<void> => {
  try {
    const { title, subtitle, description, buttonText, buttonLink, order } = req.body;
    if (!req.file) { res.status(400).json({ success: false, message: 'Image is required' }); return; }

    const image = await processImage(req.file.buffer, 'slider', `slide-${Date.now()}`, 1920, 800);
    const slider = await Slider.create({ title, subtitle, description, image, buttonText, buttonLink, order: order || 0 });
    res.status(201).json({ success: true, slider });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

export const updateSlider = async (req: Request, res: Response): Promise<void> => {
  try {
    const updateData: Record<string, unknown> = { ...req.body };
    if (req.file) {
      updateData.image = await processImage(req.file.buffer, 'slider', `slide-${Date.now()}`, 1920, 800);
    }
    const slider = await Slider.findByIdAndUpdate(req.params.id, updateData, { new: true });
    if (!slider) { res.status(404).json({ success: false, message: 'Slider not found' }); return; }
    res.json({ success: true, slider });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

export const deleteSlider = async (req: Request, res: Response): Promise<void> => {
  try {
    const slider = await Slider.findByIdAndDelete(req.params.id);
    if (!slider) { res.status(404).json({ success: false, message: 'Slider not found' }); return; }
    res.json({ success: true, message: 'Slider deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};
