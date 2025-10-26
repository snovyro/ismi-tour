import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../../components/Sidebar";
import Button from "../../components/Button";
import Cookies from "js-cookie";

const formatDisplayDate = (isoString) => {
  try {
    const d = new Date(isoString);
    if (isNaN(d)) return isoString;
    return d.toLocaleString();
  } catch {
    return isoString;
  }
};

const Schedules = () => {
  const [schedules, setSchedules] = useState([]);
  const [packages, setPackages] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form, setForm] = useState({
    package_name: "",
    airline_company: "Garuda",
    date_local: "",
  });
  const [loading, setLoading] = useState(false);

  const fetchSchedules = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/schedules`, {
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
          "ngrok-skip-browser-warning": "true",
        },
      });
      const data =
        res?.data?.data?.data?.schedules ??
        res?.data?.data?.schedules ??
        res?.data?.data ??
        [];
      setSchedules(Array.isArray(data) ? data : []);
      console.log("Fetched schedules:", data);
    } catch (err) {
      console.error(
        "Failed to fetch schedules:",
        err.response?.data || err.message
      );
    } finally {
      setLoading(false);
    }
  };

  const fetchPackages = async () => {
    try {
      const res = await axios.get("http://ismitourandtravel.com/api/packages");
      const data =
        res?.data?.data?.packages ?? res?.data?.packages ?? res?.data ?? [];
      setPackages(Array.isArray(data) ? data : []);
      console.log("Fetched packages:", data);
    } catch (err) {
      console.error(
        "Failed to fetch packages:",
        err.response?.data || err.message
      );
    }
  };

  useEffect(() => {
    fetchSchedules();
    fetchPackages();
  }, []);

  const openAddModal = () => {
    setForm({
      package_name: packages[0]?.package_name ?? "",
      airline_company: "Garuda",
      date_local: "",
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this schedule?")) return;
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/schedules/${id}`, {
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
          "ngrok-skip-browser-warning": "true",
        },
      });
      setSchedules((prev) => prev.filter((s) => s.id !== id && s._id !== id));
      console.log("Deleted schedule", id);
      window.location.reload();
    } catch (err) {
      console.error("Delete failed:", err.response?.data || err.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.package_name) {
      alert("Please select a package.");
      return;
    }
    if (!form.airline_company) {
      alert("Please select an airline.");
      return;
    }
    if (!form.date_local) {
      alert("Please pick a date & time.");
      return;
    }

    const isoDate = new Date(form.date_local).toISOString();

    const payload = {
      package_name: form.package_name,
      airline_company: form.airline_company,
      date: isoDate,
    };

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/schedules`,
        payload,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Cookies.get("token")}`,
            "ngrok-skip-browser-warning": "true",
          },
        }
      );

      const newSchedule = res?.data?.data ?? res?.data ?? null;

      if (newSchedule) {
        const maybeSchedule =
          newSchedule.schedule ?? newSchedule.schedules ?? newSchedule;
        if (Array.isArray(maybeSchedule)) {
          setSchedules((prev) => [...maybeSchedule, ...prev]);
        } else {
          setSchedules((prev) => [maybeSchedule, ...prev]);
        }
      } else {
        await fetchSchedules();
      }

      setIsModalOpen(false);
      console.log("Schedule created:", res.data);
      window.location.reload();
    } catch (err) {
      console.error(
        "Create schedule failed:",
        err.response?.data || err.message
      );
      const serverMsg =
        err?.response?.data?.message || err?.response?.data?.error;
      if (serverMsg) alert("Error: " + serverMsg);
    }
  };

  return (
    <div className="relative">
      <div className="fixed left-0 top-0 h-full w-64">
        <Sidebar />
      </div>

      <div className="p-6 flex-1 ml-64">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Schedules</h1>
          <Button
            width={20}
            textColor="white"
            bgColor="jungle-green hover:bg-pink-600 transition"
            text="Add Schedule"
            onClick={openAddModal}
          />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200 text-center">
                <th className="border border-gray-300 p-3">#</th>
                <th className="border border-gray-300 p-3">Package</th>
                <th className="border border-gray-300 p-3">Airline</th>
                <th className="border border-gray-300 p-3">Date</th>
                <th className="border border-gray-300 p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={5} className="p-4 text-center">
                    Loading...
                  </td>
                </tr>
              ) : schedules.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-4 text-center">
                    No schedules found.
                  </td>
                </tr>
              ) : (
                schedules.map((s, idx) => {
                  const id = s.id ?? s._id ?? s.schedule_id ?? null;
                  return (
                    <tr
                      key={id ?? idx}
                      className="text-center hover:bg-gray-100"
                    >
                      <td className="border border-gray-300 p-3">{idx + 1}</td>
                      <td className="border border-gray-300 p-3">
                        {s.package_name ?? s.package ?? "-"}
                      </td>
                      <td className="border border-gray-300 p-3">
                        {s.airline_company ?? s.airline ?? "-"}
                      </td>
                      <td className="border border-gray-300 p-3">
                        {s.date ? formatDisplayDate(s.date) : "-"}
                      </td>
                      <td className="border border-gray-300 p-3">
                        <div className="flex justify-center gap-2">
                          <Button
                            text="Delete"
                            width={12}
                            textColor="white"
                            bgColor="jungle-green hover:bg-pink-600 transition"
                            onClick={() => handleDelete(id)}
                          />
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 backdrop-blur-md bg-black/20 flex justify-center items-center z-50">
          <div className="bg-white/90 p-6 rounded-2xl shadow-xl border border-white/40 w-[520px]">
            <h2 className="text-xl font-bold mb-4">Add Schedule</h2>

            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              <label className="flex flex-col">
                <span className="mb-1">Package</span>
                <select
                  value={form.package_name}
                  onChange={(e) =>
                    setForm({ ...form, package_name: e.target.value })
                  }
                  className="border p-2 rounded-md outline-none"
                >
                  <option value="">Select package</option>
                  {packages.map((p) => (
                    <option
                      key={p.id ?? p._id ?? p.package_name}
                      value={p.package_name}
                    >
                      {p.package_name}
                    </option>
                  ))}
                </select>
              </label>

              <label className="flex flex-col">
                <span className="mb-1">Airline</span>
                <select
                  value={form.airline_company}
                  onChange={(e) =>
                    setForm({ ...form, airline_company: e.target.value })
                  }
                  className="border p-2 rounded-md outline-none"
                >
                  <option value="Garuda">Garuda</option>
                  <option value="Lion">Lion</option>
                </select>
              </label>

              <label className="flex flex-col">
                <span className="mb-1">Date & Time</span>
                <input
                  type="datetime-local"
                  value={form.date_local}
                  onChange={(e) =>
                    setForm({ ...form, date_local: e.target.value })
                  }
                  className="border p-2 rounded-md outline-none"
                />
              </label>

              <div className="flex justify-end gap-3 mt-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-jungle-green text-white rounded hover:bg-pink-600 transition"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: scale(0.98); }
            to { opacity: 1; transform: scale(1); }
          }
        `}
      </style>
    </div>
  );
};

export default Schedules;
