import { Request, Response } from 'express';
import News from '../models/News';
import slugify from 'slugify';
import { processImage } from '../middleware/upload';

export const getNews = async (req: Request, res: Response): Promise<void> => {
  try {
    const { page = 1, limit = 9, category, featured } = req.query;
    const query: Record<string, unknown> = { isPublished: true };

    if (category && category !== 'all') query.category = category;
    if (featured === 'true') query.isFeatured = true;

    const skip = (Number(page) - 1) * Number(limit);
    const total = await News.countDocuments(query);
    const news = await News.find(query)
      .sort({ publishDate: -1 })
      .skip(skip)
      .limit(Number(limit));

    res.json({ success: true, news, pagination: { total, page: Number(page), pages: Math.ceil(total / Number(limit)) } });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

export const getNewsBySlug = async (req: Request, res: Response): Promise<void> => {
  try {
    const news = await News.findOne({ slug: req.params.slug, isPublished: true });
    if (!news) { res.status(404).json({ success: false, message: 'News not found' }); return; }
    res.json({ success: true, news });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

export const getAllNewsAdmin = async (_req: Request, res: Response): Promise<void> => {
  try {
    const news = await News.find().sort({ publishDate: -1 });
    res.json({ success: true, news });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

export const createNews = async (req: Request, res: Response): Promise<void> => {
  try {
    const { title, excerpt, content, category, tags, author, publishDate, isPublished, isFeatured } = req.body;
    const slug = slugify(title, { lower: true, strict: true });

    let image = '';
    if (req.file) {
      const filename = `news-${Date.now()}`;
      image = await processImage(req.file.buffer, 'news', filename, 800, 450);
    }

    const news = await News.create({ title, slug, excerpt, content, image, category, tags: tags ? JSON.parse(tags) : [], author, publishDate, isPublished, isFeatured });
    res.status(201).json({ success: true, news });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

export const updateNews = async (req: Request, res: Response): Promise<void> => {
  try {
    const updateData: Record<string, unknown> = { ...req.body };
    if (req.file) {
      const filename = `news-${Date.now()}`;
      updateData.image = await processImage(req.file.buffer, 'news', filename, 800, 450);
    }
    if (updateData.tags && typeof updateData.tags === 'string') {
      updateData.tags = JSON.parse(updateData.tags);
    }
    const news = await News.findByIdAndUpdate(req.params.id, updateData, { new: true });
    if (!news) { res.status(404).json({ success: false, message: 'News not found' }); return; }
    res.json({ success: true, news });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

export const deleteNews = async (req: Request, res: Response): Promise<void> => {
  try {
    const news = await News.findByIdAndDelete(req.params.id);
    if (!news) { res.status(404).json({ success: false, message: 'News not found' }); return; }
    res.json({ success: true, message: 'News deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};
