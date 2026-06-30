import { Request, Response } from 'express';
import Department from '../models/Department';
import slugify from 'slugify';
import { processImage } from '../middleware/upload';

export const getDepartments = async (_req: Request, res: Response): Promise<void> => {
  try {
    const departments = await Department.find({ isActive: true }).sort({ order: 1, name: 1 });
    res.json({ success: true, departments });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

export const getDepartmentBySlug = async (req: Request, res: Response): Promise<void> => {
  try {
    const dept = await Department.findOne({ slug: req.params.slug, isActive: true });
    if (!dept) { res.status(404).json({ success: false, message: 'Department not found' }); return; }
    res.json({ success: true, department: dept });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

export const getAllDepartmentsAdmin = async (_req: Request, res: Response): Promise<void> => {
  try {
    const departments = await Department.find().sort({ order: 1, name: 1 });
    res.json({ success: true, departments });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

export const createDepartment = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, shortName, description, headOfDepartment, establishedYear, vision, mission, objectives, facilities, achievements, order } = req.body;
    const slug = slugify(name, { lower: true, strict: true });

    let image = '';
    if (req.file) {
      image = await processImage(req.file.buffer, 'gallery', `dept-${Date.now()}`, 800, 500);
    }

    const department = await Department.create({
      name, slug, shortName, description, image, headOfDepartment, establishedYear, vision, mission,
      objectives: objectives ? JSON.parse(objectives) : [],
      facilities: facilities ? JSON.parse(facilities) : [],
      achievements: achievements ? JSON.parse(achievements) : [],
      order: order || 0,
    });
    res.status(201).json({ success: true, department });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

export const updateDepartment = async (req: Request, res: Response): Promise<void> => {
  try {
    const updateData: Record<string, unknown> = { ...req.body };
    if (req.file) {
      updateData.image = await processImage(req.file.buffer, 'gallery', `dept-${Date.now()}`, 800, 500);
    }
    ['objectives', 'facilities', 'achievements'].forEach((key) => {
      if (updateData[key] && typeof updateData[key] === 'string') {
        updateData[key] = JSON.parse(updateData[key] as string);
      }
    });

    const department = await Department.findByIdAndUpdate(req.params.id, updateData, { new: true });
    if (!department) { res.status(404).json({ success: false, message: 'Department not found' }); return; }
    res.json({ success: true, department });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

export const deleteDepartment = async (req: Request, res: Response): Promise<void> => {
  try {
    const department = await Department.findByIdAndDelete(req.params.id);
    if (!department) { res.status(404).json({ success: false, message: 'Department not found' }); return; }
    res.json({ success: true, message: 'Department deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};
