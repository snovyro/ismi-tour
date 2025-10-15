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
        setPackagesData(response.data.data.packages);
      } catch (error) {}
    };

    getPackagesData();
  }, []);

  const dataToShow = packagesData;

  const settings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: window.innerWidth < 768 ? 1 : 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    pauseOnHover: true,
    arrows: true,
  };

  return (
    <div>
      <Navbar />
      <div className="relative h-fit bg-i-yellow z-20 pb-12">
        {/* DESKTOP TITLE (unchanged) */}
        <div className="text-white text-[20rem] font-extrabold lg:flex flex-col tracking-tighter hidden md:flex">
          <h1 className="-mt-[10rem] -ml-12">
            <span>PACKAGES</span>
          </h1>
        </div>

        {/* MOBILE/TABLET TITLE (stacked + smaller) */}
        <div className="md:hidden flex flex-col items-center mb-16">
          <h1 className="text-[4rem] sm:text-[8rem] font-extrabold leading-none text-white">
            PACKAGES
          </h1>
        </div>

        <div className="w-full px-4 sm:px-6 md:px-8 -mt-12 flex justify-center">
          <Slider className="w-[85%] max-w-[600px] md:max-w-none" {...settings}>
            {dataToShow.map((pkg) => (
              <div key={pkg.id} className="px-2 sm:px-4 mb-4">
                <div className="w-full bg-amber-100 h-fit p-4 sm:p-6 shadow-md hover:shadow-lg transition-shadow duration-300">
                  <img
                    src={"https://placehold.co/800x400"}
                    alt={pkg.package_name}
                    className="w-full h-40 sm:h-60 object-cover mb-4"
                  />

                  <h2 className="text-xl sm:text-2xl font-bold mb-2 text-i-dark h-16">
                    {pkg.package_name}
                  </h2>

                  <p className="text-i-dark text-sm sm:text-base font-medium">
                    {pkg.airline}
                  </p>
                  <p className="text-i-dark text-sm sm:text-base mb-2">
                    {pkg.hotel_madinah} & {pkg.hotel_makkah}
                  </p>

                  <ul className="list-disc list-inside text-i-dark text-xs sm:text-sm mb-2">
                    {(pkg.inclusions || []).map((feature, index) => (
                      <li key={index}>{feature}</li>
                    ))}
                  </ul>

                  <p className="font-bold text-i-dark text-sm sm:text-base">
                    Duration: {pkg.duration_days} days
                  </p>
                  <p className="font-bold text-i-dark text-sm sm:text-base mb-4">
                    Start from: Rp {pkg.price_start.toLocaleString("id-ID")}
                  </p>

                  <Button
                    bgColor="i-dark"
                    textColor="i-yellow"
                    redirectTo={() => handleClick(pkg.package_name)}
                    text="Book Now"
                  />
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Packages;
