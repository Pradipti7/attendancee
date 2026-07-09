import { NavLink, useNavigate } from "react-router-dom";

export default function Sidebar() {
  const navigate = useNavigate();

  const menu = [
    {
      name: "Dashboard",
      path: "/dashboard",
    },
    {
      name: "Attendance",
      path: "/attendance",
    },
    {
      name: "Students",
      path: "/student",
    },
    {
      name: "Classes",
      path: "/classes",
    },
  ];

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <aside className="w-64 min-h-screen bg-[#562F92] text-white flex flex-col">
      <div className="text-center py-8 border-b border-[#7550b8]">
        <h1 className="text-3xl font-bold">AMS</h1>
        <p className="text-sm mt-2 opacity-80">Attendance System</p>
      </div>

      <nav className="flex-1 mt-8 flex flex-col">
        {menu.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `px-8 py-4 transition ${
                isActive
                  ? "bg-white text-[#562F92] font-semibold"
                  : "hover:bg-[#6d43b2]"
              }`
            }
          >
            {item.name}
          </NavLink>
        ))}
      </nav>

      <div className="p-6">
        <button
          onClick={handleLogout}
          className="w-full bg-[#562F92] hover:[#45226f] text-white py-3 rounded-lg font-semibold transition"
        >
          Logout
        </button>
      </div>
    </aside>
  );
}
