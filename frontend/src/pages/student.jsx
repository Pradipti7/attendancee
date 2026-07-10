import { useState } from "react";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import DisplayDate from "../components/DisplayDate";
import StudentModal from "../components/StudentModal";

export default function Student({ students, onStudentAdded }) {
  const [showModal, setShowModal] = useState(false);

  const handleSuccess = (newStudent) => {
    onStudentAdded(newStudent);
    setShowModal(false);
  };

  return (
    <div className="flex min-h-screen bg-[#F6F8FC]">
      <Sidebar />

      <div className="flex-1">
        <Navbar />
        <DisplayDate />

        <div className="p-8">
          <div className="bg-white rounded-xl shadow p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-[#562F92]">
                Student List
              </h2>
              {showModal && (
                <StudentModal
                  onClose={() => setShowModal(false)}
                  onSuccess={handleSuccess}
                />
              )}
              <button
                onClick={() => setShowModal(true)}
                className="bg-[#562F92] text-white px-5 py-2 rounded-lg hover:bg-[#45226f]"
              >
                Add Student
              </button>
            </div>

            <table className="w-full border-collapse">
              <thead className="bg-gray-100">
                <tr>
                  <th className="text-left p-4">ID</th>
                  <th className="text-left p-4">Student Name</th>
                  <th className="text-left p-4">Class</th>
                  <th className="text-left p-4">Email</th>
                  <th className="text-left p-4">Address</th>
                  <th className="text-left p-4">Phone</th>
                </tr>
              </thead>

              <tbody>
                {students.map((student) => (
                  <tr key={student.id} className="border-b hover:bg-gray-50">
                    <td className="p-4">{student.id}</td>

                    <td className="p-4">{student.name}</td>

                    <td className="p-4">{student.class_name}</td>

                    <td className="p-4">{student.email}</td>

                    <td className="p-4">{student.address}</td>

                    <td className="p-4">{student.number}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
