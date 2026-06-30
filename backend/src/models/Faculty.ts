import mongoose, { Document, Schema } from 'mongoose';
import bcrypt from 'bcryptjs';

export interface IFaculty extends Document {
  name: string;
  designation: string;
  qualification: string;
  department: mongoose.Types.ObjectId;
  email: string;
  password?: string;
  phone: string;
  photo: string;
  avatar?: string;
  biography: string;
  specialization: string[];
  experience: string;
  publications: string[];
  order: number;
  isActive: boolean;
  isHod: boolean;
  refreshToken?: string;
  createdAt: Date;
  updatedAt: Date;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

const facultySchema = new Schema<IFaculty>(
  {
    name: { type: String, required: true, trim: true },
    designation: { type: String, required: true, trim: true },
    qualification: { type: String, required: true, trim: true },
    department: { type: Schema.Types.ObjectId, ref: 'Department', required: true },
    email: { type: String, trim: true, lowercase: true, default: '' },
    password: { type: String, select: false },
    phone: { type: String, trim: true, default: '' },
    photo: { type: String, default: '' },
    avatar: { type: String, default: '' },
    biography: { type: String, default: '' },
    specialization: [{ type: String }],
    experience: { type: String, default: '' },
    publications: [{ type: String }],
    order: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
    isHod: { type: Boolean, default: false },
    refreshToken: { type: String, select: false },
  },
  { timestamps: true }
);

facultySchema.pre<IFaculty>('save', async function (next) {
  if (!this.isModified('password') || !this.password) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err: any) {
    next(err);
  }
});

facultySchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {
  if (!this.password) return false;
  return bcrypt.compare(candidatePassword, this.password);
};

export default mongoose.model<IFaculty>('Faculty', facultySchema);
