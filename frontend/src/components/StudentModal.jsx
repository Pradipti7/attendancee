import { useState } from "react";

const EMPTY_FORM = {
  name: "",
  class_name: "",
  email: "",
  address: "",
  number: "",
};

export default function StudentModal({ onClose, onSuccess }) {
  const [formData, setFormData] = useState(EMPTY_FORM);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8080/students", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to add student");
      }

      const newStudent = await response.json();

      if (onSuccess) {
        onSuccess(newStudent);
      }

      setFormData(EMPTY_FORM);
      onClose();
    } catch (err) {
      console.error(err);
      alert("Failed to add student.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-lg p-6 relative">
        <button
          onClick={onClose}
          className="absolute right-5 top-4 text-2xl text-gray-500 hover:text-black"
        >
          ×
        </button>

        <h2 className="text-2xl font-bold text-[#562F92] mb-6">Add Student</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Student Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
            required
          />

          <select
            name="class_name"
            value={formData.class_name}
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
            value={formData.email}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
            required
          />

          <input
            type="text"
            name="address"
            placeholder="Address"
            value={formData.address}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
            required
          />

          <input
            type="text"
            name="number"
            placeholder="Phone Number"
            value={formData.number}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
            required
          />

          <div className="flex justify-end gap-3 pt-3">
            <button
              type="button"
              onClick={onClose}
              className="border px-5 py-2 rounded-lg"
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
  );
}
