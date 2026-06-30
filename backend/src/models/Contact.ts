import mongoose, { Document, Schema } from 'mongoose';

export interface IContact extends Document {
  address: string;
  phones: string[];
  emails: string[];
  googleMapEmbed: string;
  googleMapLink: string;
  officeHours: string;
  socialLinks: {
    facebook?: string;
    twitter?: string;
    instagram?: string;
    youtube?: string;
    linkedin?: string;
  };
  updatedAt: Date;
}

const contactSchema = new Schema<IContact>(
  {
    address: { type: String, default: '' },
    phones: [{ type: String }],
    emails: [{ type: String }],
    googleMapEmbed: { type: String, default: '' },
    googleMapLink: { type: String, default: '' },
    officeHours: { type: String, default: 'Monday - Saturday: 9:00 AM - 5:00 PM' },
    socialLinks: {
      facebook: String,
      twitter: String,
      instagram: String,
      youtube: String,
      linkedin: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model<IContact>('Contact', contactSchema);
