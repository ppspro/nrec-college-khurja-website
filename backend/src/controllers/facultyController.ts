import { Request, Response } from 'express';
import Faculty from '../models/Faculty';
import { processImage } from '../middleware/upload';
import slugify from 'slugify';

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

export const getFacultyBySlug = async (req: Request, res: Response): Promise<void> => {
  try {
    const faculty = await Faculty.findOne({ slug: req.params.slug }).populate('department', 'name');
    if (!faculty) { res.status(404).json({ success: false, message: 'Faculty not found' }); return; }
    res.json({ success: true, faculty });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

export const getPrincipal = async (_req: Request, res: Response): Promise<void> => {
  try {
    // Principal has designation: 'Principal' or contains 'Principal'
    const principal = await Faculty.findOne({ designation: /Principal/i, isActive: true }).populate('department', 'name');
    if (!principal) {
      res.status(404).json({ success: false, message: 'Principal not found' });
      return;
    }
    res.json({ success: true, principal });
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
    const { name, slug, designation, qualification, department, faculty: facultyCat, email, phone, biography, specialization, experience, publications, officeHours, order } = req.body;

    let photo = '';
    if (req.file) {
      photo = await processImage(req.file.buffer, 'faculty', `faculty-${Date.now()}`, 400, 400);
    }

    let slugVal = slug;
    if (!slugVal || !slugVal.trim()) {
      let baseSlug = slugify(name, { lower: true, strict: true });
      slugVal = baseSlug;
      let exists = await Faculty.findOne({ slug: slugVal });
      let count = 1;
      while (exists) {
        slugVal = `${baseSlug}-${count}`;
        exists = await Faculty.findOne({ slug: slugVal });
        count++;
      }
    } else {
      slugVal = slugify(slugVal, { lower: true, strict: true });
    }

    const faculty = await Faculty.create({
      name, slug: slugVal, designation, qualification, department, faculty: facultyCat || '', email, phone, photo, biography,
      specialization: specialization ? (typeof specialization === 'string' && (specialization.startsWith('[') || specialization.startsWith('{')) ? JSON.parse(specialization) : (typeof specialization === 'string' ? specialization.split(',').map((s: string) => s.trim()).filter(Boolean) : specialization)) : [],
      experience,
      publications: publications ? (typeof publications === 'string' && (publications.startsWith('[') || publications.startsWith('{')) ? JSON.parse(publications) : (typeof publications === 'string' ? publications.split('\n').map((p: string) => p.trim()).filter(Boolean) : publications)) : [],
      officeHours: officeHours || '',
      order: order || 0,
    });
    res.status(201).json({ success: true, faculty });
  } catch (error) {
    console.error('Error creating faculty:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

export const updateFaculty = async (req: Request, res: Response): Promise<void> => {
  try {
    const updateData: Record<string, any> = { ...req.body };
    if (req.file) {
      updateData.photo = await processImage(req.file.buffer, 'faculty', `faculty-${Date.now()}`, 400, 400);
    }

    if (updateData.slug) {
      updateData.slug = slugify(updateData.slug, { lower: true, strict: true });
    } else if (updateData.name) {
      let baseSlug = slugify(updateData.name, { lower: true, strict: true });
      let slugVal = baseSlug;
      let exists = await Faculty.findOne({ slug: slugVal, _id: { $ne: req.params.id } });
      let count = 1;
      while (exists) {
        slugVal = `${baseSlug}-${count}`;
        exists = await Faculty.findOne({ slug: slugVal, _id: { $ne: req.params.id } });
        count++;
      }
      updateData.slug = slugVal;
    }

    ['specialization', 'publications'].forEach((key) => {
      if (updateData[key] && typeof updateData[key] === 'string') {
        if (updateData[key].startsWith('[') || updateData[key].startsWith('{')) {
          updateData[key] = JSON.parse(updateData[key] as string);
        } else if (key === 'specialization') {
          updateData[key] = updateData[key].split(',').map((s: string) => s.trim()).filter(Boolean);
        } else if (key === 'publications') {
          updateData[key] = updateData[key].split('\n').map((p: string) => p.trim()).filter(Boolean);
        }
      }
    });

    const faculty = await Faculty.findByIdAndUpdate(req.params.id, updateData, { new: true });
    if (!faculty) { res.status(404).json({ success: false, message: 'Faculty not found' }); return; }
    res.json({ success: true, faculty });
  } catch (error) {
    console.error('Error updating faculty:', error);
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
