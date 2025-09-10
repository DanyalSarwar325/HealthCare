// components/Specialities.tsx
"use client";

export const Specialities = () => {
  const specialities = [
    { name: "General physician", icon: "/speciality/physician_1.png" },
    { name: "Gynecologist", icon: "/speciality/physician_2.png"},
    { name: "Dermatologist", icon: "/speciality/physician_3.png" },
    { name: "Pediatricians", icon: "/speciality/physician_4.png" },
    { name: "Neurologist", icon:"/speciality/surgeon.png"},
    { name: "Gastroenterologist", icon: "/speciality/nutritionist.png" },
  ];

  return (
    <section className="w-[90%] mx-auto mt-16 text-center mb-30">
      {/* Heading */}
      <h2 className="text-2xl md:text-3xl font-semibold mb-2">
        Find by Speciality
      </h2>
      <p className="text-gray-600 max-w-2xl mx-auto mb-10 text-sm md:text-base">
        Simply browse through our extensive list of trusted doctors,
        schedule your appointment hassle-free.
      </p>

      {/* Specialities Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6 md:gap-10">
        {specialities.map((item) => (
          <div
            key={item.name}
            className="flex flex-col items-center text-center space-y-2 hover:scale-105 transition"
          >
            <img
              src={item.icon}
              alt={item.name}
              className="w-20 h-20 md:w-24 md:h-24 rounded-full"
            />
            <span className="text-sm md:text-base text-gray-700 font-medium">
              {item.name}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
};
