export default function AttendanceTable({ students, updateStatus }) {
  return (
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
          <tr key={student.id} className="border-t hover:bg-gray-50">
            <td className="p-4">{student.id}</td>

            <td className="p-4">{student.name}</td>

            <td className="p-4">{student.className}</td>

            <td className="p-4">
              <select
                value={student.status}
                onChange={(e) => updateStatus(student.id, e.target.value)}
                className="border rounded-lg px-3 py-2"
              >
                <option value="Present">Present</option>

                <option value="Absent">Absent</option>
              </select>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
