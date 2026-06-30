import mongoose, { Document, Schema } from 'mongoose';

export interface IEvent extends Document {
  title: string;
  slug: string;
  description: string;
  content: string;
  image: string;
  venue: string;
  startDate: Date;
  endDate: Date;
  startTime: string;
  endTime: string;
  category: string;
  registrationLink: string;
  isPublished: boolean;
  isFeatured: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const eventSchema = new Schema<IEvent>(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true },
    description: { type: String, default: '' },
    content: { type: String, default: '' },
    image: { type: String, default: '' },
    venue: { type: String, default: '' },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    startTime: { type: String, default: '' },
    endTime: { type: String, default: '' },
    category: {
      type: String,
      enum: ['Academic', 'Cultural', 'Sports', 'Seminar', 'Workshop', 'Exam', 'Holiday', 'Other'],
      default: 'Academic',
    },
    registrationLink: { type: String, default: '' },
    isPublished: { type: Boolean, default: true },
    isFeatured: { type: Boolean, default: false },
  },
  { timestamps: true }
);

eventSchema.index({ startDate: 1, isPublished: 1 });

export default mongoose.model<IEvent>('Event', eventSchema);
