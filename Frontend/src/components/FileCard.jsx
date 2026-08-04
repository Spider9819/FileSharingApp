import {
  FiDownload,
  FiShare2,
  FiTrash2,
  FiFile,
  FiImage,
  FiFileText,
} from "react-icons/fi";
import { FaFilePdf, FaFileArchive } from "react-icons/fa";

function FileCard({
  file,
  handleDownload,
  handleShare,
  handleDelete,
}) {

  const formatSize = (bytes) => {
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1024 * 1024)
      return (bytes / 1024).toFixed(2) + " KB";
    if (bytes < 1024 * 1024 * 1024)
      return (bytes / (1024 * 1024)).toFixed(2) + " MB";
    return (bytes / (1024 * 1024 * 1024)).toFixed(2) + " GB";
  };

  const getFileIcon = () => {
    const name = file.originalName.toLowerCase();

    if (name.endsWith(".pdf"))
      return <FaFilePdf className="text-red-500 text-5xl" />;

    if (
      name.endsWith(".jpg") ||
      name.endsWith(".jpeg") ||
      name.endsWith(".png") ||
      name.endsWith(".gif")
    )
      return <FiImage className="text-green-500 text-5xl" />;

    if (
      name.endsWith(".zip") ||
      name.endsWith(".rar")
    )
      return <FaFileArchive className="text-yellow-500 text-5xl" />;

    if (
      name.endsWith(".doc") ||
      name.endsWith(".docx") ||
      name.endsWith(".txt")
    )
      return <FiFileText className="text-blue-500 text-5xl" />;

    return <FiFile className="text-slate-300 text-5xl" />;
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-lg hover:border-blue-500 hover:shadow-blue-500/20 transition duration-300">

      {/* File Icon */}
      <div className="flex justify-center">
        {getFileIcon()}
      </div>

      {/* File Name */}
      <h2 className="text-white text-lg font-semibold mt-5 text-center break-all">
        {file.originalName}
      </h2>

      {/* File Details */}
      <div className="mt-5 space-y-2 text-sm">

        <div className="flex justify-between text-slate-400">
          <span>Size</span>
          <span>{formatSize(file.fileSize)}</span>
        </div>

        <div className="flex justify-between text-slate-400">
          <span>Uploaded</span>
          <span>
            {new Date(file.createdAt).toLocaleDateString()}
          </span>
        </div>

      </div>

      {/* Buttons */}
      <div className="grid grid-cols-3 gap-3 mt-6">

        <button
          onClick={() => handleDownload(file._id)}
          className="bg-blue-600 hover:bg-blue-700 transition rounded-xl py-3 flex justify-center items-center"
        >
          <FiDownload className="text-white text-lg" />
        </button>

        <button
          onClick={() => handleShare(file._id)}
          className="bg-green-600 hover:bg-green-700 transition rounded-xl py-3 flex justify-center items-center"
        >
          <FiShare2 className="text-white text-lg" />
        </button>

        <button
          onClick={() => handleDelete(file._id)}
          className="bg-red-600 hover:bg-red-700 transition rounded-xl py-3 flex justify-center items-center"
        >
          <FiTrash2 className="text-white text-lg" />
        </button>

      </div>

    </div>
  );
}

export default FileCard;