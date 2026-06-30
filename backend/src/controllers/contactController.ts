import { Request, Response } from 'express';
import Contact from '../models/Contact';

export const getContact = async (_req: Request, res: Response): Promise<void> => {
  try {
    let contact = await Contact.findOne();
    if (!contact) contact = await Contact.create({});
    res.json({ success: true, contact });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

export const updateContact = async (req: Request, res: Response): Promise<void> => {
  try {
    const updateData: Record<string, unknown> = { ...req.body };

    ['phones', 'emails'].forEach((key) => {
      if (updateData[key] && typeof updateData[key] === 'string') {
        try { updateData[key] = JSON.parse(updateData[key] as string); } catch {}
      }
    });
    if (updateData.socialLinks && typeof updateData.socialLinks === 'string') {
      try { updateData.socialLinks = JSON.parse(updateData.socialLinks as string); } catch {}
    }

    let contact = await Contact.findOne();
    if (!contact) {
      contact = await Contact.create(updateData);
    } else {
      contact = await Contact.findOneAndUpdate({}, updateData, { new: true });
    }

    res.json({ success: true, contact });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};
