import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

const Schedule = () => {
  const [schedulesData, setSchedulesData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Helper: Format date safely
  const formatDate = (iso) => {
    if (!iso) return "-";
    const d = new Date(iso);
    if (isNaN(d)) return "-";
    return d.toLocaleDateString("id-ID", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Helper: Format price safely
  const formatPrice = (p) => {
    if (p == null || isNaN(p)) return "-";
    return p.toLocaleString("id-ID");
  };

  useEffect(() => {
    const getSchedules = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/schedules`,
          { headers: { "ngrok-skip-browser-warning": "true" } }
        );
        setSchedulesData(response.data?.data || []);
      } catch (error) {
        console.error("Error fetching schedules:", error);
        setSchedulesData([]);
      } finally {
        setLoading(false);
      }
    };

    getSchedules();
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Navbar />

      {/* HERO SECTION */}
      <section className="w-full flex flex-col items-center justify-center text-center py-24 bg-timberwolf">
        <h1 className="font-topluxury text-6xl sm:text-7xl md:text-8xl text-jungle-green tracking-wide mb-4">
          Schedules
        </h1>
        <p className="text-c-black text-lg sm:text-xl max-w-2xl leading-relaxed px-6">
          Jadwal perjalanan terbaik yang telah kami siapkan untuk pengalaman
          ibadah yang penuh makna dan ketenangan.
        </p>
      </section>

      {/* SCHEDULE TABLE */}
      <section className="w-full py-16 flex flex-col items-center justify-center bg-white">
        <div className="w-[90%] md:w-[85%] lg:w-[75%] overflow-x-auto">
          {loading ? (
            <div className="text-center text-c-black text-lg py-24">
              Sedang memuat jadwal perjalanan...
            </div>
          ) : schedulesData.length === 0 ? (
            <div className="text-center text-c-black text-lg py-24">
              Tidak ada jadwal yang tersedia saat ini.
            </div>
          ) : (
            <table className="w-full border-collapse text-left shadow-md rounded-2xl overflow-hidden">
              <thead className="bg-timberwolf text-jungle-green font-semibold">
                <tr>
                  <th className="py-4 px-4 min-w-[180px]">Package</th>
                  <th className="py-4 px-4 min-w-[120px]">Date</th>
                  <th className="py-4 px-4 min-w-[120px]">Airline</th>
                  <th className="py-4 px-4 min-w-[200px]">Hotel (Madinah)</th>
                  <th className="py-4 px-4 min-w-[200px]">Hotel (Makkah)</th>
                  <th className="py-4 px-4 min-w-[120px] text-right">
                    Price (IDR)
                  </th>
                </tr>
              </thead>
              <tbody>
                {schedulesData.map((s) => (
                  <tr
                    key={s.id}
                    className="border-b hover:bg-timberwolf transition-all duration-200"
                  >
                    <td className="py-4 px-4 font-medium text-c-black">
                      {s.package_name || "-"}
                    </td>
                    <td className="py-4 px-4 text-c-black">
                      {formatDate(s.date)}
                    </td>
                    <td className="py-4 px-4 text-c-black">
                      {s.airline_company || "-"}
                    </td>
                    <td className="py-4 px-4 text-c-black">
                      {s.hotel_madinah || "-"}
                    </td>
                    <td className="py-4 px-4 text-c-black">
                      {s.hotel_makkah || "-"}
                    </td>
                    <td className="py-4 px-4 text-right font-semibold text-jungle-green">
                      {formatPrice(s.price)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Schedule;
