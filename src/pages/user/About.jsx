import React from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Button from "../../components/Button";

const About = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      {/* HERO SECTION */}
      <section className="relative w-full flex flex-col items-center justify-center py-24 bg-timberwolf">
        <h1 className="font-topluxury text-6xl sm:text-7xl md:text-9xl text-jungle-green text-center tracking-wide">
          About Us
        </h1>
        <p className="text-c-black text-lg sm:text-xl mt-4 max-w-2xl text-center leading-relaxed px-6">
          Tentang kami dan perjalanan spiritual menuju Tanah Suci yang hangat,
          amanah, dan penuh makna.
        </p>
      </section>

      {/* ABOUT CONTENT */}
      <section className="flex flex-col items-center justify-center text-center md:text-justify px-6 sm:px-12 md:px-32 lg:px-48 py-20 text-c-black bg-white">
        <p className="text-base sm:text-lg leading-relaxed mb-6 max-w-4xl">
          <span className="font-topluxury text-2xl sm:text-3xl text-jungle-green">
            ISMI Tour & Travel (Idha Sri Martin Insani)
          </span>{" "}
          adalah sahabat perjalanan spiritualmu menuju Tanah Suci. Berdiri
          dengan semangat Insani serta membawa nilai keikhlasan, keberkahan, dan
          kedekatan hati. Kami hadir untuk generasi yang ingin beribadah dengan
          cara yang lebih nyaman, hangat, dan bermakna.
        </p>

        <p className="text-base sm:text-lg leading-relaxed mb-12 max-w-4xl">
          Didukung oleh pembimbing berpengalaman, pelayanan profesional & sesuai
          syariat Islam, serta pendekatan yang dekat dengan Generasi Z dan
          Milenial, ISMI Tour siap menemanimu dalam setiap langkah menuju
          panggilan Allah.
        </p>

        <Button
          width="40"
          textColor="white"
          bgColor="jungle-green"
          bgColorHover="hamptoon"
          text="Lihat Paket Travel"
          onClick={() => (window.location.href = "/packages")}
        />
      </section>

      {/* VISI & MISI SECTION */}
      <section className="w-full bg-timberwolf py-24 flex flex-col items-center text-center">
        <h2 className="font-topluxury text-5xl sm:text-6xl md:text-8xl text-jungle-green mb-12">
          Visi & Misi
        </h2>

        <p className="max-w-3xl text-base sm:text-lg leading-relaxed text-c-black px-6 mb-12">
          Menjadi penyelenggara perjalanan ibadah Umroh yang{" "}
          <span className="font-semibold">
            amanah, profesional, dan inspiratif
          </span>{" "}
          bagi generasi muda, dengan semangat Insani yang membawa nilai
          kemanusiaan, kebaikan, dan kedekatan spiritual yang otentik.
        </p>

        <ul className="max-w-2xl text-left list-disc list-inside text-base sm:text-lg leading-relaxed text-c-black px-6 space-y-4">
          <li>
            Menghadirkan layanan ibadah yang modern, mudah diakses, dan sesuai
            tuntunan syariat Islam.
          </li>
          <li>
            Mengedepankan pendekatan personal bagi setiap jamaah bukan sekadar
            pelanggan, tapi sahabat spiritual.
          </li>
          <li>
            Menyampaikan nilai-nilai keislaman dengan bahasa yang hangat dan
            gaya yang dekat dengan Gen Z dan Milenial.
          </li>
          <li>
            Menjadi ruang tumbuh bagi anak muda untuk menemukan makna ibadah dan
            spiritualitas yang relevan di era digital.
          </li>
          <li>
            Menjaga kepercayaan dengan pelayanan yang transparan, amanah, dan
            berorientasi pada keberkahan.
          </li>
        </ul>
      </section>

      <Footer />
    </div>
  );
};

export default About;
