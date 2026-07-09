import mongoose, { Document, Schema } from 'mongoose';

export interface IMedia extends Document {
  filename: string;
  originalName: string;
  mimeType: string;
  size: number;
  url: string;
  folder: string;
  altText: string;
  width?: number;
  height?: number;
  uploadedBy?: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const mediaSchema = new Schema<IMedia>(
  {
    filename: { type: String, required: true },
    originalName: { type: String, required: true },
    mimeType: { type: String, required: true },
    size: { type: Number, required: true }, // in bytes
    url: { type: String, required: true }, // Public URL
    folder: { type: String, default: 'root' },
    altText: { type: String, default: '' },
    width: { type: Number },
    height: { type: Number },
    uploadedBy: { type: Schema.Types.ObjectId, ref: 'Admin' },
  },
  { timestamps: true }
);

export default mongoose.model<IMedia>('Media', mediaSchema);
