import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const [error, setError] = useState("");

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    try {
      const response = await fetch("http://localhost:8080/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Invalid email or password");
        return;
      }

      // Login successful
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      setError("Wrong Email or Password..");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-[#F6F8FC]">
      <div className="bg-white w-[420px] rounded-xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-center text-[#562F92] mb-2">
          Welcome Back
        </h1>

        <p className="text-center text-gray-500 mb-6">Login to your account</p>

        {/* Error Message */}
        {error && (
          <div className="mb-5 rounded-lg border border-red-300 bg-red-100 text-red-700 px-4 py-3 text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#562F92]"
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#562F92]"
            required
          />

          <button
            type="submit"
            className="w-full bg-[#562F92] text-white py-3 rounded-lg hover:bg-[#45226f] transition"
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
