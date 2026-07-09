import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Frontend version (no backend)
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-[#F6F8FC]">
      <div className="bg-white w-[420px] rounded-xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-center text-[#562F92] mb-2">
          Welcome Back
        </h1>

        <p className="text-center text-gray-500 mb-8">Login to your account</p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
            required
          />

          <button
            type="submit"
            className="w-full bg-[#562F92] text-white py-3 rounded-lg hover:bg-[#45226f]"
          >
            Login
          </button>
        </form>

        <p className="text-center mt-6 text-gray-600">
          Don't have an account?{" "}
          <Link to="/signup" className="text-[#562F92] font-semibold">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}
