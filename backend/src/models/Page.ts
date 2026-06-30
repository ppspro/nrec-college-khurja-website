import mongoose, { Document, Schema } from 'mongoose';

export interface IPage extends Document {
  key: string;
  title: string;
  bannerImage: string;
  bannerTitle: string;
  bannerSubtitle: string;
  sections: Record<string, unknown>;
  seoTitle: string;
  seoDescription: string;
  createdAt: Date;
  updatedAt: Date;
}

const pageSchema = new Schema<IPage>(
  {
    key: { type: String, required: true, unique: true, trim: true },
    title: { type: String, required: true, trim: true },
    bannerImage: { type: String, default: '' },
    bannerTitle: { type: String, default: '' },
    bannerSubtitle: { type: String, default: '' },
    sections: { type: Schema.Types.Mixed, default: {} },
    seoTitle: { type: String, default: '' },
    seoDescription: { type: String, default: '' },
  },
  { timestamps: true }
);

export default mongoose.model<IPage>('Page', pageSchema);
