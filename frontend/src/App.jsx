import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Attendance from "./pages/Attendance";
import Classes from "./pages/Classes";
import Student from "./pages/Student";

import studentsData from "./data/studentCount";

function App() {
  const [students, setStudents] = useState(studentsData);

  const updateStatus = (id, status) => {
    setStudents(
      students.map((student) =>
        student.id === id ? { ...student, status } : student,
      ),
    );
  };

  const addStudent = (newStudent) => {
    setStudents([
      ...students,
      {
        ...newStudent,
        id: students.length + 1,
        status: "Present",
      },
    ]);
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />

        <Route path="/signup" element={<Signup />} />

        <Route path="/dashboard" element={<Dashboard students={students} />} />

        <Route
          path="/attendance"
          element={
            <Attendance students={students} updateStatus={updateStatus} />
          }
        />

        <Route
          path="/student"
          element={<Student students={students} addStudent={addStudent} />}
        />

        <Route path="/classes" element={<Classes students={students} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
