"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";

type Doctor = {
  _id: string;
  name: string;
  Specialization: string;
  description: string;
  appointmentFee: string;
  image: string;
  availability: boolean;
};

export default function DoctorDetails() {
  const { id } = useParams(); // get doctor id from URL
  const [doctor, setDoctor] = useState<Doctor | null>(null);
  const [loading, setLoading] = useState(true);

  // Days & slots
  const days = [
    { id: 1, label: "THU", date: "11" },
    { id: 2, label: "FRI", date: "12" },
    { id: 3, label: "SAT", date: "13" },
    { id: 4, label: "SUN", date: "14" },
    { id: 5, label: "MON", date: "15" },
    { id: 6, label: "TUE", date: "16" },
  ];

  const slots: Record<number, string[]> = {
    1: ["10:00 am", "10:30 am", "11:00 am", "11:30 am", "12:00 pm", "12:30 pm", "01:00 pm"],
    2: ["09:30 am", "10:00 am", "11:30 am"],
    3: ["11:00 am", "12:00 pm", "01:30 pm"],
    4: ["09:00 am", "09:30 am", "10:00 am"],
    5: ["10:30 am", "11:00 am", "01:00 pm"],
    6: ["09:00 am", "12:30 pm", "01:30 pm"],
  };

  const [selectedDay, setSelectedDay] = useState<number | null>(1);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);

  // Fetch doctor details
  useEffect(() => {
    async function fetchDoctor() {
      try {
        const res = await fetch(`/api/doctorDetails/${id}`);
        const data = await res.json();
        setDoctor(data);
      } catch (err) {
        console.error("Failed to fetch doctor details:", err);
      } finally {
        setLoading(false);
      }
    }
    if (id) fetchDoctor();
  }, [id]);

  if (loading) return <p className="p-6">Loading doctor details...</p>;
  if (!doctor) return <p className="p-6 text-red-500">Doctor not found</p>;

  return (
    <div className="flex flex-col items-center px-4 py-8 md:flex-row md:items-start md:gap-6 lg:px-16">
      {/* Doctor Image */}
      <div className="flex-shrink-0 w-full md:w-1/3">
        <Image
          src={doctor.image}
          alt={doctor.name}
          className="rounded-2xl object-cover w-full h-[300px] md:h-[400px]"
        />
      </div>

      {/* Doctor Details */}
      <div className="w-full md:w-2/3 bg-white rounded-xl shadow p-6 mt-6 md:mt-0">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          {doctor.name} <span className="text-blue-600">✔</span>
        </h1>
        <p className="text-gray-600">
          {doctor.Specialization}
          <span className="ml-2 bg-gray-200 text-gray-700 text-sm px-2 py-0.5 rounded-full">
            {doctor.availability ? "Available" : "Not Available"}
          </span>
        </p>

        <div className="mt-4">
          <h2 className="font-semibold">About</h2>
          <p className="text-gray-600 text-sm leading-relaxed">{doctor.description}</p>
        </div>

        <p className="mt-4 font-semibold">
          Appointment fee: <span className="text-blue-600">{doctor.appointmentFee}</span>
        </p>

        {/* Booking Slots */}
        <div className="mt-6">
          <h2 className="font-semibold mb-2">Booking slots</h2>
          <div className="flex gap-3 overflow-x-auto pb-2">
            {days.map((day) => (
              <button
                key={day.id}
                onClick={() => {
                  setSelectedDay(day.id);
                  setSelectedSlot(null);
                }}
                className={`flex flex-col items-center px-4 py-2 rounded-full border 
                  ${selectedDay === day.id ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-700"}`}
              >
                <span className="font-bold">{day.label}</span>
                <span className="text-sm">{day.date}</span>
              </button>
            ))}
          </div>

          {/* Time Slots */}
          <div className="flex flex-wrap gap-3 mt-4">
            {selectedDay &&
              slots[selectedDay].map((time) => (
                <button
                  key={time}
                  onClick={() => setSelectedSlot(time)}
                  className={`px-4 py-2 rounded-full border 
                    ${selectedSlot === time ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-700"}`}
                >
                  {time}
                </button>
              ))}
          </div>
        </div>

        {/* Book Appointment */}
        <button
          className="mt-6 w-full bg-blue-600 text-white py-3 rounded-full font-semibold hover:bg-blue-700 transition"
        >
          Book an appointment
        </button>
      </div>
    </div>
  );
}
