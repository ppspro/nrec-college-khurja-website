import mongoose, { Document, Schema } from 'mongoose';

export interface ISocialLinks {
  facebook?: string;
  twitter?: string;
  instagram?: string;
  youtube?: string;
  linkedin?: string;
}

export interface ISettings extends Document {
  collegeName: string;
  tagline: string;
  logo: string;
  favicon: string;
  address: string;
  phone: string[];
  email: string[];
  website: string;
  footerText: string;
  footerLinks: { label: string; url: string }[];
  socialLinks: ISocialLinks;
  seoTitle: string;
  seoDescription: string;
  seoKeywords: string;
  googleMapEmbed: string;
  establishedYear: string;
  affiliatedTo: string;
  recognizedBy: string[];
  updatedAt: Date;
}

const settingsSchema = new Schema<ISettings>(
  {
    collegeName: { type: String, default: 'NREC College' },
    tagline: { type: String, default: 'Excellence in Education Since 1901' },
    logo: { type: String, default: '' },
    favicon: { type: String, default: '' },
    address: { type: String, default: 'Khurja, Uttar Pradesh, India' },
    phone: [{ type: String }],
    email: [{ type: String }],
    website: { type: String, default: '' },
    footerText: { type: String, default: '' },
    footerLinks: [{ label: String, url: String }],
    socialLinks: {
      facebook: String,
      twitter: String,
      instagram: String,
      youtube: String,
      linkedin: String,
    },
    seoTitle: { type: String, default: 'NREC College Khurja | Excellence in Education Since 1901' },
    seoDescription: { type: String, default: 'NREC College, Khurja - A premier institution of higher education in Uttar Pradesh.' },
    seoKeywords: { type: String, default: 'NREC College, Khurja, UP college, higher education' },
    googleMapEmbed: { type: String, default: '' },
    establishedYear: { type: String, default: '1901' },
    affiliatedTo: { type: String, default: 'Chaudhary Charan Singh University, Meerut' },
    recognizedBy: [{ type: String }],
  },
  { timestamps: true }
);

export default mongoose.model<ISettings>('Settings', settingsSchema);
