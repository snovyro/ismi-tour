import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../../components/Sidebar";
import Button from "../../components/Button";
import Cookies from "js-cookie";

const capitalizeWords = (str) =>
  str.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

const Packages = () => {
  const [packages, setPackages] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [formData, setFormData] = useState({
    package_name: "",
    duration_days: "",
    type: "",
    inclusions: "",
    hotel_madinah: "",
    hotel_makkah: "",
    price_start: "",
    airline: "",
    itinerary: [
      { day_number: 1, activities: ["activity1", "activity2"] },
      { day_number: 2, activities: ["activity5", "activity6"] },
    ],
    banner: null,
  });

  useEffect(() => {
    const getPackage = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/packages`
        );
        setPackages(response.data.data.packages);
      } catch (error) {}
    };
    getPackage();
  }, []);

  const handleAdd = () => {
    setIsEditing(false);
    setEditId(null);
    setFormData({
      package_name: "",
      duration_days: "",
      type: "",
      inclusions: "",
      hotel_madinah: "",
      hotel_makkah: "",
      price_start: "",
      airline: "",
      itinerary: [
        { day_number: 1, activities: ["activity1", "activity2"] },
        { day_number: 2, activities: ["activity5", "activity6"] },
      ],
      banner: null,
    });
    setIsModalOpen(true);
  };

  const handleEdit = (id) => {
    const selected = packages.find((pkg) => pkg.id === id);
    if (!selected) return;
    setIsEditing(true);
    setEditId(id);
    setFormData({
      ...selected,
      inclusions: selected.inclusions?.join(", ") || "",
      banner: null,
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this package?")) return;
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/packages/${id}`, {
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
          "ngrok-skip-browser-warning": "true",
        },
      });
      window.location.reload();
    } catch (error) {
      console.error("Delete failed:", error.response?.data || error.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData();

    Object.keys(formData).forEach((key) => {
      if (key === "itinerary") {
        form.append(
          "itinerary",
          JSON.stringify([
            { day_number: 1, activities: ["activity1", "activity2"] },
            { day_number: 2, activities: ["activity5", "activity6"] },
          ])
        );
      } else if (key === "banner") {
        if (formData.banner) {
          const originalFile = formData.banner;
          form.append("banner", originalFile);
        }
      } else {
        form.append(key, formData[key]);
      }
    });

    try {
      if (isEditing) {
        await axios.put(
          `${import.meta.env.VITE_API_URL}/packages/${editId}`,
          form,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${Cookies.get("token")}`,
              "ngrok-skip-browser-warning": "true",
            },
          }
        );
      } else {
        await axios.post(`${import.meta.env.VITE_API_URL}/packages`, form, {
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
            "Content-Type": "multipart/form-data",
            "ngrok-skip-browser-warning": "true",
          },
        });
      }

      setIsModalOpen(false);
      window.location.reload();
    } catch (error) {
      console.error("Upload failed:", error.response?.data || error.message);
    }
  };

  return (
    <div className="relative">
      <div className="fixed left-0 top-0 h-full w-64">
        <Sidebar />
      </div>

      <div className="p-6 flex-1 ml-64">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Packages</h1>
          <Button
            width={20}
            textColor="white"
            bgColor="i-pink hover:bg-pink-600 transition"
            text="Add Package"
            onClick={handleAdd}
          />
        </div>

        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200 text-center">
              <th className="border border-gray-300 p-4">#</th>
              <th className="border border-gray-300 p-4">Name</th>
              <th className="border border-gray-300 p-4">Airline</th>
              <th className="border border-gray-300 p-4">Duration</th>
              <th className="border border-gray-300 p-4">Price</th>
              <th className="border border-gray-300 p-4">Hotels</th>
              <th className="border border-gray-300 p-4">Inclusions</th>
              <th className="border border-gray-300 p-4 w-40">Actions</th>
            </tr>
          </thead>
          <tbody>
            {packages.map((pkg, index) => (
              <tr
                key={pkg.id || index}
                className="text-center hover:bg-gray-100 transition"
              >
                <td className="border border-gray-300 p-4">{index + 1}</td>
                <td className="border border-gray-300 p-4">
                  {pkg.package_name}
                </td>
                <td className="border border-gray-300 p-4">{pkg.airline}</td>
                <td className="border border-gray-300 p-4">
                  {pkg.duration_days} Days
                </td>
                <td className="border border-gray-300 p-4">
                  Rp {pkg.price_start.toLocaleString("id-ID")}
                </td>
                <td className="border border-gray-300 p-4">
                  {pkg.hotel_madinah} / {pkg.hotel_makkah}
                </td>
                <td className="border border-gray-300 p-4">
                  {pkg.inclusions?.join(", ")}
                </td>
                <td className="border border-gray-300 p-4 text-right w-40">
                  <div className="inline-flex gap-4">
                    <Button
                      onClick={() => handleEdit(pkg.id)}
                      width={10}
                      textColor="white"
                      bgColor="i-pink hover:bg-pink-600 transition"
                      text="Edit"
                    />
                    <Button
                      width={10}
                      onClick={() => handleDelete(pkg.id)}
                      textColor="white"
                      bgColor="i-pink hover:bg-pink-600 transition"
                      text="Delete"
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {isModalOpen && (
          <div className="fixed inset-0 backdrop-blur-md bg-black/20 flex justify-center items-center z-50 transition-all">
            <div className="bg-white/80 backdrop-blur-xl p-6 rounded-2xl shadow-xl border border-white/40 w-[500px] transform scale-95 animate-[fadeIn_0.2s_ease-out_forwards]">
              <h2 className="text-xl font-bold mb-4">
                {isEditing ? "Edit Package" : "Add Package"}
              </h2>
              <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                {[
                  "package_name",
                  "inclusions",
                  "hotel_madinah",
                  "hotel_makkah",
                ].map((field) => (
                  <input
                    key={field}
                    className="border p-2 rounded-md focus:ring-2 focus:ring-pink-400 outline-none transition"
                    placeholder={capitalizeWords(field)}
                    value={formData[field]}
                    onChange={(e) =>
                      setFormData({ ...formData, [field]: e.target.value })
                    }
                  />
                ))}
                {["duration_days", "price_start"].map((field) => (
                  <input
                    key={field}
                    type="number"
                    className="border p-2 rounded-md focus:ring-2 focus:ring-pink-400 outline-none transition"
                    placeholder={capitalizeWords(field)}
                    value={formData[field]}
                    onChange={(e) =>
                      setFormData({ ...formData, [field]: e.target.value })
                    }
                  />
                ))}
                <select
                  className="border p-2 rounded-md focus:ring-2 focus:ring-pink-400 outline-none transition"
                  value={formData.type}
                  onChange={(e) =>
                    setFormData({ ...formData, type: e.target.value })
                  }
                >
                  <option value="">Select Type</option>
                  <option value="Umrah">Umrah</option>
                  <option value="Hajj">Hajj</option>
                </select>
                <select
                  className="border p-2 rounded-md focus:ring-2 focus:ring-pink-400 outline-none transition"
                  value={formData.airline}
                  onChange={(e) =>
                    setFormData({ ...formData, airline: e.target.value })
                  }
                >
                  <option value="">Select Airline</option>
                  <option value="Garuda">Garuda</option>
                  <option value="Lion Air">Lion Air</option>
                </select>
                <input
                  type="file"
                  accept="image/*"
                  className="border p-2 rounded-md"
                  onChange={(e) =>
                    setFormData({ ...formData, banner: e.target.files[0] })
                  }
                />

                <div className="flex justify-end gap-4 mt-4">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500 transition"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-i-pink text-white rounded hover:bg-pink-600 transition"
                  >
                    Save
                  </button>
                </div>
              </form>
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

export default Packages;
