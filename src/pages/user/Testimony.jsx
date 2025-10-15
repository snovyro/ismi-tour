import React from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

const Testimony = () => {
  const images = [
    "https://placehold.co/400",
    "https://placehold.co/400",
    "https://placehold.co/400",
    "https://placehold.co/400",
    "https://placehold.co/400",
    "https://placehold.co/400",
    "https://placehold.co/400",
    "https://placehold.co/400",
    "https://placehold.co/400",
    "https://placehold.co/400",
  ];

  return (
    <div>
      <Navbar />
      <div className="relative h-fit bg-i-bright-blue z-20 pb-12">
        {/* DESKTOP TITLE (unchanged) */}
        <div className="text-white text-[20rem] font-extrabold flex flex-col tracking-tighter hidden md:flex">
          <h1 className="-mt-[10rem] -ml-12">
            <span>TESTIMONY</span>
          </h1>
        </div>

        {/* MOBILE/TABLET TITLE */}
        <div className="md:hidden flex flex-col items-center mb-12">
          <h1 className="text-[4rem] sm:text-[8rem] font-extrabold leading-none text-white">
            TESTIMONY
          </h1>
        </div>

        {/* RESPONSIVE GRID */}
        <div className="flex flex-wrap gap-4 justify-center px-4">
          {images.map((image, index) => (
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

export default Testimony;
