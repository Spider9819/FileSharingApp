import { FaCloudUploadAlt } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";

function Navbar({ onLogout }) {
  return (
    <nav className="bg-slate-900 border-b border-slate-800 px-8 py-5 flex justify-between items-center">

      <div className="flex items-center gap-4">
        <div className="bg-blue-600 p-3 rounded-xl">
          <FaCloudUploadAlt className="text-white text-2xl" />
        </div>

        <div>
          <h1 className="text-white text-2xl font-bold">
            FileShare Pro
          </h1>

          <p className="text-slate-400 text-sm">
            Secure Cloud Storage
          </p>
        </div>
      </div>

      <button
        onClick={onLogout}
        className="flex items-center gap-2 bg-red-500 hover:bg-red-600 px-5 py-3 rounded-xl text-white transition"
      >
        <FiLogOut />
        Logout
      </button>

    </nav>
  );
}

export default Navbar;