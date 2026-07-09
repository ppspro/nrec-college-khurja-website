import { Request, Response } from 'express';
import { AuthRequest } from '../middleware/auth';
import Media from '../models/Media';
import { processImage, saveFile, deleteFile } from '../middleware/upload';

// Upload single or multiple files
export const uploadMedia = async (req: AuthRequest, res: Response) => {
  try {
    const files = req.files as Express.Multer.File[];
    const folder = req.body.folder || 'media';
    const uploadedBy = req.admin?.id; // Assuming auth middleware attaches admin to req

    if (!files || files.length === 0) {
      return res.status(400).json({ success: false, message: 'No files uploaded' });
    }

    const mediaDocs = [];

    for (const file of files) {
      const isImage = file.mimetype.startsWith('image/') && !file.mimetype.includes('svg');
      let url = '';
      
      const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
      const filenameBase = file.originalname.replace(/[^a-zA-Z0-9]/g, '-').substring(0, 50);
      const outputFilename = `${filenameBase}-${uniqueSuffix}`;

      if (isImage) {
        url = await processImage(file.buffer, folder, outputFilename);
      } else {
        url = await saveFile(file.buffer, folder, file.originalname);
      }

      const media = await Media.create({
        filename: outputFilename,
        originalName: file.originalname,
        mimeType: file.mimetype,
        size: file.size,
        url,
        folder,
        uploadedBy
      });

      mediaDocs.push(media);
    }

    res.status(201).json({ success: true, media: mediaDocs });
  } catch (error: any) {
    console.error('Media upload error:', error);
    res.status(500).json({ success: false, message: 'Failed to upload media', error: error.message });
  }
};

// Get all media with pagination, filtering, search
export const getMedia = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 50;
    const skip = (page - 1) * limit;

    const filter: any = {};
    if (req.query.folder && req.query.folder !== 'all') {
      filter.folder = req.query.folder;
    }
    if (req.query.search) {
      filter.originalName = { $regex: req.query.search, $options: 'i' };
    }
    if (req.query.type) {
      if (req.query.type === 'image') filter.mimeType = { $regex: /^image\// };
      if (req.query.type === 'document') filter.mimeType = { $not: { $regex: /^image\// } };
    }

    const total = await Media.countDocuments(filter);
    const media = await Media.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate('uploadedBy', 'name email');

    res.json({
      success: true,
      media,
      pagination: {
        total,
        page,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};

// Delete media
export const removeMedia = async (req: Request, res: Response) => {
  try {
    const media = await Media.findById(req.params.id);
    if (!media) {
      return res.status(404).json({ success: false, message: 'Media not found' });
    }

    // Delete file from disk
    const relativePath = media.url.startsWith('/') ? media.url.substring(1) : media.url;
    deleteFile(relativePath);

    await media.deleteOne();

    res.json({ success: true, message: 'Media deleted successfully' });
  } catch (error: any) {
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};
