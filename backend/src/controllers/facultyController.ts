import { Request, Response } from 'express';
import Faculty from '../models/Faculty';
import { processImage } from '../middleware/upload';

export const getFaculty = async (req: Request, res: Response): Promise<void> => {
  try {
    const { department } = req.query;
    const query: Record<string, unknown> = { isActive: true };
    if (department) query.department = department;

    const faculty = await Faculty.find(query).populate('department', 'name').sort({ order: 1, name: 1 });
    res.json({ success: true, faculty });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

export const getFacultyById = async (req: Request, res: Response): Promise<void> => {
  try {
    const faculty = await Faculty.findById(req.params.id).populate('department', 'name');
    if (!faculty) { res.status(404).json({ success: false, message: 'Faculty not found' }); return; }
    res.json({ success: true, faculty });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

export const getAllFacultyAdmin = async (_req: Request, res: Response): Promise<void> => {
  try {
    const faculty = await Faculty.find().populate('department', 'name').sort({ name: 1 });
    res.json({ success: true, faculty });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

export const createFaculty = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, designation, qualification, department, email, phone, biography, specialization, experience, publications, order } = req.body;

    let photo = '';
    if (req.file) {
      photo = await processImage(req.file.buffer, 'faculty', `faculty-${Date.now()}`, 400, 400);
    }

    const faculty = await Faculty.create({
      name, designation, qualification, department, email, phone, photo, biography,
      specialization: specialization ? JSON.parse(specialization) : [],
      experience,
      publications: publications ? JSON.parse(publications) : [],
      order: order || 0,
    });
    res.status(201).json({ success: true, faculty });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

export const updateFaculty = async (req: Request, res: Response): Promise<void> => {
  try {
    const updateData: Record<string, unknown> = { ...req.body };
    if (req.file) {
      updateData.photo = await processImage(req.file.buffer, 'faculty', `faculty-${Date.now()}`, 400, 400);
    }
    ['specialization', 'publications'].forEach((key) => {
      if (updateData[key] && typeof updateData[key] === 'string') {
        updateData[key] = JSON.parse(updateData[key] as string);
      }
    });

    const faculty = await Faculty.findByIdAndUpdate(req.params.id, updateData, { new: true });
    if (!faculty) { res.status(404).json({ success: false, message: 'Faculty not found' }); return; }
    res.json({ success: true, faculty });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

export const deleteFaculty = async (req: Request, res: Response): Promise<void> => {
  try {
    const faculty = await Faculty.findByIdAndDelete(req.params.id);
    if (!faculty) { res.status(404).json({ success: false, message: 'Faculty not found' }); return; }
    res.json({ success: true, message: 'Faculty deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};
