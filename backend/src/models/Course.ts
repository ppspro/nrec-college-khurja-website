import mongoose, { Document, Schema } from 'mongoose';

export type CourseLevel = 'UG' | 'PG' | 'Diploma' | 'Certificate' | 'PhD';
export type CourseType = 'Regular' | 'Self-Finance' | 'Distance';

export interface ICourse extends Document {
  name: string;
  slug: string;
  code: string;
  department: mongoose.Types.ObjectId;
  level: CourseLevel;
  type: CourseType;
  duration: string;
  totalSeats: number;
  description: string;
  eligibility: string;
  feeStructure: string;
  syllabus: string;
  image: string;
  highlights: string[];
  careerProspects: string[];
  order: number;
  isActive: boolean;
  isFeatured: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const courseSchema = new Schema<ICourse>(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true },
    code: { type: String, trim: true, default: '' },
    department: { type: Schema.Types.ObjectId, ref: 'Department', required: true },
    level: { type: String, enum: ['UG', 'PG', 'Diploma', 'Certificate', 'PhD'], default: 'UG' },
    type: { type: String, enum: ['Regular', 'Self-Finance', 'Distance'], default: 'Regular' },
    duration: { type: String, default: '3 Years' },
    totalSeats: { type: Number, default: 0 },
    description: { type: String, default: '' },
    eligibility: { type: String, default: '' },
    feeStructure: { type: String, default: '' },
    syllabus: { type: String, default: '' },
    image: { type: String, default: '' },
    highlights: [{ type: String }],
    careerProspects: [{ type: String }],
    order: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
    isFeatured: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.model<ICourse>('Course', courseSchema);
