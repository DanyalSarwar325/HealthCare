"use client";
import Image from "next/image";

export default function AboutPage() {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative bg-gray-50">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center px-6 py-12 md:py-20">
          {/* Left Text Content */}
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Medical Services <br />
              That You Can <span className="text-blue-600">Trust</span>
            </h2>
            <p className="mt-4 text-gray-600 max-w-md">
              Leverage agile frameworks to provide a robust synopsis for high
              level overviews. Iterative approaches to corporate strategy.
            </p>
            <div className="mt-6 flex justify-center md:justify-start gap-4">
              <button className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow hover:bg-blue-700">
                View Details
              </button>
              <button className="px-6 py-3 bg-red-500 text-white font-semibold rounded-lg shadow hover:bg-red-600">
                Make an Appointment
              </button>
            </div>
          </div>

          {/* Right Image */}
          <div className="flex-1 mt-10 md:mt-0 flex justify-center">
            <Image
              src="/doctor_image_1.jpg"
              alt="Doctor"
              width={400}
              height={400}
              className="rounded-lg shadow-lg object-cover"
            />
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="bg-blue-600 py-12">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-6 text-white">
          {/* Card 1 */}
          <div className="p-6 bg-blue-700 rounded-xl shadow hover:shadow-xl transition">
            <div className="text-3xl mb-4">🏥</div>
            <h3 className="text-xl font-semibold">Operation Theater</h3>
            <p className="mt-2 text-sm text-gray-200">
              Leverage agile frameworks to provide a robust synopsis for high
              level overviews. Iterative approaches to corporate strategy.
            </p>
          </div>

          {/* Card 2 */}
          <div className="p-6 bg-blue-700 rounded-xl shadow hover:shadow-xl transition">
            <div className="text-3xl mb-4">💊</div>
            <h3 className="text-xl font-semibold">Medical Store</h3>
            <p className="mt-2 text-sm text-gray-200">
              Leverage agile frameworks to provide a robust synopsis for high
              level overviews. Iterative approaches to corporate strategy.
            </p>
          </div>

          {/* Card 3 */}
          <div className="p-6 bg-blue-700 rounded-xl shadow hover:shadow-xl transition">
            <div className="text-3xl mb-4">🚑</div>
            <h3 className="text-xl font-semibold">Ambulance</h3>
            <p className="mt-2 text-sm text-gray-200">
              Leverage agile frameworks to provide a robust synopsis for high
              level overviews. Iterative approaches to corporate strategy.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
