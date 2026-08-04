import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEnvelope, FaLock, FaEye, FaEyeSlash, FaCloudUploadAlt } from "react-icons/fa";
import { motion } from "framer-motion";
import { Toaster, toast } from "react-hot-toast";
import api from "../services/api";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const response = await api.post("/auth/login", {
        email,
        password,
      });

      localStorage.setItem("token", response.data.token);

      toast.success("Login Successful");

      setTimeout(() => {
        navigate("/dashboard");
      }, 1000);
    } catch (error) {
      toast.error(error.response?.data?.message || "Login Failed");
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
            FileShare Pro
          </h1>

          <p className="text-center text-slate-400 mt-2 mb-8">
            Welcome Back 👋
          </p>

          <form onSubmit={handleLogin} className="space-y-5">

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

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 transition-all duration-300 py-3 rounded-xl text-white font-semibold shadow-lg shadow-blue-600/30"
            >
              {loading ? "Signing In..." : "Sign In"}
            </button>

          </form>

          <p className="text-center text-slate-400 mt-8">
            Don't have an account?

            <Link
              to="/register"
              className="text-blue-500 ml-2 hover:text-blue-400 font-medium"
            >
              Register
            </Link>
          </p>

        </motion.div>

      </div>
    </>
  );
}

export default Login;