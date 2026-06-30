import { Request, Response } from 'express';
import Course from '../models/Course';
import slugify from 'slugify';

export const getCourses = async (req: Request, res: Response): Promise<void> => {
  try {
    const { department, level, featured } = req.query;
    const query: Record<string, unknown> = { isActive: true };
    if (department) query.department = department;
    if (level) query.level = level;
    if (featured === 'true') query.isFeatured = true;

    const courses = await Course.find(query).populate('department', 'name slug').sort({ order: 1, name: 1 });
    res.json({ success: true, courses });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

export const getCourseBySlug = async (req: Request, res: Response): Promise<void> => {
  try {
    const course = await Course.findOne({ slug: req.params.slug, isActive: true }).populate('department', 'name slug');
    if (!course) { res.status(404).json({ success: false, message: 'Course not found' }); return; }
    res.json({ success: true, course });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

export const getAllCoursesAdmin = async (_req: Request, res: Response): Promise<void> => {
  try {
    const courses = await Course.find().populate('department', 'name').sort({ name: 1 });
    res.json({ success: true, courses });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

export const createCourse = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, code, department, level, type, duration, totalSeats, description, eligibility, feeStructure, syllabus, highlights, careerProspects, order, isFeatured } = req.body;
    const slug = slugify(name, { lower: true, strict: true });

    const course = await Course.create({
      name, slug, code, department, level, type, duration, totalSeats, description, eligibility, feeStructure, syllabus,
      highlights: highlights ? JSON.parse(highlights) : [],
      careerProspects: careerProspects ? JSON.parse(careerProspects) : [],
      order: order || 0,
      isFeatured: isFeatured === 'true',
    });
    res.status(201).json({ success: true, course });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

export const updateCourse = async (req: Request, res: Response): Promise<void> => {
  try {
    const updateData: Record<string, unknown> = { ...req.body };
    ['highlights', 'careerProspects'].forEach((key) => {
      if (updateData[key] && typeof updateData[key] === 'string') {
        updateData[key] = JSON.parse(updateData[key] as string);
      }
    });
    const course = await Course.findByIdAndUpdate(req.params.id, updateData, { new: true });
    if (!course) { res.status(404).json({ success: false, message: 'Course not found' }); return; }
    res.json({ success: true, course });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

export const deleteCourse = async (req: Request, res: Response): Promise<void> => {
  try {
    const course = await Course.findByIdAndDelete(req.params.id);
    if (!course) { res.status(404).json({ success: false, message: 'Course not found' }); return; }
    res.json({ success: true, message: 'Course deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};
