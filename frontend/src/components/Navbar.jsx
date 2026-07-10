export default function Navbar() {
  return (
    <nav className="bg-white shadow px-8 py-5 flex justify-between items-center">
      <div>
        <h1 className="text-2xl font-bold text-[#562F92]">
          Attendance Management System
        </h1>
      </div>

      <div className="flex items-left gap-4">
        <div className="  flex items-center justify-center font-bold">
          Hello Teacher
        </div>
        <div>
          <div className="w-11 h-11  flex items-center rounded-full bg-[#562F92] text-white flex items-center justify-center font-bold">
            P
          </div>
        </div>
      </div>
    </nav>
  );
}
