import React, { useEffect, useState } from "react";
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Button from "../../components/Button";

const Packages = () => {
  const phoneNumber = import.meta.env.VITE_PHONE_NUMBER;
  const [packagesData, setPackagesData] = useState([]);
  const [loading, setLoading] = useState(true); // 👈 Loading state added

  const handleClick = (packageName) => {
    const compiledMessage = `Halo, saya tertarik dengan paket ${packageName}.`;
    const encodedMessage = encodeURIComponent(compiledMessage);
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    window.open(whatsappURL, "_blank");
  };

  useEffect(() => {
    const getPackagesData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/packages`,
          { headers: { "ngrok-skip-browser-warning": "true" } }
        );
        const packages = response.data?.data?.packages || [];
        setPackagesData(packages);
      } catch (error) {
        console.error("Error fetching packages:", error);
      } finally {
        setLoading(false);
      }
    };

    getPackagesData();
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 700,
    slidesToShow: window.innerWidth < 768 ? 1 : 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnHover: true,
    arrows: false,
  };

  const getImageUrl = (url) => {
    if (!url) return "";
    const cleanedUrl = url.replace(/ /g, "%20");
    return cleanedUrl.startsWith("http") ? cleanedUrl : `/${cleanedUrl}`;
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Navbar />

      {/* HERO SECTION */}
      <section className="w-full flex flex-col items-center justify-center text-center py-24 bg-timberwolf">
        <h1 className="font-topluxury text-6xl sm:text-7xl md:text-8xl text-jungle-green tracking-wide mb-4">
          Packages
        </h1>
        <p className="text-c-black text-lg sm:text-xl max-w-2xl leading-relaxed px-6">
          Pilihan paket terbaik untuk menemanimu beribadah dengan tenang dan
          penuh makna.
        </p>
      </section>

      {/* PACKAGES SECTION */}
      <section className="w-full py-20 flex flex-col items-center justify-center">
        <div className="w-[90%] md:w-[80%] lg:w-[75%]">
          {loading ? (
            <div className="text-center text-c-black text-lg py-24 animate-pulse">
              Sedang memuat paket perjalanan...
            </div>
          ) : packagesData.length > 0 ? (
            <Slider {...settings}>
              {packagesData.map((pkg) => (
                <div key={pkg.id} className="px-3">
                  <div className="bg-timberwolf rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden h-full flex flex-col justify-between">
                    <img
                      src={getImageUrl(pkg.banner_image_url)}
                      alt={pkg.package_name}
                      className="w-full h-56 object-cover"
                    />

                    <div className="p-6 flex flex-col flex-grow text-c-black">
                      <h2 className="text-2xl font-semibold mb-2 text-jungle-green font-topluxury">
                        {pkg.package_name}
                      </h2>
                      <p className="text-sm sm:text-base font-medium mb-1">
                        {pkg.airline || "Maskapai tidak tersedia"}
                      </p>
                      <p className="text-sm sm:text-base mb-3">
                        {pkg.hotel_madinah && pkg.hotel_makkah
                          ? `${pkg.hotel_madinah} & ${pkg.hotel_makkah}`
                          : "Informasi hotel belum tersedia"}
                      </p>

                      <ul className="list-disc list-inside text-sm sm:text-base mb-3 leading-relaxed">
                        {pkg.inclusions && pkg.inclusions.length > 0 ? (
                          pkg.inclusions.map((feature, index) => (
                            <li key={index}>{feature}</li>
                          ))
                        ) : (
                          <li>Informasi fasilitas belum tersedia</li>
                        )}
                      </ul>

                      <div className="mt-auto">
                        <p className="font-semibold text-sm sm:text-base">
                          Duration:{" "}
                          {pkg.duration_days
                            ? `${pkg.duration_days} days`
                            : "Belum ditentukan"}
                        </p>
                        <p className="font-bold text-jungle-green text-base sm:text-lg mb-4">
                          {pkg.price_start
                            ? `Start from: Rp ${pkg.price_start.toLocaleString(
                                "id-ID"
                              )}`
                            : "Harga belum tersedia"}
                        </p>

                        <Button
                          bgColor="jungle-green"
                          textColor="white"
                          bgColorHover="hamptoon"
                          text="Book Now"
                          onClick={() => handleClick(pkg.package_name)}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </Slider>
          ) : (
            <div className="text-center text-c-black text-lg py-24">
              Belum ada paket yang tersedia saat ini.
              <p className="text-sm text-gray-500 mt-2">
                Silakan kembali lagi nanti untuk melihat penawaran terbaru.
              </p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Packages;
