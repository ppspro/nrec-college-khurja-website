import mongoose, { Document, Schema } from 'mongoose';

export interface IGalleryAlbum extends Document {
  title: string;
  slug: string;
  description: string;
  coverImage: string;
  type: 'photo' | 'video';
  isActive: boolean;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

const galleryAlbumSchema = new Schema<IGalleryAlbum>(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true },
    description: { type: String, default: '' },
    coverImage: { type: String, default: '' },
    type: { type: String, enum: ['photo', 'video'], default: 'photo' },
    isActive: { type: Boolean, default: true },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.model<IGalleryAlbum>('GalleryAlbum', galleryAlbumSchema);
