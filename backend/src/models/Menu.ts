import mongoose, { Document, Schema } from 'mongoose';

export interface IMenuItem {
  _id?: string;
  label: string;
  url: string;
  target?: string;
  order: number;
  children?: IMenuItem[];
}

export interface IMenu extends Document {
  key: string;
  name: string;
  items: IMenuItem[];
  createdAt: Date;
  updatedAt: Date;
}

const menuItemSchema = new Schema<IMenuItem>({
  label: { type: String, required: true },
  url: { type: String, required: true },
  target: { type: String, default: '_self' },
  order: { type: Number, default: 0 },
  children: { type: Schema.Types.Mixed, default: [] },
});

const menuSchema = new Schema<IMenu>(
  {
    key: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    items: [menuItemSchema],
  },
  { timestamps: true }
);

export default mongoose.model<IMenu>('Menu', menuSchema);
