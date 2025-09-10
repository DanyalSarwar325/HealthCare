import { DoctorsList } from "@/app/components/doctor_list";

import { HeroSection } from "@/app/components/HeoSection";

import { Specialities } from "@/app/components/specialities";

export default function Home() {
  return (
    <>
      <HeroSection />
      <Specialities />
      <DoctorsList />
    </>
  );
}
