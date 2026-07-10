import mongoose, { Document, Schema } from 'mongoose';

export interface IContactInquiry extends Document {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  status: 'new' | 'read' | 'replied';
  createdAt: Date;
}

const contactInquirySchema = new Schema<IContactInquiry>(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    phone: { type: String, trim: true },
    subject: { type: String, required: true, trim: true },
    message: { type: String, required: true, trim: true },
    status: { type: String, enum: ['new', 'read', 'replied'], default: 'new' },
  },
  { timestamps: true }
);

export default mongoose.model<IContactInquiry>('ContactInquiry', contactInquirySchema);
