// app/lib/seedDoctors.ts
import DbConnect from "@/app/lib/dbConnect";
import DoctorModel from "@/app/models/Doctor";

export async function seedDoctors() {
  await DbConnect();

    const doctors = [
    {
      name: "Dr. Richard James",
      Specialization: "General physician",
      description:
        "Dr. Richard James is a trusted general physician with more than 12 years of experience. He focuses on diagnosing and treating common medical conditions. He emphasizes preventive care and lifestyle improvements. Patients appreciate his thorough check-ups and patient-friendly approach. His expertise covers routine health problems, chronic illness management, and adult medicine.",
      appointmentFee: "PKR 15000",
      image: "/doctor_image_1.jpg",
      availability: true,
    },
    {
      name: "Dr. Emily Larson",
      Specialization: "Gynecologist",
      description:
        "Dr. Emily Larson is an experienced gynecologist specializing in women’s health. She provides expert care in reproductive health, pregnancy, and hormonal disorders. With over 10 years in the field, she has helped thousands of women achieve better health outcomes. She focuses on personalized treatment plans and preventive care. Her patients value her compassionate approach to sensitive health issues.",
      appointmentFee: "PKR 18000",
      image: "/doctor_image_2.jpg",
      availability: true,
    },
    {
      name: "Dr. Sarah Patel",
      Specialization: "Dermatologist",
      description:
        "Dr. Sarah Patel is a board-certified dermatologist known for her expertise in treating skin, hair, and nail conditions. She has worked extensively with both cosmetic and medical dermatology. Her approach includes advanced skin treatments and minimally invasive cosmetic procedures. She believes in educating patients on proper skincare. Patients trust her to provide long-lasting results and professional guidance.",
      appointmentFee: "PKR 20000",
      image: "/doctor_image_3.jpg",
      availability: true,
    },
    {
      name: "Dr. Christopher Lee",
      Specialization: "Pediatrician",
      description:
        "Dr. Christopher Lee is a pediatrician dedicated to children’s health and wellness. He has more than 15 years of experience treating newborns, infants, and teenagers. His practice covers vaccinations, growth monitoring, and childhood illnesses. He is well-known for his friendly attitude toward children. Parents trust him for his accurate diagnoses and effective treatment plans.",
      appointmentFee: "PKR 16000",
      image: "/doctor_image_4.jpg",
      availability: true,
    },
    {
      name: "Dr. Anna Wilson",
      Specialization: "Neurologist",
      description:
        "Dr. Anna Wilson is a neurologist specializing in the brain and nervous system. She treats conditions like epilepsy, migraines, and movement disorders. With 14 years of clinical expertise, she has worked in both hospitals and private clinics. Her research contributions are recognized internationally. She is passionate about improving the lives of patients with neurological challenges.",
      appointmentFee: "PKR 25000",
      image: "/doctor_image_5.jpg",
      availability: true,
    },
    {
      name: "Dr. James Brown",
      Specialization: "Gastroenterologist",
      description:
        "Dr. James Brown is a gastroenterologist with expertise in digestive health. He treats conditions such as ulcers, hepatitis, and inflammatory bowel diseases. He has successfully performed hundreds of endoscopies and colonoscopies. His practice focuses on early diagnosis and long-term care of gastrointestinal conditions. Patients recommend him for his professionalism and advanced medical knowledge.",
      appointmentFee: "PKR 22000",
      image: "/doctor_image_6.jpg",
      availability: true,
    },
    {
      name: "Dr. Alex Parker",
      Specialization: "Cardiologist",
      description:
        "Dr. Alex Parker is a cardiologist with more than 18 years of experience in treating heart diseases. He specializes in cardiac imaging, angioplasty, and preventive cardiology. His mission is to reduce heart disease through early diagnosis and lifestyle changes. Patients admire his ability to explain complex heart problems in simple terms. He is one of the most sought-after cardiologists in the city.",
      appointmentFee: "PKR 30000",
      image: "/doctor_image_7.jpg",
      availability: true,
    },
    {
      name: "Dr. Olivia Martinez",
      Specialization: "Orthopedic",
      description:
        "Dr. Olivia Martinez is an orthopedic surgeon specializing in bone, joint, and spine problems. She has performed numerous successful orthopedic surgeries. Her patients range from sports injury cases to elderly patients with arthritis. She focuses on minimally invasive treatments to ensure quick recovery. She is recognized for her patient-focused and evidence-based approach.",
      appointmentFee: "PKR 28000",
      image: "/doctor_image_8.jpg",
      availability: true,
    },
    {
      name: "Dr. Daniel Carter",
      Specialization: "Psychiatrist",
      description:
        "Dr. Daniel Carter is a psychiatrist specializing in mental health treatment. He works with patients facing anxiety, depression, and bipolar disorders. His treatment plans often combine therapy and medication for effective results. He has published several papers on mental health awareness. Patients value his empathetic listening and personalized care approach.",
      appointmentFee: "PKR 24000",
      image: "/doctor_image_9.jpg",
      availability: true,
    },
    {
      name: "Dr. Sophia Kim",
      Specialization: "ENT Specialist",
      description:
        "Dr. Sophia Kim is an ENT specialist with expertise in treating ear, nose, and throat disorders. She treats sinus infections, hearing loss, and throat-related conditions. Her patients appreciate her gentle diagnostic methods. She is skilled in both medical and surgical ENT procedures. Her goal is to provide effective treatment while ensuring patient comfort.",
      appointmentFee: "PKR 19000",
      image: "/doctor_image_10.jpg",
      availability: true,
    },
    // ✅ Repeat pattern for doctors 11–20 (I can generate them fully if you want)
  ];
//   await DoctorModel.deleteMany({}); 
  await DoctorModel.insertMany(doctors);
  console.log("✅ Doctors inserted successfully!");
}
