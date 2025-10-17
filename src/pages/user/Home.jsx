import React, { useState, useEffect, useMemo, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Button from "../../components/Button";
import Card from "../../components/Card";
import packages from "../../jsons/packages.json";

const Home = () => {
  const phoneNumber = import.meta.env.VITE_PHONE_NUMBER;
  const [packagesData, setPackagesData] = useState([]);

  const [name, setName] = useState("");
  const [packageName, setPackageName] = useState(
    packages.data.packages[0]?.package_name || ""
  );
  const [message, setMessage] = useState("");

  const navigate = useNavigate();
  const aboutRef = useRef(null);

  const compiledMessage = useMemo(() => {
    return name
      ? `Halo, saya ${name} dan saya tertarik dengan paket ${packageName}. ${message}`
      : `Halo, saya tertarik dengan paket ${packageName}. ${message}`;
  }, [name, packageName, message]);

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

  return (
    <div>
      <Navbar />

      {/* HERO SECTION */}
      <div className="w-full relative h-[48rem] bg-i-bright-blue z-20 flex flex-col items-center justify-center text-white">
        {/* Desktop Giant Text */}
        <div className="lg:flex hidden text-white text-[20rem] font-extrabold flex-col tracking-tighter">
          <h1 className="-mt-[14rem] -ml-[30rem]">
            <span>ISMI</span>
            <span className="text-i-neon-green">TOUR</span>
          </h1>
          <h1 className="-mt-[16rem] -ml-[30rem]">
            <span className="text-i-yellow">&</span>
            <span>TRAVEL</span>
          </h1>
        </div>

        {/* Mobile / Tablet Simplified Title */}
        <div className="lg:hidden text-center px-6">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight">
            <span className="text-white">ISMI </span>
            <span className="text-i-neon-green">TOUR </span>
            <span className="text-i-yellow">& </span>
            <span className="text-white">TRAVEL</span>
          </h1>
        </div>

        {/* Subtitle + Button */}
        <div className="w-full flex flex-col justify-center items-center gap-6 text-center text-white mt-8">
          <p className="w-full lg:w-[50%] text-base sm:text-lg font-bold px-6">
            Your Spiritual Travel Buddy
          </p>
          <Button
            width="20"
            bgColor="white"
            bgColorHover="i-yellow"
            text="Get Started"
            onClick={() => {
              aboutRef.current?.scrollIntoView({ behavior: "smooth" });
            }}
          />
        </div>
      </div>

      {/* ABOUT SECTION */}
      <div
        ref={aboutRef}
        className="w-full relative h-[auto] lg:h-[48rem] bg-i-pink py-20 lg:py-0"
      >
        <div className="w-full h-full flex flex-col items-center lg:items-end text-i-dark">
          <h2 className="relative z-2 text-[4rem] sm:text-[8rem] lg:text-[20rem] tracking-tighter font-extrabold -mt-[2rem] lg:-mt-[10rem]">
            ABOUT
          </h2>
          <h2 className="text-[4rem] sm:text-[8rem] lg:text-[20rem] tracking-tighter font-extrabold -mt-[1.5rem] sm:-mt-[3rem] lg:-mt-[15.75rem] text-i-yellow">
            US
          </h2>
        </div>
        <div className="flex flex-col gap-8 justify-center items-center text-justify px-6 sm:px-12 lg:px-72 mt-8 lg:-mt-112 z-10 font-medium">
          <p className="text-base sm:text-lg w-full lg:w-[50%]">
            <span className="font-bold text-xl sm:text-2xl">
              ISMI Tour & Travel
            </span>{" "}
            (Idha Sri Martin Insani) adalah sahabat perjalanan spiritualmu
            menuju Tanah Suci. Berdiri dengan semangat Insani serta membawa
            nilai keikhlasan, keberkahan, dan kedekatan hati. Kami hadir untuk
            generasi yang ingin beribadah dengan cara yang lebih nyaman, hangat,
            dan bermakna.
          </p>
          <p className="text-base sm:text-lg w-full lg:w-[50%]">
            Didukung oleh pembimbing berpengalaman, pelayanan profesional &
            sesuai syariat Islam, serta pendekatan yang dekat dengan Generasi Z
            dan Milenial, ISMI Tour siap menemanimu dalam setiap langkah menuju
            panggilan Allah.
          </p>
          <div className="flex gap-6 sm:gap-12">
            <Button
              width="20"
              bgColor="white"
              bgColorHover="i-yellow"
              text="Learn More"
              onClick={() => navigate("/about")}
            />
          </div>
        </div>
      </div>

      {/* WHY US SECTION */}
      <div className="w-full relative bg-i-pink py-32 overflow-hidden h-auto lg:h-[48rem]">
        <div className="absolute mt-0 lg:-mt-[8rem] top-0 left-1/2 -translate-x-1/2 text-center text-white/40 text-[6rem] sm:text-[10rem] md:text-[16rem] lg:text-[32rem] font-extrabold leading-none tracking-tighter select-none pointer-events-none">
          <span className="text-i-neon-green">WHY</span>US?
        </div>
        <div className="relative z-10 text-white px-6 sm:px-12 lg:mt-72 flex flex-col items-center">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl w-full">
            <Card
              title="Menghubungkan Spiritualitas dan Gaya Hidup Modern"
              description="ISMI Tour hadir sebagai jembatan antara nilai-nilai spiritual dan gaya hidup masa kini, menghadirkan pengalaman ibadah yang relevan dengan zaman."
            />
            <Card
              title="Perjalanan Jiwa yang Bermakna"
              description="Kami percaya bahwa umroh bukan sekadar ritual, melainkan perjalanan hati yang dilakukan dengan semangat muda, penuh makna, dan ketulusan."
            />
            <Card
              title="Your Spiritual Travel Buddy"
              description="Sebagai teman seperjalanan, ISMI Tour menemanimu menuju Tanah Suci dengan cara yang hangat, amanah, dan penuh arti."
            />
          </div>
        </div>
      </div>

      {/* CONTACT US SECTION */}
      <div className="w-full relative bg-i-neon-green overflow-hidden h-auto lg:h-[48rem] flex flex-col items-center justify-between">
        <div className="lg:flex hidden whitespace-nowrap text-[4rem] sm:text-[6rem] md:text-[8rem] lg:text-[12.25rem] font-extrabold leading-none text-i-dark mt-6 lg:-mt-12">
          <span>CONTACT&nbsp;US&nbsp;</span>
          <span className="hidden sm:inline">CONTACT&nbsp;US&nbsp;</span>
          <span className="hidden lg:inline">CONTACT&nbsp;US&nbsp;</span>
        </div>
        <div className="flex flex-col items-center lg:hidden pb-6">
          <h2 className="text-[4rem] sm:text-[6rem] md:text-[8rem] lg:text-[12.25rem] font-extrabold leading-none text-i-dark mt-6 lg:-mt-12">
            CONTACT
          </h2>
          <h2 className="text-[4rem] sm:text-[6rem] md:text-[8rem] lg:text-[12.25rem] font-extrabold leading-none text-white">
            US
          </h2>
        </div>

        <div className="w-full pb-32 px-6 sm:px-12 md:px-20 lg:px-32 flex flex-col lg:flex-row gap-8 lg:gap-16 items-center justify-center text-i-dark ">
          <iframe
            className="w-full lg:w-full h-64 sm:h-80 md:h-96 lg:h-full"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3967.058200854214!2d106.14056297587587!3d-6.122869593863802!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e418baf367c435d%3A0x1cf4802a79f2287c!2sSatu%20Tempat%20caffe%20%26%20Eatery!5e0!3m2!1sen!2sid!4v1760689952415!5m2!1sen!2sid"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>

          <form className="flex flex-col justify-center gap-6 w-full md:w-[24rem] lg:w-[28rem]">
            <div className="flex flex-col text-left">
              <label className="text-lg font-semibold mb-1">Nama</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Masukkan nama Anda"
                className="px-4 py-3 bg-white focus:border-i-dark focus:outline-none"
              />
            </div>

            <div className="flex flex-col text-left">
              <label className="text-lg font-semibold mb-1">Pilih Paket</label>
              <select
                className="px-4 py-3 bg-white focus:border-i-dark focus:outline-none"
                value={packageName}
                onChange={(e) => setPackageName(e.target.value)}
              >
                {packagesData.map((pkg) => (
                  <option key={pkg.id} value={pkg.package_name}>
                    {pkg.package_name}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col text-left">
              <label className="text-lg font-semibold mb-1">Pesan</label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows="2"
                placeholder="Tulis pesan Anda di sini..."
                className="px-4 py-3 bg-white focus:border-i-dark focus:outline-none resize-none"
              ></textarea>
            </div>

            <Button
              text="Kirim"
              onClick={() => {
                const encodedMessage = encodeURIComponent(compiledMessage);
                const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
                window.open(whatsappURL, "_blank");
              }}
              bgColor="white"
              bgColorHover="i-yellow"
              textColor="i-dark"
            />
          </form>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Home;
