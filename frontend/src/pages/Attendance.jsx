import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import DisplayDate from "../components/DisplayDate";
import AttendanceTable from "../components/AttendanceTable";

export default function Attendance({ students, updateStatus }) {
  return (
    <div className="flex min-h-screen bg-[#F6F8FC]">
      <Sidebar />

      <div className="flex-1">
        <Navbar />

        <DisplayDate />

        <div className="p-8">
          <h1 className="text-3xl font-bold text-[#562F92] mb-6">Attendance</h1>

          <AttendanceTable students={students} updateStatus={updateStatus} />
        </div>
      </div>
    </div>
  );
}
