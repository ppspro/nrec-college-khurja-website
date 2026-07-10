import { Request, Response } from 'express';
import Contact from '../models/Contact';
import ContactInquiry from '../models/ContactInquiry';

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

// Public: Submit a contact inquiry form
export const submitInquiry = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, phone, subject, message } = req.body;
    if (!name || !email || !subject || !message) {
      res.status(400).json({ success: false, message: 'Name, email, subject and message are required.' });
      return;
    }
    const inquiry = await ContactInquiry.create({ name, email, phone, subject, message });
    res.status(201).json({ success: true, message: 'Your message has been sent successfully.', inquiry });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// Admin: Get all inquiries
export const getInquiries = async (req: Request, res: Response): Promise<void> => {
  try {
    const { status } = req.query;
    const filter: Record<string, string> = {};
    if (status && typeof status === 'string') filter.status = status;
    const inquiries = await ContactInquiry.find(filter).sort({ createdAt: -1 });
    res.json({ success: true, inquiries });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// Admin: Update inquiry status
export const updateInquiryStatus = async (req: Request, res: Response): Promise<void> => {
  try {
    const { status } = req.body;
    const inquiry = await ContactInquiry.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    if (!inquiry) {
      res.status(404).json({ success: false, message: 'Inquiry not found' });
      return;
    }
    res.json({ success: true, inquiry });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};
