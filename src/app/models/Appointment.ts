// models/Appointment.ts
import mongoose, { Schema, Document, Model } from "mongoose";

export interface IAppointment extends Document {
  patientName: string;       // from current user
  patientId: mongoose.Types.ObjectId; // user _id
  doctorId: mongoose.Types.ObjectId;  // doctor _id
  doctorName: string;
  department: string;
  bookingDate: Date;         // actual date
  time: string;              // selected time slot
  status: "pending" | "confirmed" | "cancelled";
}

const AppointmentSchema: Schema<IAppointment> = new Schema(
  {
    patientName: { type: String, required: true },
    patientId: { type: Schema.Types.ObjectId, ref: "User", required: true },

    doctorId: { type: Schema.Types.ObjectId, ref: "Doctor", required: true },
    doctorName: { type: String, required: true },
    department: { type: String, required: true },

    bookingDate: { type: Date, required: true },
    time: { type: String, required: true },

    status: {
      type: String,
      enum: ["pending", "confirmed", "cancelled"],
      default: "pending",
    },
  },
  { timestamps: true }
);

const Appointment: Model<IAppointment> =
  mongoose.models.Appointment ||
  mongoose.model<IAppointment>("Appointment", AppointmentSchema);

export default Appointment;
