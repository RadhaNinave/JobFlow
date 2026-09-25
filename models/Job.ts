import mongoose, { Schema, Document, Model, Types } from "mongoose";
export interface IJob extends Document {
  title: string;
  company: string;
  location: string;
  type: string;
  description: string;
  salary?: string;
  skills: string[];
  isOpen: boolean;
  createdBy: Types.ObjectId;
  createdAt: Date;
}
const JobSchema = new Schema<IJob>(
  {
    title: { type: String, required: true, trim: true },
    company: { type: String, required: true, trim: true },
    location: { type: String, required: true, trim: true },
    type: { type: String, required: true },
    description: { type: String, required: true },
    salary: String,
    skills: [String],
    isOpen: { type: Boolean, default: true },
    createdBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true },
);
export default (mongoose.models.Job as Model<IJob>) ||
  mongoose.model<IJob>("Job", JobSchema);
