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

      {/* HERO NEW */}
      <div className="w-full relative h-auto z-20 flex flex-col md:flex-row items-center justify-center text-black">
        <div className="w-full md:w-3/5 h-[20rem] md:h-[40rem]">
          <img
            className="w-full h-full object-cover md:pr-12"
            src="https://picsum.photos/id/38/1280/960"
            alt="Ismi Tour"
          />
        </div>

        <div className="mt-12 lg:mt-0 w-full md:w-2/5 h-auto md:h-[40rem] flex font-topluxury text-5xl sm:text-6xl md:text-9xl font-bold items-center md:items-end justify-center md:justify-start pl-0 md:pl-6 pb-6 md:pb-12 text-jungle-green text-center md:text-left">
          <div>
            Ismi Tour
            <br />
            and Travel
          </div>
        </div>
      </div>

      {/* ABOUT US NEW */}
      <div
        ref={aboutRef}
        className="w-full relative h-[auto] pt-32 flex items-center justify-center"
      >
        <div className="w-full px-12 mt-12 lg:mt-0 lg:w-2/5 text-justify gap-6 flex flex-col items-center">
          <p>
            <span className="font-topluxury text-2xl">
              ISMI Tour & Travel (Idha Sri Martin Insani)
            </span>{" "}
            adalah sahabat perjalanan spiritualmu menuju Tanah Suci. Berdiri
            dengan semangat Insani serta membawa nilai keikhlasan, keberkahan,
            dan kedekatan hati. Kami hadir untuk generasi yang ingin beribadah
            dengan cara yang lebih nyaman, hangat, dan bermakna.
          </p>
          <p className="mb-6">
            Didukung oleh pembimbing berpengalaman, pelayanan profesional &
            sesuai syariat Islam, serta pendekatan yang dekat dengan Generasi Z
            dan Milenial, ISMI Tour siap menemanimu dalam setiap langkah menuju
            panggilan Allah.
          </p>
          <Button
            width="20"
            textColor="white"
            bgColor="jungle-green"
            bgColorHover="hamptoon"
            text="Pelajari Lebih Lanjut"
            onClick={() => navigate("/about")}
          />
        </div>
      </div>

      {/* WHY US SECTION */}
      <div className="w-full relative overflow-hidden h-auto pt-32">
        <div className="relative z-10 text-white px-6 flex flex-col items-center">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl w-full">
            <Card
              tColor="jungle-green"
              dColor="jungle-green"
              bgColor="hamptoon"
              title="Menghubungkan Spiritualitas dan Gaya Hidup Modern"
              description="ISMI Tour hadir sebagai jembatan antara nilai-nilai spiritual dan gaya hidup masa kini, menghadirkan pengalaman ibadah yang relevan dengan zaman."
            />
            <Card
              tColor="jungle-green"
              dColor="jungle-green"
              bgColor="hamptoon"
              title="Perjalanan Jiwa yang Bermakna"
              description="Kami percaya bahwa umroh bukan sekadar ritual, melainkan perjalanan hati yang dilakukan dengan semangat muda, penuh makna, dan ketulusan."
            />
            <Card
              tColor="jungle-green"
              dColor="jungle-green"
              bgColor="hamptoon"
              title="Your Spiritual Travel Buddy"
              description="Sebagai teman seperjalanan, ISMI Tour menemanimu menuju Tanah Suci dengan cara yang hangat, amanah, dan penuh arti."
            />
          </div>
        </div>
      </div>

      {/* CONTACT US SECTION */}
      <div className="w-full overflow-hidden h-auto py-32 flex flex-col items-center justify-between">
        <div className="w-full px-6 sm:px-12 md:px-20 lg:px-32 flex flex-col lg:flex-row gap-8 lg:gap-16 items-center justify-center text-c-black ">
          <iframe
            className="h-64 sm:h-80 md:h-96 lg:h-[50vh] w-full"
            src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d1983.5297900266141!2d106.1669348!3d-6.1226839!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e41f5137b623697%3A0xcd74978dbb3193d!2sCafe%20Kebon%20Cau!5e0!3m2!1sen!2sid!4v1761499679187!5m2!1sen!2sid"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>

          <form className="flex flex-col justify-center gap-6 w-full md:w-[24rem] lg:w-[28rem] p-6 backdrop-blur-sm ">
            <div className="flex flex-col text-left">
              <label className="text-lg font-semibold mb-2 text-c-black">
                Nama
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Masukkan nama Anda"
                className="px-4 py-3 border border-[#cfcac0] rounded-lg bg-white text-c-black placeholder:text-gray-400 focus:ring-2 focus:ring-jungle-green/40 focus:border-jungle-green outline-none transition-all duration-200"
              />
            </div>

            <div className="flex flex-col text-left">
              <label className="text-lg font-semibold mb-2 text-c-black">
                Pilih Paket
              </label>
              <select
                className="px-4 py-3 border border-[#cfcac0] rounded-lg bg-white text-c-black focus:ring-2 focus:ring-jungle-green/40 focus:border-jungle-green outline-none transition-all duration-200"
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
              <label className="text-lg font-semibold mb-2 text-c-black">
                Pesan
              </label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows="3"
                placeholder="Tulis pesan Anda di sini..."
                className="px-4 py-3 border border-[#cfcac0] rounded-lg bg-white text-c-black placeholder:text-gray-400 focus:ring-2 focus:ring-jungle-green/40 focus:border-jungle-green outline-none resize-none transition-all duration-200"
              ></textarea>
            </div>

            <Button
              text="Kirim"
              onClick={() => {
                const encodedMessage = encodeURIComponent(compiledMessage);
                const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
                window.open(whatsappURL, "_blank");
              }}
              textColor="white"
              bgColor="jungle-green"
              bgColorHover="hamptoon"
            />
          </form>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Home;
