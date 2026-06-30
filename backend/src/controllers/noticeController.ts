import { Request, Response } from 'express';
import Notice from '../models/Notice';

export const getNotices = async (req: Request, res: Response): Promise<void> => {
  try {
    const { search, category, page = 1, limit = 10, all } = req.query;

    const query: Record<string, unknown> = { isActive: true };

    // Filter out expired notices for public
    if (!all) {
      query.$or = [{ expiryDate: null }, { expiryDate: { $gt: new Date() } }];
    }

    if (search) {
      query.$and = [
        ...(query.$and as unknown[] || []),
        { title: { $regex: search, $options: 'i' } },
      ];
    }

    if (category && category !== 'all') {
      query.category = category;
    }

    const skip = (Number(page) - 1) * Number(limit);
    const total = await Notice.countDocuments(query);
    const notices = await Notice.find(query)
      .sort({ isPinned: -1, publishDate: -1 })
      .skip(skip)
      .limit(Number(limit));

    res.json({
      success: true,
      notices,
      pagination: {
        total,
        page: Number(page),
        pages: Math.ceil(total / Number(limit)),
        limit: Number(limit),
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

export const getNoticeById = async (req: Request, res: Response): Promise<void> => {
  try {
    const notice = await Notice.findById(req.params.id);
    if (!notice) {
      res.status(404).json({ success: false, message: 'Notice not found' });
      return;
    }
    res.json({ success: true, notice });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

export const createNotice = async (req: Request, res: Response): Promise<void> => {
  try {
    const { title, content, category, isPinned, expiryDate, publishDate } = req.body;
    const attachment = req.file ? `/uploads/notices/${req.file.filename}` : '';

    const notice = await Notice.create({
      title,
      content,
      category,
      attachment,
      isPinned: isPinned === 'true' || isPinned === true,
      expiryDate: expiryDate || null,
      publishDate: publishDate || new Date(),
    });

    res.status(201).json({ success: true, notice });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

export const updateNotice = async (req: Request, res: Response): Promise<void> => {
  try {
    const updateData: Record<string, unknown> = { ...req.body };
    if (req.file) {
      updateData.attachment = `/uploads/notices/${req.file.filename}`;
    }

    const notice = await Notice.findByIdAndUpdate(req.params.id, updateData, { new: true });
    if (!notice) {
      res.status(404).json({ success: false, message: 'Notice not found' });
      return;
    }
    res.json({ success: true, notice });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

export const deleteNotice = async (req: Request, res: Response): Promise<void> => {
  try {
    const notice = await Notice.findByIdAndDelete(req.params.id);
    if (!notice) {
      res.status(404).json({ success: false, message: 'Notice not found' });
      return;
    }
    res.json({ success: true, message: 'Notice deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

export const togglePin = async (req: Request, res: Response): Promise<void> => {
  try {
    const notice = await Notice.findById(req.params.id);
    if (!notice) {
      res.status(404).json({ success: false, message: 'Notice not found' });
      return;
    }
    notice.isPinned = !notice.isPinned;
    await notice.save();
    res.json({ success: true, notice });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};
