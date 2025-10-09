import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import packages from "../../jsons/packages.json";

const Packages = () => {
  const [packagesData, setPackagesData] = useState([]);
  const packagesDataDummy = packages.data.packages;

  useEffect(() => {
    const getPackagesData = async () => {
      try {
        const response = await axios.get(
          "https://af33cc6c50c4.ngrok-free.app/api/packages"
        );
        setPackagesData(response.data);
      } catch (error) {
        console.error("Error fetching packages data:", error);
      }
    };

    getPackagesData();
  }, []);

  // Use API data if available, otherwise fallback to dummy
  const dataToShow = packagesData.length > 0 ? packagesData : packagesDataDummy;
  console.log("Packages Data:", dataToShow);

  return (
    <div>
      <Navbar />
      <div className="relative h-fit bg-i-yellow z-20 pb-12">
        <div className="text-white text-[20rem] font-extrabold flex flex-col tracking-tighter">
          <h1 className="-mt-[10rem] -ml-6.5">
            <span>PACKAGES</span>
          </h1>
        </div>

        <div className="flex flex-wrap justify-center gap-8 -mt-12 px-8">
          {dataToShow.map((pkg) => (
            <div
              key={pkg.id}
              className="w-120 bg-amber-100 h-fit p-6 rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <img
                src={
                  pkg.banner_image_url
                    ? `https://af33cc6c50c4.ngrok-free.app/${pkg.banner_image_url}`
                    : "https://placehold.co/800x400"
                }
                alt={pkg.package_name}
                className="w-full h-40 object-cover mb-4 rounded-lg"
              />

              <h2 className="text-2xl font-bold mb-2 text-i-dark">
                {pkg.package_name}
              </h2>

              <p className="text-i-dark font-medium">{pkg.airline}</p>
              <p className="text-i-dark mb-2">
                {pkg.hotel_madinah} & {pkg.hotel_makkah}
              </p>

              <ul className="list-disc list-inside text-i-dark text-sm mb-2">
                {(pkg.inclusions || []).map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>

              <p className="font-bold text-i-dark">
                Duration: {pkg.duration_days} days
              </p>
              <p className="font-bold text-i-dark">
                Start from: Rp {pkg.price_start.toLocaleString("id-ID")}
              </p>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Packages;
