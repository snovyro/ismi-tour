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
          {
            headers: { "ngrok-skip-browser-warning": "true" },
          }
        );
        setGallery(res.data.data || []);
      } catch (err) {
        console.error("Failed to fetch media:", err);
      }
    };

    getGallery();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="relative h-fit bg-i-bright-blue z-20 pb-12">
        <div className="text-white text-[20rem] font-extrabold flex flex-col tracking-tighter hidden md:flex">
          <h1 className="-mt-[10rem] -ml-12">
            <span>GALLERY</span>
          </h1>
        </div>

        <div className="md:hidden flex flex-col items-center mb-12">
          <h1 className="text-[4rem] sm:text-[8rem] font-extrabold leading-none text-white">
            GALLERY
          </h1>
        </div>

        <div className="flex flex-wrap gap-4 justify-center px-4">
          {gallery.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Image ${index}`}
              className="
                object-cover 
                w-full 
                sm:w-[calc(50%-1rem)] 
                md:w-[calc(33.333%-1rem)] 
                lg:w-[calc(25%-1rem)]
                aspect-square
              "
            />
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Gallery;
