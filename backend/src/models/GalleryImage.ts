import mongoose, { Document, Schema } from 'mongoose';

export interface IGalleryImage extends Document {
  album: mongoose.Types.ObjectId;
  title: string;
  description: string;
  image: string;
  thumbnail: string;
  videoUrl: string;
  order: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const galleryImageSchema = new Schema<IGalleryImage>(
  {
    album: { type: Schema.Types.ObjectId, ref: 'GalleryAlbum', required: true },
    title: { type: String, trim: true, default: '' },
    description: { type: String, default: '' },
    image: { type: String, default: '' },
    thumbnail: { type: String, default: '' },
    videoUrl: { type: String, default: '' },
    order: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.model<IGalleryImage>('GalleryImage', galleryImageSchema);
