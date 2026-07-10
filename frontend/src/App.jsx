import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Attendance from "./pages/Attendance";
import Student from "./pages/Student";
import Classes from "./pages/Classes";

function App() {
  const [students, setStudents] = useState([]);

  const fetchStudents = async () => {
    try {
      const res = await fetch("http://localhost:8080/students");
      const data = await res.json();
      setStudents(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const handleStudentAdded = (student) => {
    setStudents((prev) => [...prev, student]);
  };

  const updateStatus = async (id, value) => {
    let isPresent = null;

    if (value === "present") {
      isPresent = true;
    } else if (value === "absent") {
      isPresent = false;
    }

    try {
      const response = await fetch(`http://localhost:8080/students/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          is_present: isPresent,
        }),
      });

      if (!response.ok) {
        alert("Failed to update attendance");
        return;
      }

      setStudents((prev) =>
        prev.map((student) =>
          student.id === id ? { ...student, is_present: isPresent } : student,
        ),
      );
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />

        <Route path="/signup" element={<Signup />} />

        <Route path="/dashboard" element={<Dashboard />} />

        <Route
          path="/attendance"
          element={
            <Attendance students={students} updateStatus={updateStatus} />
          }
        />

        <Route
          path="/student"
          element={
            <Student students={students} onStudentAdded={handleStudentAdded} />
          }
        />

        <Route path="/classes" element={<Classes students={students} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
