import { useEffect, useState } from "react";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import DisplayDate from "../components/DisplayDate";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export default function Dashboard() {
  const [dashboard, setDashboard] = useState({
    total_students: 0,
    present_today: 0,
    absent_today: 0,
    total_classes: 0,
  });

  useEffect(() => {
    fetch("http://localhost:8080/dashboard-data")
      .then((res) => res.json())
      .then((data) => setDashboard(data))
      .catch((err) => console.error(err));
  }, []);

  const attendanceData = [
    {
      name: "Present",
      value: dashboard.present_today,
    },
    {
      name: "Absent",
      value: dashboard.absent_today,
    },
  ];

  const COLORS = ["#39C670", "#A82837"];

  return (
    <div className="flex bg-[#F6F8FC] min-h-screen">
      <Sidebar />

      <div className="flex-1">
        <Navbar />
        <DisplayDate />

        <div className="p-8 grid grid-cols-4 gap-5">
          <div className="bg-white p-6 rounded-xl shadow">
            <p className="text-gray-500 text-sm">Total Students</p>
            <p className="text-3xl font-bold text-[#562F92]">
              {dashboard.total_students}
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <p className="text-gray-500 text-sm">Present Today</p>
            <p className="text-3xl font-bold text-[#39C670]">
              {dashboard.present_today}
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <p className="text-gray-500 text-sm">Absent Today</p>
            <p className="text-3xl font-bold text-[#A82837]">
              {dashboard.absent_today}
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <p className="text-gray-500 text-sm">Total Classes</p>
            <p className="text-3xl font-bold text-[#4C9BE8]">
              {dashboard.total_classes}
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <p className="text-gray-500 text-sm">Total Teachers</p>
            <p className="text-3xl font-bold text-[#562F92]">8</p>
          </div>
        </div>

        <div className="px-8 pb-8">
          <div className="bg-white rounded-xl shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Today's Attendance</h2>

            <ResponsiveContainer width="100%" height={350}>
              <PieChart>
                <Pie
                  data={attendanceData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  innerRadius={70}
                  outerRadius={100}
                  paddingAngle={3}
                  label={(entry) => `${entry.name}: ${entry.value}`}
                >
                  {attendanceData.map((entry, index) => (
                    <Cell key={entry.name} fill={COLORS[index]} />
                  ))}
                </Pie>

                <Tooltip />
                <Legend verticalAlign="bottom" />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
