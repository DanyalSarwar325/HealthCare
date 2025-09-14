// app/appointments/page.jsx
"use client";
import React from "react";

const appointments = [
  {
    id: 1,
    doctor: "Dr. Richard James",
    specialty: "General physician",
    status: "Pending",
    date: "19 Oct 2025",
    time: "11:30 AM",
    image: "/doctor1.png",
  },
  {
    id: 2,
    doctor: "Dr. Richard James",
    specialty: "General physician",
    status: "Pending",
    date: "14 Oct 2025",
    time: "10:30 AM",
    image: "/doctor1.png",
  },
];

export default function AppointmentsPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h2 className="text-xl font-semibold mb-6">My Appointments</h2>
      <div className="space-y-6">
        {appointments.map((apt) => (
          <div
            key={apt.id}
            className="flex flex-col md:flex-row items-start md:items-center justify-between  rounded-lg p-4  bg-white"
          >
            {/* Doctor Info */}
            <div className="flex items-start md:items-center gap-4">
              <img
                src={apt.image}
                alt={apt.doctor}
                className="w-24 h-24 object-cover rounded-lg"
              />
              <div>
                <h3 className="font-semibold text-lg">{apt.doctor}</h3>
                <p className="text-gray-600">{apt.specialty}</p>
                <p className="text-gray-800 font-medium">
                  Status:{" "}
                  <span className="text-yellow-600">{apt.status}</span>
                </p>
                <p className="text-gray-600">
                  <span className="font-medium">Date & Time:</span> {apt.date} |{" "}
                  {apt.time}
                </p>
              </div>
            </div>

            {/* Cancel Button */}
            <button className="mt-4 md:mt-0 border border-gray-300 px-4 py-2 rounded-md text-gray-700 hover:bg-red-500 hover:text-white transition">
              Cancel appointment
            </button>
            <hr className="border-t border-gray-300 my-4" />

          </div>
        ))}
      </div>
    </div>
  );
}
