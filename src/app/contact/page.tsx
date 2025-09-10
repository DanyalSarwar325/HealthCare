import React from "react";

export default function ContactPage() {
  return (
    <div className="px-6 md:px-20 lg:px-40 py-12">
      {/* Heading */}
      <h2 className="text-center text-2xl md:text-3xl font-medium mb-12">
        CONTACT <span className="font-bold">US</span>
      </h2>

      <div className="grid md:grid-cols-2 gap-10 items-center">
        {/* Left Side Image */}
        <div>
          <img
            src="/frontend/contact_image.png"
            alt="Doctor consultation"
            className="rounded-lg shadow-md w-full object-cover"
          />
        </div>

        {/* Right Side Form */}
        <div>
          <h3 className="text-lg font-bold mb-4">Get in Touch</h3>
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Name</label>
              <input
                type="text"
                placeholder="Your Name"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input
                type="email"
                placeholder="Your Email"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Message</label>
              <textarea
                rows="4"
                placeholder="Write your message..."
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              ></textarea>
            </div>

            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded-lg shadow hover:bg-blue-700 transition"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
