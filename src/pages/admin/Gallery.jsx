import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../../components/Sidebar";
import Button from "../../components/Button";
import Cookies from "js-cookie";

const Gallery = () => {
  const [media, setMedia] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [file, setFile] = useState(null);

  const token = Cookies.get("token");

  useEffect(() => {
    fetchMedia();
  }, []);

  const fetchMedia = async () => {
    console.log("fetch");
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/galleries`, {
        headers: { "ngrok-skip-browser-warning": "true" },
      });
      console.log("zzz");
      setMedia(res.data.data || []);
    } catch (err) {
      console.error("Failed to fetch media:", err);
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);

    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/galleries`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
          "ngrok-skip-browser-warning": "true",
        },
      });

      setFile(null);
      setIsModalOpen(false);
      fetchMedia();
    } catch (err) {
      console.error("Upload failed:", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/galleries/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchMedia();
      window.location.reload();
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  return (
    <div className="relative">
      <div className="fixed left-0 top-0 h-full w-64">
        <Sidebar />
      </div>

      <div className="p-6 flex-1 ml-64">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Gallery</h1>
          <Button
            width={20}
            textColor="white"
            bgColor="i-pink hover:bg-pink-600 transition"
            text="Add Media"
            onClick={() => setIsModalOpen(true)}
          />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {media.map((item, index) => {
            const isVideo = /\.(mp4|webm|ogg)$/i.test(item.image_path);
            const url = `../${item.image_path}`;

            return (
              <div
                key={index}
                className="border rounded overflow-hidden relative group"
              >
                {isVideo ? (
                  <video
                    src={url}
                    controls
                    className="w-full h-40 object-cover group-hover:opacity-80 transition"
                  />
                ) : (
                  <img
                    src={url}
                    alt="Gallery Item"
                    className="w-full h-40 object-cover group-hover:opacity-80 transition"
                  />
                )}

                <button
                  onClick={() => handleDelete(item.id)}
                  className="absolute top-2 right-2 bg-red-600 text-white px-2 py-1 text-xs rounded opacity-0 group-hover:opacity-100 transition hover:scale-105 hover:cursor-pointer"
                >
                  Delete
                </button>
              </div>
            );
          })}
        </div>

        {isModalOpen && (
          <div className="fixed inset-0 backdrop-blur-md bg-black/20 flex justify-center items-center z-50 transition-all">
            <div className="bg-white/80 backdrop-blur-xl p-6 rounded-2xl shadow-xl border border-white/40 w-[400px] transform scale-95 animate-[fadeIn_0.2s_ease-out_forwards]">
              <h2 className="text-xl font-bold mb-4">Upload Media</h2>
              <input
                type="file"
                accept="image/*,video/*"
                onChange={(e) => setFile(e.target.files[0])}
                className="mb-4"
              />

              <div className="flex justify-end gap-4 mt-4">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500 transition"
                >
                  Cancel
                </button>
                <button
                  onClick={handleUpload}
                  disabled={!file}
                  className={`px-4 py-2 ${
                    file ? "bg-i-pink hover:bg-pink-600" : "bg-gray-300"
                  } text-white rounded transition`}
                >
                  Upload
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <style>
        {`
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        `}
      </style>
    </div>
  );
};

export default Gallery;
