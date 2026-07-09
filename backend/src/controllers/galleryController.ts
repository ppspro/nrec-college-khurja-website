import { Request, Response } from 'express';
import GalleryAlbum from '../models/GalleryAlbum';
import GalleryImage from '../models/GalleryImage';
import slugify from 'slugify';
import { processImage } from '../middleware/upload';

export const getAlbums = async (_req: Request, res: Response): Promise<void> => {
  try {
    const albums = await GalleryAlbum.find({ isActive: true }).sort({ order: 1, createdAt: -1 });
    res.json({ success: true, albums });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

export const getAllImages = async (_req: Request, res: Response): Promise<void> => {
  try {
    const images = await GalleryImage.find({ isActive: true }).sort({ createdAt: -1 });
    res.json({ success: true, images });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

export const getAlbumImages = async (req: Request, res: Response): Promise<void> => {
  try {
    const album = await GalleryAlbum.findOne({ slug: req.params.slug, isActive: true });
    if (!album) { res.status(404).json({ success: false, message: 'Album not found' }); return; }
    const images = await GalleryImage.find({ album: album._id, isActive: true }).sort({ order: 1 });
    res.json({ success: true, album, images });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

export const getAllAlbumsAdmin = async (_req: Request, res: Response): Promise<void> => {
  try {
    const albums = await GalleryAlbum.find().sort({ order: 1 });
    res.json({ success: true, albums });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

export const createAlbum = async (req: Request, res: Response): Promise<void> => {
  try {
    const { title, description, type, order } = req.body;
    const slug = slugify(title, { lower: true, strict: true });
    let coverImage = '';
    if (req.file) {
      coverImage = await processImage(req.file.buffer, 'gallery', `album-${Date.now()}`, 800, 600);
    }
    const album = await GalleryAlbum.create({ title, slug, description, coverImage, type, order: order || 0 });
    res.status(201).json({ success: true, album });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

export const updateAlbum = async (req: Request, res: Response): Promise<void> => {
  try {
    const updateData: Record<string, unknown> = { ...req.body };
    if (req.file) {
      updateData.coverImage = await processImage(req.file.buffer, 'gallery', `album-${Date.now()}`, 800, 600);
    }
    const album = await GalleryAlbum.findByIdAndUpdate(req.params.id, updateData, { new: true });
    if (!album) { res.status(404).json({ success: false, message: 'Album not found' }); return; }
    res.json({ success: true, album });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

export const deleteAlbum = async (req: Request, res: Response): Promise<void> => {
  try {
    await GalleryImage.deleteMany({ album: req.params.id });
    const album = await GalleryAlbum.findByIdAndDelete(req.params.id);
    if (!album) { res.status(404).json({ success: false, message: 'Album not found' }); return; }
    res.json({ success: true, message: 'Album and images deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

export const addImages = async (req: Request, res: Response): Promise<void> => {
  try {
    const { albumId, title, description, videoUrl, order } = req.body;
    const files = req.files as Express.Multer.File[];

    if (videoUrl) {
      const img = await GalleryImage.create({ album: albumId, title, description, videoUrl, order: order || 0 });
      res.status(201).json({ success: true, image: img });
      return;
    }

    if (!files || files.length === 0) { res.status(400).json({ success: false, message: 'No files uploaded' }); return; }

    const images = await Promise.all(
      files.map(async (file, i) => {
        const image = await processImage(file.buffer, 'gallery', `img-${Date.now()}-${i}`, 1200, 800);
        const thumbnail = await processImage(file.buffer, 'gallery', `thumb-${Date.now()}-${i}`, 400, 300);
        return GalleryImage.create({ album: albumId, title, description, image, thumbnail, order: (order || 0) + i });
      })
    );

    res.status(201).json({ success: true, images });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

export const deleteImage = async (req: Request, res: Response): Promise<void> => {
  try {
    const image = await GalleryImage.findByIdAndDelete(req.params.id);
    if (!image) { res.status(404).json({ success: false, message: 'Image not found' }); return; }
    res.json({ success: true, message: 'Image deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};
