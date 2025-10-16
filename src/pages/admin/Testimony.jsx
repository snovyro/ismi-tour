import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../../components/Sidebar";
import Button from "../../components/Button";
import Cookies from "js-cookie";

const Testimony = () => {
  const [images, setImages] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [file, setFile] = useState(null);

  const token = Cookies.get("access_token");

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      const res = await axios.get("/api/testimony", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setImages(res.data || []);
    } catch (err) {
      console.error("Failed to fetch images:", err);
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);

    try {
      await axios.post("/api/testimony", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      setFile(null);
      setIsModalOpen(false);
      fetchImages();
    } catch (err) {
      console.error("Upload failed:", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/testimony/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchImages();
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  return (
    <div className="flex">
      <Sidebar />

      <div className="flex-1 p-6">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Testimonies</h1>
          <Button onClick={() => setIsModalOpen(true)}>Add Image</Button>
        </div>

        {/* Image Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {images.map((img, index) => (
            <div
              key={index}
              className="border rounded overflow-hidden relative"
            >
              <img
                src={img.image_url}
                alt="Testimony"
                className="w-full h-40 object-cover"
              />
              <button
                onClick={() => handleDelete(img.id)}
                className="absolute top-2 right-2 bg-red-600 text-white px-2 py-1 text-xs rounded"
              >
                Delete
              </button>
            </div>
          ))}
        </div>

        {/* Upload Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black/50">
            <div className="bg-white p-6 rounded shadow-md w-96">
              <h2 className="text-lg font-semibold mb-4">Upload New Image</h2>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setFile(e.target.files[0])}
                className="mb-4"
              />

              <div className="flex justify-end space-x-2">
                <Button
                  onClick={() => setIsModalOpen(false)}
                  className="bg-gray-500"
                >
                  Cancel
                </Button>
                <Button onClick={handleUpload} disabled={!file}>
                  Upload
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Testimony;
