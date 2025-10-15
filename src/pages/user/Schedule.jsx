import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

const Schedule = () => {
  const [schedulesData, setSchedulesData] = useState([]);

  const formatDate = (iso) => {
    if (!iso) return "-";
    const d = new Date(iso);
    if (isNaN(d)) return "-";
    return d.toLocaleDateString();
  };

  const formatPrice = (p) => {
    if (p == null) return "-";
    return p.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  useEffect(() => {
    const getSchedules = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/schedules`,
          { headers: { "ngrok-skip-browser-warning": "true" } }
        );
        setSchedulesData(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };

    getSchedules();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="relative h-fit bg-i-yellow z-20 pb-12">
        {/* Desktop Title (unchanged) */}
        <div className="text-white text-[20rem] font-extrabold flex flex-col tracking-tighter hidden md:flex">
          <h1 className="-mt-[10rem] -ml-12">
            <span>SCHEDULES</span>
          </h1>
        </div>

        {/* Mobile Title */}
        <div className="md:hidden flex flex-col items-center mb-12">
          <h1 className="text-[4rem] sm:text-[8rem] font-extrabold leading-none text-white">
            SCHEDULES
          </h1>
        </div>

        {/* Table Container */}
        <div className="w-full md:px-72 px-4 -mt-12 min-h-120 lg:min-h-60 overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[700px] md:min-w-full lg:mt-0 mt-12">
            <thead>
              <tr className="border-b">
                <th className="py-2 min-w-[250px]">Package</th>
                <th className="py-2 min-w-[100px]">Date</th>
                <th className="py-2 min-w-[100px]">Airline</th>
                <th className="py-2 min-w-[250px]">Hotel (Madinah)</th>
                <th className="py-2 min-w-[250px]">Hotel (Makkah)</th>
                <th className="py-2 min-w-[100px]">Price (IDR)</th>
              </tr>
            </thead>
            <tbody>
              {schedulesData.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-4 text-center">
                    No schedules available
                  </td>
                </tr>
              ) : (
                schedulesData.map((s) => (
                  <tr key={s.id} className="border-b last:border-b-0">
                    <td className="py-3">{s.package_name}</td>
                    <td className="py-3">{formatDate(s.date)}</td>
                    <td className="py-3">{s.airline_company}</td>
                    <td className="py-3">{s.hotel_madinah}</td>
                    <td className="py-3">{s.hotel_makkah}</td>
                    <td className="py-3">{formatPrice(s.price)}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Schedule;
