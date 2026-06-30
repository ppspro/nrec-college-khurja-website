import { Request, Response } from 'express';
import Event from '../models/Event';
import slugify from 'slugify';
import { processImage } from '../middleware/upload';

export const getEvents = async (req: Request, res: Response): Promise<void> => {
  try {
    const { upcoming, featured, page = 1, limit = 9 } = req.query;
    const query: Record<string, unknown> = { isPublished: true };

    if (upcoming === 'true') query.startDate = { $gte: new Date() };
    if (featured === 'true') query.isFeatured = true;

    const skip = (Number(page) - 1) * Number(limit);
    const total = await Event.countDocuments(query);
    const events = await Event.find(query)
      .sort({ startDate: 1 })
      .skip(skip)
      .limit(Number(limit));

    res.json({ success: true, events, pagination: { total, page: Number(page), pages: Math.ceil(total / Number(limit)) } });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

export const getEventBySlug = async (req: Request, res: Response): Promise<void> => {
  try {
    const event = await Event.findOne({ slug: req.params.slug, isPublished: true });
    if (!event) { res.status(404).json({ success: false, message: 'Event not found' }); return; }
    res.json({ success: true, event });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

export const getAllEventsAdmin = async (_req: Request, res: Response): Promise<void> => {
  try {
    const events = await Event.find().sort({ startDate: -1 });
    res.json({ success: true, events });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

export const createEvent = async (req: Request, res: Response): Promise<void> => {
  try {
    const { title, description, content, venue, startDate, endDate, startTime, endTime, category, registrationLink, isPublished, isFeatured } = req.body;
    const slug = slugify(title, { lower: true, strict: true });

    let image = '';
    if (req.file) {
      image = await processImage(req.file.buffer, 'news', `event-${Date.now()}`, 800, 450);
    }

    const event = await Event.create({ title, slug, description, content, image, venue, startDate, endDate, startTime, endTime, category, registrationLink, isPublished, isFeatured });
    res.status(201).json({ success: true, event });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

export const updateEvent = async (req: Request, res: Response): Promise<void> => {
  try {
    const updateData: Record<string, unknown> = { ...req.body };
    if (req.file) {
      updateData.image = await processImage(req.file.buffer, 'news', `event-${Date.now()}`, 800, 450);
    }
    const event = await Event.findByIdAndUpdate(req.params.id, updateData, { new: true });
    if (!event) { res.status(404).json({ success: false, message: 'Event not found' }); return; }
    res.json({ success: true, event });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

export const deleteEvent = async (req: Request, res: Response): Promise<void> => {
  try {
    const event = await Event.findByIdAndDelete(req.params.id);
    if (!event) { res.status(404).json({ success: false, message: 'Event not found' }); return; }
    res.json({ success: true, message: 'Event deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};
