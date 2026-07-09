import { useState } from "react";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import DisplayDate from "../components/DisplayDate";

export default function Student({ students, addStudent }) {
  const [showModal, setShowModal] = useState(false);

  const [newStudent, setNewStudent] = useState({
    name: "",
    className: "",
    email: "",
    address: "",
    number: "",
  });

  const handleChange = (e) => {
    setNewStudent({
      ...newStudent,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    addStudent(newStudent);

    setNewStudent({
      name: "",
      className: "",
      email: "",
      address: "",
      number: "",
    });

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

              <button
                onClick={() => setShowModal(true)}
                className="bg-[#562F92] text-white px-5 py-2 rounded-lg hover:bg-[#45226f]"
              >
                + Add Student
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

                    <td className="p-4">
                      <span className="bg-[#4C9BE8] text-white px-3 py-1 rounded-full text-sm">
                        {student.className}
                      </span>
                    </td>

                    <td className="p-4">{student.email}</td>

                    <td className="p-4">{student.address}</td>

                    <td className="p-4">{student.number}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {showModal && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
            <div className="bg-white w-[500px] rounded-xl p-6 shadow-lg">
              <h2 className="text-2xl font-bold text-[#562F92] mb-6">
                Add Student
              </h2>

              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="text"
                  name="name"
                  placeholder="Student Name"
                  value={newStudent.name}
                  onChange={handleChange}
                  className="w-full border rounded-lg p-3"
                  required
                />

                <select
                  name="className"
                  value={newStudent.className}
                  onChange={handleChange}
                  className="w-full border rounded-lg p-3"
                  required
                >
                  <option value="">Select Class</option>

                  <option value="English">English</option>

                  <option value="Math">Math</option>

                  <option value="Science">Science</option>

                  <option value="Music">Music</option>
                </select>

                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={newStudent.email}
                  onChange={handleChange}
                  className="w-full border rounded-lg p-3"
                  required
                />

                <input
                  type="text"
                  name="address"
                  placeholder="Address"
                  value={newStudent.address}
                  onChange={handleChange}
                  className="w-full border rounded-lg p-3"
                  required
                />

                <input
                  type="text"
                  name="number"
                  placeholder="Phone Number"
                  value={newStudent.number}
                  onChange={handleChange}
                  className="w-full border rounded-lg p-3"
                  required
                />

                <div className="flex justify-end gap-3 pt-3">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="px-5 py-2 rounded-lg border"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    className="bg-[#562F92] text-white px-5 py-2 rounded-lg hover:bg-[#45226f]"
                  >
                    Save
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
