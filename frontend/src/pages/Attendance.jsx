import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import DisplayDate from "../components/DisplayDate";

export default function AttendanceTable({ students, updateStatus }) {
  return (
    <div className="flex bg-[#F6F8FC] min-h-screen">
      <Sidebar />

      <div className="flex-1">
        <Navbar />
        <DisplayDate />
        <table className="w-full bg-white rounded-xl shadow overflow-hidden">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-4 text-left">Student ID</th>
              <th className="p-4 text-left">Name</th>
              <th className="p-4 text-left">Class</th>
              <th className="p-4 text-left">Attendance</th>
            </tr>
          </thead>

          <tbody>
            {students.map((student) => (
              <tr key={student.id} className="border-t">
                <td className="p-4">{student.id}</td>

                <td className="p-4">{student.name}</td>

                <td className="p-4">{student.class_name}</td>

                <td className="p-4">
                  <select
                    value={
                      student.is_present === null
                        ? ""
                        : student.is_present
                          ? "present"
                          : "absent"
                    }
                    onChange={(e) => updateStatus(student.id, e.target.value)}
                    className={`px-3 py-2 rounded-lg border font-medium ${
                      student.is_present === null
                        ? "bg-blue-100 text-blue-700 border-blue-300"
                        : student.is_present
                          ? "bg-green-100 text-green-700 border-green-300"
                          : "bg-red-100 text-red-700 border-red-300"
                    }`}
                  >
                    <option value="">Take Attendance</option>
                    <option value="present">Present</option>
                    <option value="absent">Absent</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
