import { Request, Response } from 'express';
import Curriculum from '../models/Curriculum';
import { saveFile } from '../middleware/upload';

export const getCurriculum = async (req: Request, res: Response): Promise<void> => {
  try {
    const { department, course } = req.query;
    const query: Record<string, unknown> = { isActive: true };
    if (department) query.department = department;
    if (course) query.course = course;

    const curriculum = await Curriculum.find(query)
      .populate('department', 'name')
      .populate('course', 'name level')
      .sort({ createdAt: -1 });
    res.json({ success: true, curriculum });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

export const getAllCurriculumAdmin = async (_req: Request, res: Response): Promise<void> => {
  try {
    const curriculum = await Curriculum.find()
      .populate('department', 'name')
      .populate('course', 'name')
      .sort({ createdAt: -1 });
    res.json({ success: true, curriculum });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

export const createCurriculum = async (req: Request, res: Response): Promise<void> => {
  try {
    const { title, faculty, department, course, semesterYear } = req.body;
    if (!req.file) { res.status(400).json({ success: false, message: 'PDF file is required' }); return; }

    const pdfFile = await saveFile(req.file.buffer, 'curriculum', req.file.originalname);
    const curriculum = await Curriculum.create({ title, faculty, department, course, semesterYear, pdfFile });
    res.status(201).json({ success: true, curriculum });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

export const updateCurriculum = async (req: Request, res: Response): Promise<void> => {
  try {
    const updateData: Record<string, unknown> = { ...req.body };
    if (req.file) {
      updateData.pdfFile = await saveFile(req.file.buffer, 'curriculum', req.file.originalname);
    }
    const curriculum = await Curriculum.findByIdAndUpdate(req.params.id, updateData, { new: true });
    if (!curriculum) { res.status(404).json({ success: false, message: 'Curriculum not found' }); return; }
    res.json({ success: true, curriculum });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

export const deleteCurriculum = async (req: Request, res: Response): Promise<void> => {
  try {
    const curriculum = await Curriculum.findByIdAndDelete(req.params.id);
    if (!curriculum) { res.status(404).json({ success: false, message: 'Curriculum not found' }); return; }
    res.json({ success: true, message: 'Curriculum deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};
