import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

const Testimony = () => {
  const [testimony, setTestimony] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);

    const getTestimony = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/testimony`,
          {
            headers: { "ngrok-skip-browser-warning": "true" },
          }
        );
        setTestimony(res.data.data || []);
      } catch (err) {
        console.error("Failed to fetch media:", err);
      }
    };

    getTestimony();
  }, []);

  const isVideo = (url) => /\.(mp4|webm|ogg)$/i.test(url);
  console.log("Test", testimony);

  return (
    <div>
      <Navbar />
      <div className="relative h-fit bg-i-bright-blue z-20 pb-12">
        <div className="text-white text-[20rem] font-extrabold flex flex-col tracking-tighter hidden md:flex">
          <h1 className="-mt-[10rem] -ml-12">
            <span>TESTIMONY</span>
          </h1>
        </div>

        <div className="md:hidden flex flex-col items-center mb-12">
          <h1 className="text-[4rem] sm:text-[8rem] font-extrabold leading-none text-white">
            TESTIMONY
          </h1>
        </div>

        <div className="flex flex-wrap gap-4 justify-center px-4">
          {testimony.map((media, index) => {
            const url = `../${media.image_path}`;
            const isVideo = /\.(mp4|webm|ogg)$/i.test(media.image_path);

            return isVideo ? (
              <video
                key={index}
                src={url}
                controls
                className="
          object-cover 
          w-full 
          sm:w-[calc(50%-1rem)] 
          md:w-[calc(33.333%-1rem)] 
          lg:w-[calc(25%-1rem)]
          aspect-square
        "
              />
            ) : (
              <img
                key={index}
                src={url}
                alt={`Media ${index}`}
                className="
          object-cover 
          w-full 
          sm:w-[calc(50%-1rem)] 
          md:w-[calc(33.333%-1rem)] 
          lg:w-[calc(25%-1rem)]
          aspect-square
        "
              />
            );
          })}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Testimony;
