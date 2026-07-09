import mongoose, { Document, Schema } from 'mongoose';

export interface IPage extends Document {
  key: string;
  title: string;
  bannerImage: string;
  bannerTitle: string;
  bannerSubtitle: string;
  sections: any[]; // Changed to array for modular builder
  seoTitle: string;
  seoDescription: string;
  seoKeywords: string;
  ogImage: string;
  twitterCard: string;
  canonicalUrl: string;
  schemaJson: string;
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
    sections: { type: Schema.Types.Mixed, default: [] }, // Array of section objects
    seoTitle: { type: String, default: '' },
    seoDescription: { type: String, default: '' },
    seoKeywords: { type: String, default: '' },
    ogImage: { type: String, default: '' },
    twitterCard: { type: String, default: 'summary_large_image' },
    canonicalUrl: { type: String, default: '' },
    schemaJson: { type: String, default: '' },
  },
  { timestamps: true }
);

export default mongoose.model<IPage>('Page', pageSchema);
