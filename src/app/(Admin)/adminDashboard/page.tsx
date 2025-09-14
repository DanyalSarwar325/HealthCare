"use client";
import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/AdminNavbar";
import OverviewCards from "@/components/OverviewCards";
import PatientsTable from "@/components/PatientsTable";

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <Navbar />

        {/* Dashboard Content */}
        <main className="p-6 space-y-6">
          {/* Welcome Banner */}
          <section className="bg-blue-600 text-white p-6 rounded-2xl shadow-md">
            <h2 className="text-2xl font-bold">Good Morning, Dr. Patrick Kim</h2>
            <p className="text-sm mt-2">Your schedule today</p>

            <div className="grid grid-cols-3 gap-4 mt-6">
              <div className="bg-white text-blue-600 p-4 rounded-xl shadow">
                <p className="text-2xl font-bold">9</p>
                <p className="text-sm">Patients</p>
              </div>
              <div className="bg-white text-blue-600 p-4 rounded-xl shadow">
                <p className="text-2xl font-bold">3</p>
                <p className="text-sm">Surgeries</p>
              </div>
              <div className="bg-white text-blue-600 p-4 rounded-xl shadow">
                <p className="text-2xl font-bold">2</p>
                <p className="text-sm">Discharges</p>
              </div>
            </div>
          </section>

          {/* Overview Cards */}
          <OverviewCards />

          {/* Patients Table */}
          <PatientsTable />
        </main>
      </div>
    </div>
  );
}
