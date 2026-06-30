import mongoose, { Document, Schema } from 'mongoose';

export interface ICurriculum extends Document {
  title: string;
  faculty: string;
  department: mongoose.Types.ObjectId;
  course: mongoose.Types.ObjectId;
  semesterYear: string;
  pdfFile: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const curriculumSchema = new Schema<ICurriculum>(
  {
    title: { type: String, required: true, trim: true },
    faculty: { type: String, required: true, trim: true },
    department: { type: Schema.Types.ObjectId, ref: 'Department', required: true },
    course: { type: Schema.Types.ObjectId, ref: 'Course', required: true },
    semesterYear: { type: String, required: true },
    pdfFile: { type: String, required: true },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.model<ICurriculum>('Curriculum', curriculumSchema);
