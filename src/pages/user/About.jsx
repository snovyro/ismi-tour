import React from "react";
import Navbar from "../../components/Navbar";
import Button from "../../components/Button";
import Footer from "../../components/Footer";

const About = () => {
  return (
    <div>
      <Navbar />
      <div className="w-full relative h-fit pb-12 bg-i-pink">
        <div className="w-full h-full flex flex-col items-end text-i-dark">
          <h2 className="relative z-2 text-[20rem] tracking-tighter font-bold -mt-[10rem]">
            ABOUT
          </h2>
          <h2 className="text-[20rem] tracking-tighter font-bold -mt-[15.75rem] text-i-yellow">
            US
          </h2>
          <div className="flex flex-col gap-12 justify-center items-center text-justify px-64 -mt-54 z-10">
            <p className="text-lg w-[50%]">
              <span className="font-bold text-2xl">ISMI Tour & Travel</span>{" "}
              (Idha Sri Martin Insani) adalah sahabat perjalanan spiritualmu
              menuju Tanah Suci. Berdiri dengan semangat Insani serta membawa
              nilai keikhlasan, keberkahan, dan kedekatan hati. Kami hadir untuk
              generasi yang ingin beribadah dengan cara yang lebih nyaman,
              hangat, dan bermakna.
            </p>
            <p className="text-lg w-[50%]">
              Didukung oleh pembimbing berpengalaman, pelayanan profesional &
              sesuai syariat Islam, serta pendekatan yang dekat dengan Generasi
              Z dan Milenial, ISMI Tour siap menemanimu dalam setiap langkah
              menuju panggilan Allah.
            </p>
          </div>
        </div>
      </div>
      <section className="relative flex flex-col items-center justify-center py-32 overflow-hidden bg-i-pink">
        {/* Background Title */}
        <div className="absolute w-full flex flex-col gap-0 top-20 z-10 select-none bg-i-pink -ml-20">
          <h2 className="text-[14rem] sm:text-[18rem] font-extrabold leading-none tracking-tighter text-i-dark/100">
            VISI &
          </h2>
          <h2 className="text-[14rem] sm:text-[18rem] font-extrabold leading-none tracking-tighter text-i-yellow/100 -mt-20">
            MISI
          </h2>
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col  w-full gap-12 mt-6 text-right items-end pr-32">
          <p className="text-base sm:text-lg lg:text-xl max-w-3xl text-justify">
            Menjadi penyelenggara perjalanan ibadah Umroh yang{" "}
            <span className="font-semibold">
              amanah, profesional, dan inspiratif
            </span>{" "}
            bagi generasi muda, dengan semangat Insani — membawa nilai
            kemanusiaan, kebaikan, dan kedekatan spiritual yang otentik.
          </p>

          <ul className="list-decimal list-inside text-base sm:text-lg lg:text-xl max-w-3xl space-y-4 text-justify">
            <li>
              Menghadirkan layanan ibadah yang modern, mudah diakses, dan sesuai
              tuntunan syariat Islam.
            </li>
            <li>
              Mengedepankan pendekatan personal bagi setiap jamaah — bukan
              sekadar pelanggan, tapi sahabat spiritual.
            </li>
            <li>
              Menyampaikan nilai-nilai keislaman dengan bahasa yang hangat dan
              gaya yang dekat dengan Gen Z dan Milenial.
            </li>
            <li>
              Menjadi ruang tumbuh bagi anak muda untuk menemukan makna ibadah
              dan spiritualitas yang relevan di era digital.
            </li>
            <li>
              Menjaga kepercayaan dengan pelayanan yang transparan, amanah, dan
              berorientasi pada keberkahan.
            </li>
          </ul>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
