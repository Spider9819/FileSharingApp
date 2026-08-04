import { useEffect, useState } from "react";
import api from "../services/api";

import Navbar from "../components/Navbar";
import StatsCard from "../components/StatsCard";
import UploadBox from "../components/Uploadbox";
import FileCard from "../components/FileCard";


function Dashboard(){
    const [file, setFile] = useState(null);
    const [files, setFiles] = useState([]);
    const [search , setSearch] = useState("");  
    const [loading, setLoading] = useState(false);



    console.log("files =", files);
        console.log("Is Array?", Array.isArray(files));
    const filteredFiles = files.filter((file) =>
    file.originalName.toLowerCase().includes(search.toLowerCase())
  );

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

 const fetchFiles = async () => {
  try {
    const token = localStorage.getItem("token");

    const response = await api.get("/files/myfiles", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log("Response =", response.data);
    console.log("Is Array?", Array.isArray(response.data));

    if (Array.isArray(response.data)) {
      setFiles(response.data);
    } else {
      setFiles([]);
      console.error("Expected array but got:", response.data);
    }

  } catch (error) {
    console.error(error);
    setFiles([]);
  }
};

  useEffect(() => {
    fetchFiles();
  }, []);

  const handleUpload = async () => {

    if (!file) {
      return alert("Please Select File");
    }

    const formData = new FormData();

    formData.append("file", file);

    try {

      setLoading(true);

      const token = localStorage.getItem("token");

      await api.post("/files/upload", formData, {

        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },

      });

      alert("File Uploaded Successfully");

      setFile(null);

      fetchFiles();

    } catch (error) {

      console.log(error);

      alert(error.response?.data?.message || "Upload Failed");

    } finally {

      setLoading(false);

    }

  };

  const handleDownload = async (id, fileName) => {

    try {

      const token = localStorage.getItem("token");

      const response = await api.get(`/files/download/${id}`, {

        headers: {

          Authorization: `Bearer ${token}`,

        },

        responseType: "blob",

      });

      const url = window.URL.createObjectURL(new Blob([response.data]));

      const link = document.createElement("a");

      link.href = url;

      link.download = fileName;

      document.body.appendChild(link);

      link.click();

      link.remove();

      window.URL.revokeObjectURL(url);

    } catch (error) {

      console.log(error);

      alert("Download Failed");

    }

  };

  const handleDelete = async (id) => {

    try {

      const token = localStorage.getItem("token");

      await api.delete(`/files/${id}`, {

        headers: {

          Authorization: `Bearer ${token}`,

        },

      });

      alert("File Deleted Successfully");

      fetchFiles();

    } catch (error) {

      console.log(error);

      alert(error.response?.data?.message || "Delete Failed");

    }

  };

  const handleShare = async (id) => {

    try {

      const token = localStorage.getItem("token");

      const response = await api.post(
        `/files/share/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      await navigator.clipboard.writeText(response.data.link);

      alert("Link Copied\n\n" + response.data.link);

    } catch (error) {

      console.log(error);

      alert(error.response?.data?.message || "Share Failed");

    }

  };

  return (
    <div className="min-h-screen bg-slate-950">

      <Navbar
        onLogout={() => {
          localStorage.removeItem("token");
          window.location.href = "/";
        }}
      />

      <div className="max-w-7xl mx-auto p-8">

        {/* Heading */}

        <div className="flex flex-col md:flex-row justify-between items-center gap-5">

          <div>
            <h1 className="text-4xl font-bold text-white">
              Welcome Back 👋
            </h1>

            <p className="text-slate-400 mt-2">
              Manage all your files securely.
            </p>
          </div>

          {/* Search */}

          <input
            type="text"
            placeholder="Search Files..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-slate-900 border border-slate-700 rounded-xl px-5 py-3 text-white w-full md:w-80 outline-none focus:border-blue-500"
          />

        </div>

        {/* Stats */}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">

          <StatsCard
            title="Total Files"
            value={files.length}
          />

          <StatsCard
            title="Storage Used"
            value={`${(
              files.reduce((sum, file) => sum + file.fileSize, 0) / 1024
            ).toFixed(2)} KB`}
          />

          <StatsCard
            title="Shared Files"
            value="--"
          />

        </div>

        {/* Upload */}

        <div className="mt-10">

          <UploadBox
            handleFileChange={handleFileChange}
            handleUpload={handleUpload}
          />

        </div>

        {/* Loading */}

        {loading && (

          <div className="text-center mt-8 text-blue-400 text-lg">
            Uploading...
          </div>

        )}

        {/* Files */}

        <h2 className="text-3xl font-bold text-white mt-12 mb-6">
          My Files
        </h2>

        {filteredFiles.length === 0 ? (

          <div className="bg-slate-900 border border-slate-800 rounded-xl p-10 text-center text-slate-400">
            No Files Found
          </div>

        ) : (

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

            {filteredFiles.map((file) => (

              <FileCard
                key={file._id}
                file={file}
                handleDownload={() =>
                  handleDownload(file._id, file.originalName)
                }
                handleDelete={handleDelete}
                handleShare={handleShare}
              />

            ))}

          </div>

        )}

      </div>

    </div>
  );
}

export default Dashboard;

