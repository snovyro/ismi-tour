import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

const Gallery = () => {
  const [gallery, setGallery] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);

    const getGallery = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/galleries`,
          { headers: { "ngrok-skip-browser-warning": "true" } }
        );
        const data = res?.data?.data || [];
        setGallery(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Failed to fetch media:", err);
        setGallery([]);
      }
    };

    getGallery();
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Navbar />

      {/* HERO SECTION */}
      <section className="w-full flex flex-col items-center justify-center text-center py-24 bg-timberwolf">
        <h1 className="font-topluxury text-6xl sm:text-7xl md:text-8xl text-jungle-green tracking-wide mb-4">
          Gallery
        </h1>
        <p className="text-c-black text-lg sm:text-xl max-w-2xl leading-relaxed px-6">
          Dokumentasi perjalanan yang penuh makna dan momen indah bersama
          jamaah.
        </p>
      </section>

      {/* GALLERY GRID */}
      <section className="w-full py-16 bg-white flex flex-col items-center justify-center">
        <div className="w-[90%] md:w-[85%] lg:w-[75%]">
          {gallery.length === 0 ? (
            <div className="text-center text-gray-500 italic py-20">
              Belum ada foto yang tersedia.
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {gallery.map((item, index) => (
                <div
                  key={index}
                  className="overflow-hidden rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
                >
                  <img
                    src={item?.image_path ? `../${item.image_path}` : ""}
                    alt={`Gallery ${index + 1}`}
                    className="object-cover w-full h-full aspect-square hover:scale-105 transition-transform duration-500 ease-in-out"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Gallery;
