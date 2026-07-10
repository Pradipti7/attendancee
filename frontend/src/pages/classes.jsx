import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import DisplayDate from "../components/DisplayDate";

export default function Classes({ students }) {
  const classes = [
    { name: "English", color: "bg-[#4C9BE8]" },
    { name: "Math", color: "bg-[#F4A261]" },
    { name: "Science", color: "bg-[#39C670]" },
    { name: "Music", color: "bg-[#A855F7]" },
  ];
  console.log("Students received:", students);

  return (
    <div className="flex min-h-screen bg-[#F6F8FC]">
      <Sidebar />

      <div className="flex-1">
        <Navbar />
        <DisplayDate />

        <div className="p-8">
          <h1 className="text-3xl font-bold text-[#562F92] mb-8">
            Available Classes
          </h1>

          {/* Class Cards */}
          <div className="grid grid-cols-4 gap-6 mb-10">
            {classes.map((cls) => {
              const classStudents = students.filter(
                (student) => student.class_name === cls.name,
              );

              return (
                <div
                  key={cls.name}
                  className="bg-white rounded-2xl shadow p-6 border-l-4 border-[#562F92]"
                >
                  <div
                    className={`${cls.color} w-12 h-12 rounded-full flex items-center justify-center text-white font-bold mb-4`}
                  >
                    {cls.name[0]}
                  </div>

                  <h2 className="text-xl font-semibold text-gray-800">
                    {cls.name}
                  </h2>

                  <p className="text-gray-500 mt-2">
                    {classStudents.length} Students
                  </p>
                </div>
              );
            })}
          </div>

          {/* Students by Class */}
          <div className="grid grid-cols-2 gap-6">
            {classes.map((cls) => {
              const classStudents = students.filter(
                (student) => student.class_name === cls.name,
              );

              return (
                <div key={cls.name} className="bg-white rounded-2xl shadow p-6">
                  <h2 className="text-xl font-bold text-[#562F92] mb-4">
                    {cls.name}
                  </h2>

                  <table className="w-full">
                    <thead className="bg-gray-100 border-b">
                      <tr>
                        <th className="text-left p-3">ID</th>
                        <th className="text-left p-3">Student</th>
                        <th className="text-left p-3">Email</th>
                      </tr>
                    </thead>

                    <tbody>
                      {classStudents.length > 0 ? (
                        classStudents.map((student) => (
                          <tr
                            key={student.id}
                            className="border-b hover:bg-gray-50"
                          >
                            <td className="p-3">{student.id}</td>
                            <td className="p-3">{student.name}</td>
                            <td className="p-3">{student.email}</td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td
                            colSpan="3"
                            className="text-center text-gray-400 p-4"
                          >
                            No students in this class.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
