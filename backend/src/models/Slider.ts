import mongoose, { Document, Schema } from 'mongoose';

export interface ISlider extends Document {
  title: string;
  subtitle: string;
  description: string;
  image: string;
  buttonText: string;
  buttonLink: string;
  order: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const sliderSchema = new Schema<ISlider>(
  {
    title: { type: String, required: true, trim: true },
    subtitle: { type: String, trim: true, default: '' },
    description: { type: String, trim: true, default: '' },
    image: { type: String, required: true },
    buttonText: { type: String, default: 'Learn More' },
    buttonLink: { type: String, default: '/' },
    order: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.model<ISlider>('Slider', sliderSchema);
