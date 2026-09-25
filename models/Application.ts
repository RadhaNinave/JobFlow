import mongoose, { Schema, Document, Model, Types } from "mongoose";
export type ApplicationStatus =
  | "Applied"
  | "Reviewing"
  | "Shortlisted"
  | "Rejected"
  | "Selected";
export interface IApplication extends Document {
  job: Types.ObjectId;
  candidate: Types.ObjectId;
  status: ApplicationStatus;
  coverNote?: string;
  createdAt: Date;
}
const ApplicationSchema = new Schema<IApplication>(
  {
    job: { type: Schema.Types.ObjectId, ref: "Job", required: true },
    candidate: { type: Schema.Types.ObjectId, ref: "User", required: true },
    status: {
      type: String,
      enum: ["Applied", "Reviewing", "Shortlisted", "Rejected", "Selected"],
      default: "Applied",
    },
    coverNote: String,
  },
  { timestamps: true },
);
ApplicationSchema.index({ job: 1, candidate: 1 }, { unique: true });
export default (mongoose.models.Application as Model<IApplication>) ||
  mongoose.model<IApplication>("Application", ApplicationSchema);
