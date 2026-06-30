import mongoose, { Document, Schema } from 'mongoose';

export interface INotice extends Document {
  title: string;
  content: string;
  category: string;
  attachment: string;
  isPinned: boolean;
  isActive: boolean;
  expiryDate: Date | null;
  publishDate: Date;
  createdAt: Date;
  updatedAt: Date;
}

const noticeSchema = new Schema<INotice>(
  {
    title: { type: String, required: true, trim: true },
    content: { type: String, default: '' },
    category: {
      type: String,
      enum: ['General', 'Examination', 'Admission', 'Academic', 'Administrative', 'Scholarship', 'Sports', 'Cultural'],
      default: 'General',
    },
    attachment: { type: String, default: '' },
    isPinned: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },
    expiryDate: { type: Date, default: null },
    publishDate: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

noticeSchema.index({ isPinned: -1, publishDate: -1 });

export default mongoose.model<INotice>('Notice', noticeSchema);
