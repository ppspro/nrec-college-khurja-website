import mongoose, { Document, Schema } from 'mongoose';

export interface INews extends Document {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  image: string;
  category: string;
  tags: string[];
  isPublished: boolean;
  isFeatured: boolean;
  publishDate: Date;
  author: string;
  createdAt: Date;
  updatedAt: Date;
}

const newsSchema = new Schema<INews>(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true },
    excerpt: { type: String, default: '' },
    content: { type: String, default: '' },
    image: { type: String, default: '' },
    category: {
      type: String,
      enum: ['General', 'Academic', 'Sports', 'Cultural', 'Achievement', 'Administrative'],
      default: 'General',
    },
    tags: [{ type: String }],
    isPublished: { type: Boolean, default: true },
    isFeatured: { type: Boolean, default: false },
    publishDate: { type: Date, default: Date.now },
    author: { type: String, default: 'NREC College' },
  },
  { timestamps: true }
);

newsSchema.index({ publishDate: -1, isPublished: 1 });

export default mongoose.model<INews>('News', newsSchema);
