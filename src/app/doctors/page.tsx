// app/doctors/page.jsx  (Next.js 13+ App Router)
"use client";
import React, { useState } from "react";

const doctorsData = [
  { id: 1, name: "Dr. Richard James", specialty: "General physician", available: true, image: "/doctor1.png" },
  { id: 2, name: "Dr. Emily Larson", specialty: "Gynecologist", available: true, image: "/doctor2.png" },
  { id: 3, name: "Dr. Sarah Patel", specialty: "Dermatologist", available: true, image: "/doctor3.png" },
  { id: 4, name: "Dr. Christopher Lee", specialty: "Pediatricians", available: true, image: "/doctor4.png" },
  { id: 5, name: "Dr. Anna Wilson", specialty: "Neurologist", available: true, image: "/doctor5.png" },
  { id: 6, name: "Dr. James Brown", specialty: "Gastroenterologist", available: true, image: "/doctor6.png" },
];

const categories = [
  "General physician",
  "Gynecologist",
  "Dermatologist",
  "Pediatricians",
  "Neurologist",
  "Gastroenterologist",
];

export default function DoctorsPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredDoctors =
    selectedCategory === "All"
      ? doctorsData
      : doctorsData.filter((doc) => doc.specialty === selectedCategory);

  return (
    <div className="px-6 md:px-20 lg:px-28 py-12">
      <h2 className="text-lg md:text-xl font-medium mb-6">
        Browse through the doctors specialist.
      </h2>

      <div className="grid md:grid-cols-4 gap-6">
        {/* Left Sidebar */}
        <div className="md:col-span-1">
          <button
            onClick={() => setSelectedCategory("All")}
            className={`w-full text-left border rounded-lg px-4 py-2 mb-2 ${
              selectedCategory === "All"
                ? "bg-blue-600 text-white"
                : "hover:bg-gray-100"
            }`}
          >
            All
          </button>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`w-full text-left border rounded-lg px-4 py-2 mb-2 ${
                selectedCategory === category
                  ? "bg-blue-600 text-white"
                  : "hover:bg-gray-100"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Doctors Grid */}
        <div className="md:col-span-3 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDoctors.map((doc) => (
            <div
              key={doc.id}
              className="border rounded-lg shadow-sm p-4 hover:shadow-lg transition"
            >
              <img
                src={doc.image}
                alt={doc.name}
                className="w-full h-52 object-contain rounded-md mb-3 bg-gray-50"
              />
              <p className="text-green-600 text-sm font-medium mb-1">
                ● Available
              </p>
              <h3 className="font-bold text-lg">{doc.name}</h3>
              <p className="text-gray-600">{doc.specialty}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
