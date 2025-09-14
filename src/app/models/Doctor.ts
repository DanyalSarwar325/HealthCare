import mongoose, { Schema, Document, Model } from "mongoose";

// Define TS interface for type-safety
export interface Doctor extends Document {
  name: string;
  Specialization: string;
  description: string;
  appointmentFee: string;
  image: string;
  availability: boolean;
}

// Define schema
const DoctorSchema: Schema<Doctor> = new Schema({
  name: {
    type: String,
    required: [true, "Doctor name is required"],
    trim: true,
  },
  Specialization: {
    type: String,
    required: [true, "Specialization name is required"],
    trim: true,
  },
  description: {
    type: String,
    required: [true, "Description is required"],
    trim: true,
  },
  appointmentFee: {
    type: String,
    default: "PKR 0", // optional default
  },
  image: {
    type: String,
    required: [true, "Image is required"],
  },
  availability: {
    type: Boolean,
    default: true,
  },
});

// Avoid model overwrite in Next.js hot-reload
const DoctorModel: Model<Doctor> =
  mongoose.models.Doctor as mongoose.Model<Doctor>  || mongoose.model<Doctor>("Doctor", DoctorSchema);

export default DoctorModel;
