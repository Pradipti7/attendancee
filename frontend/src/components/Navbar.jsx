export default function Navbar() {
  return (
    <nav className="bg-white shadow px-8 py-5 flex justify-between items-center">
      <div>
        <h1 className="text-2xl font-bold text-[#562F92]">
          Attendance Management System
        </h1>
      </div>

      <div className="flex items-center gap-4">
        <div className="w-11 h-11 rounded-full bg-[#562F92] text-white flex items-center justify-center font-bold">
          A
        </div>

        <div>
          <p className="font-semibold">Admin</p>
          <p className="text-sm text-gray-500">Administrator</p>
        </div>
      </div>
    </nav>
  );
}
