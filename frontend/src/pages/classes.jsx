import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import DisplayDate from "../components/DisplayDate";

export default function Classes({ students }) {
  const classes = [
    {
      name: "English",
      color: "bg-[#4C9BE8]",
    },
    {
      name: "Math",
      color: "bg-[#F4A261]",
    },
    {
      name: "Science",
      color: "bg-[#39C670]",
    },
    {
      name: "Music",
      color: "bg-[#A855F7]",
    },
  ];

  return (
    <div className="flex bg-[#F6F8FC] min-h-screen">
      <Sidebar />

      <div className="flex-1">
        <Navbar />

        <DisplayDate />

        <div className="p-8">
          <h1 className="text-3xl font-bold text-[#562F92] mb-8">
            Available Classes
          </h1>

          <div className="grid grid-cols-4 gap-6 mb-10">
            {classes.map((cls) => (
              <div key={cls.name} className="bg-white rounded-xl shadow p-6">
                <div
                  className={`${cls.color} w-12 h-12 rounded-full flex items-center justify-center text-white font-bold`}
                >
                  {cls.name[0]}
                </div>

                <h2 className="text-xl font-semibold mt-4">{cls.name}</h2>

                <p className="text-gray-500 mt-2">
                  {
                    students.filter((student) => student.className === cls.name)
                      .length
                  }{" "}
                  Students
                </p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-6">
            {classes.map((cls) => (
              <div key={cls.name} className="bg-white rounded-xl shadow p-6">
                <h2 className="text-xl font-bold text-[#562F92] mb-4">
                  {cls.name}
                </h2>

                <table className="w-full">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="p-3 text-left">ID</th>

                      <th className="p-3 text-left">Student</th>

                      <th className="p-3 text-left">Email</th>
                    </tr>
                  </thead>

                  <tbody>
                    {students
                      .filter((student) => student.className === cls.name)
                      .map((student) => (
                        <tr key={student.id} className="border-b">
                          <td className="p-3">{student.id}</td>

                          <td className="p-3">{student.name}</td>

                          <td className="p-3">{student.email}</td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
