import mongoose, { Document, Schema } from 'mongoose';

export interface IDepartment extends Document {
  name: string;
  slug: string;
  shortName: string;
  description: string;
  image: string;
  icon: string;
  headOfDepartment: string;
  establishedYear: string;
  vision: string;
  mission: string;
  objectives: string[];
  facilities: string[];
  achievements: string[];
  order: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const departmentSchema = new Schema<IDepartment>(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true },
    shortName: { type: String, trim: true, default: '' },
    description: { type: String, default: '' },
    image: { type: String, default: '' },
    icon: { type: String, default: '' },
    headOfDepartment: { type: String, default: '' },
    establishedYear: { type: String, default: '' },
    vision: { type: String, default: '' },
    mission: { type: String, default: '' },
    objectives: [{ type: String }],
    facilities: [{ type: String }],
    achievements: [{ type: String }],
    order: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.model<IDepartment>('Department', departmentSchema);
