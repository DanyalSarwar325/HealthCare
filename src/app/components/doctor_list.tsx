"use client";

import React from "react";
import Link from "next/link";

export const doctors = [
  { id: 1, name: "Dr. Richard James", specialty: "General physician", availability: true, image: "/frontend/doc1.png" },
  { id: 2, name: "Dr. Emily Larson", specialty: "Gynecologist", availability: true, image: "/doctor_image_12.jpg" },
  { id: 3, name: "Dr. Sarah Patel", specialty: "Dermatologist", availability: true, image: "/doctor_image_3.jpg" },
  { id: 4, name: "Dr. Christopher Lee", specialty: "Pediatrician", availability: true, image: "/doctor_image_5.jpg" },
];

export const DoctorsList = () => {
  
  return (
    <section className="py-10 px-5 md:px-20 bg-white">
      <div className="text-center mb-10">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
          Top Doctors to Book
        </h2>
        <p className="text-gray-500 mt-2">
          Simply browse through our extensive list of trusted doctors.
        </p>
      </div>

      {/* Doctors Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {doctors.map((doc) => (
          
          <Link
          
            key={doc.id}
            href={`/doctors/${doc.id}`}
            className="bg-white shadow-md rounded-2xl overflow-hidden border hover:shadow-lg transition cursor-pointer block no-underline"
            passHref
          >
           
            <div className="h-56 flex items-center justify-center bg-gray-50">
              <Link href="">
              <img
                src={doc.image}
                alt={doc.name}
                className="h-full object-contain pointer-events-none cursor-pointer"
              />
              </Link>
            </div>

            <div className="p-4">
              {doc.availability && (
                <p className="flex items-center text-green-500 text-sm font-medium mb-2">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                  Available
                </p>
              )}
              <h3 className="font-semibold text-lg text-gray-800">{doc.name}</h3>
              <p className="text-gray-500 text-sm">{doc.specialty}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};