import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaCloudUploadAlt,
} from "react-icons/fa";
import { motion } from "framer-motion";
import { Toaster, toast } from "react-hot-toast";
import api from "../services/api";

function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      await api.post("/auth/register", {
        name,
        email,
        password,
      });

      toast.success("Account Created Successfully");

      setTimeout(() => {
        navigate("/");
      }, 1000);
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Registration Failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Toaster position="top-right" />

      <div className="min-h-screen bg-slate-950 flex items-center justify-center px-5">

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md bg-slate-900 border border-slate-700 rounded-3xl p-8 shadow-2xl"
        >

          <div className="flex justify-center">
            <div className="bg-blue-600 p-4 rounded-full shadow-lg shadow-blue-600/40">
              <FaCloudUploadAlt className="text-5xl text-white" />
            </div>
          </div>

          <h1 className="text-4xl font-bold text-center text-white mt-6">
            Create Account
          </h1>

          <p className="text-center text-slate-400 mt-2 mb-8">
            Join FileShare Pro 🚀
          </p>

          <form onSubmit={handleRegister} className="space-y-5">

            {/* Name */}

            <div className="relative">
              <FaUser className="absolute left-4 top-4 text-slate-400" />

              <input
                type="text"
                placeholder="Full Name"
                className="w-full bg-slate-800 border border-slate-700 rounded-xl py-3 pl-12 pr-4 text-white outline-none focus:border-blue-500 transition"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            {/* Email */}

            <div className="relative">
              <FaEnvelope className="absolute left-4 top-4 text-slate-400" />

              <input
                type="email"
                placeholder="Email Address"
                className="w-full bg-slate-800 border border-slate-700 rounded-xl py-3 pl-12 pr-4 text-white outline-none focus:border-blue-500 transition"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            {/* Password */}

            <div className="relative">
              <FaLock className="absolute left-4 top-4 text-slate-400" />

              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className="w-full bg-slate-800 border border-slate-700 rounded-xl py-3 pl-12 pr-12 text-white outline-none focus:border-blue-500 transition"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-4 text-slate-400 hover:text-white"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>

            {/* Button */}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 transition-all duration-300 py-3 rounded-xl text-white font-semibold shadow-lg shadow-blue-600/30"
            >
              {loading ? "Creating Account..." : "Create Account"}
            </button>

          </form>

          <p className="text-center text-slate-400 mt-8">
            Already have an account?

            <Link
              to="/"
              className="text-blue-500 ml-2 hover:text-blue-400 font-medium"
            >
              Login
            </Link>
          </p>

        </motion.div>

      </div>
    </>
  );
}

export default Register;