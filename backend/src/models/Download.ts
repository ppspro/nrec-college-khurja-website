import mongoose, { Document, Schema } from 'mongoose';

export type DownloadCategory =
  | 'Prospectus'
  | 'Academic Calendar'
  | 'Examination Forms'
  | 'NAAC Documents'
  | 'NIRF Documents'
  | 'Annual Reports'
  | 'Admission Forms'
  | 'Miscellaneous';

export interface IDownload extends Document {
  title: string;
  description: string;
  category: DownloadCategory;
  file: string;
  fileType: string;
  fileSize: string;
  isActive: boolean;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

const downloadSchema = new Schema<IDownload>(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, default: '' },
    category: {
      type: String,
      enum: [
        'Prospectus',
        'Academic Calendar',
        'Examination Forms',
        'NAAC Documents',
        'NIRF Documents',
        'Annual Reports',
        'Admission Forms',
        'Miscellaneous',
      ],
      required: true,
    },
    file: { type: String, required: true },
    fileType: { type: String, default: 'PDF' },
    fileSize: { type: String, default: '' },
    isActive: { type: Boolean, default: true },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.model<IDownload>('Download', downloadSchema);
