import { useState } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";

function UploadBox({ handleFileChange, handleUpload }) {
  const [selectedFile, setSelectedFile] = useState(null);

  const onFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
    handleFileChange(e);
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-lg">

      <div className="flex flex-col items-center">

        <div className="bg-blue-600 p-4 rounded-full">
          <FaCloudUploadAlt className="text-white text-5xl" />
        </div>

        <h2 className="text-white text-3xl font-bold mt-5">
          Upload File
        </h2>

        <p className="text-slate-400 mt-2">
          Select a file and upload it securely
        </p>

        {/* Hidden Input */}
        <input
          id="fileInput"
          type="file"
          className="hidden"
          onChange={onFileChange}
        />

        {/* Choose File Button */}
        <label
          htmlFor="fileInput"
          className="mt-8 cursor-pointer bg-slate-800 hover:bg-slate-700 text-white px-6 py-3 rounded-xl transition"
        >
          Choose File
        </label>

        {/* Selected File Name */}
        {selectedFile && (
          <p className="mt-4 text-green-400 font-medium break-all">
            📄 {selectedFile.name}
          </p>
        )}

        {/* Upload Button */}
        <button
          onClick={handleUpload}
          className="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-semibold transition"
        >
          Upload Now
        </button>

      </div>

    </div>
  );
}

export default UploadBox;