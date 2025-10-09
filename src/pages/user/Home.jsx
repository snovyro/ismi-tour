import React from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Button from "../../components/Button";
import Card from "../../components/Card";

const Home = () => {
  const phoneNumber = "6287871121849";
  const [message, setMessage] = React.useState(
    "Hello, I am interested in your travel packages."
  );
  return (
    <div>
      <Navbar />
      {/* Hero Section */}
      <div className="relative h-[48rem] bg-i-bright-blue z-20">
        <div className="text-white text-[20rem] font-extrabold flex flex-col tracking-tighter">
          <h1 className="-mt-[10rem] -ml-6.5">
            <span>ISMI</span>
            <span className="text-i-neon-green">TOUR</span>
          </h1>
          <h1 className="-mt-[16.5rem] -ml-16">
            <span className="text-i-yellow">&</span> <span>TRAVEL</span>
          </h1>
        </div>
        <div className="w-full flex flex-col justify-center items-center gap-12 text-center text-white">
          <p className="w-[50%] text-lg font-bold">
            Your Spiritual Travel Buddy
          </p>
          <Button
            width="20"
            bgColor="white"
            bgColorHover="i-neon-green"
            text="Get Started"
          />
        </div>
      </div>

      {/* About Us */}
      <div className="w-full relative h-[48rem] bg-i-pink">
        <div className="w-full h-full flex flex-col items-end text-i-dark">
          <h2 className="relative z-2 text-[20rem] tracking-tighter font-extrabold -mt-[10rem]">
            ABOUT
          </h2>
          <h2 className="text-[20rem] tracking-tighter font-extrabold -mt-[15.75rem] text-i-yellow">
            US
          </h2>
          <div className="flex flex-col gap-12 justify-center items-center text-justify px-64 -mt-54 z-10 font-medium">
            <p className="text-lg w-[50%] ">
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
            <div className="flex gap-12">
              <Button
                width="20"
                bgColor="white"
                bgColorHover="i-yellow"
                text="Learn More"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Why Us */}
      <div className="w-full relative bg-i-pink py-32 overflow-hidden h-[48rem]">
        {/* Background Title */}
        <div className="absolute -mt-[8rem] top-0 left-1/2 -translate-x-1/2 text-center text-white/40 text-[32rem] font-extrabold leading-none tracking-tighter select-none pointer-events-none">
          <span className="text-i-neon-green">WHY</span>US?
        </div>

        {/* Foreground Content */}
        <div className="relative z-10 text-white px-12 mt-72 flex flex-col items-center">
          <div className="grid grid-cols-3 gap-8 max-w-7xl">
            {/* Card 1 */}
            <Card
              title="Menghubungkan Spiritualitas dan Gaya Hidup Modern"
              description="ISMI Tour hadir sebagai jembatan antara nilai-nilai spiritual
                dan gaya hidup masa kini, menghadirkan pengalaman ibadah yang
                relevan dengan zaman."
            />

            <Card
              title="Perjalanan Jiwa yang Bermakna"
              description="Kami percaya bahwa umroh bukan sekadar ritual, melainkan
                perjalanan hati yang dilakukan dengan semangat muda, penuh
                makna, dan ketulusan."
            />

            <Card
              title="Your Spiritual Travel Buddy"
              description="Sebagai teman seperjalanan, ISMI Tour menemanimu menuju Tanah
                Suci dengan cara yang hangat, amanah, dan penuh arti."
            />
          </div>
        </div>
      </div>

      {/* Contact*/}
      <div className="w-full relative bg-i-neon-green overflow-hidden h-[48rem] flex flex-col items-center justify-between">
        {/* Top Scrolling Text (Static Loop) */}
        <div className="flex whitespace-nowrap text-[12.25rem] font-extrabold leading-none text-i-dark -mt-12">
          <span>CONTACT&nbsp;US&nbsp;</span>
          <span>CONTACT&nbsp;US&nbsp;</span>
          <span>CONTACT&nbsp;US&nbsp;</span>
          <span>CONTACT&nbsp;US&nbsp;</span>
          <span>CONTACT&nbsp;US&nbsp;</span>
        </div>

        {/* Contact Form */}
        <div className="flex flex-col items-center justify-center text-i-dark">
          <form className="flex flex-col gap-6 w-[28rem]">
            {/* Nama */}
            <div className="flex flex-col text-left">
              <label className="text-lg font-semibold mb-1">Nama</label>
              <input
                type="text"
                placeholder="Masukkan nama Anda"
                className="px-4 py-3 rounded-lg border-2 bg-white border-i-dark/80 focus:border-i-dark focus:outline-none"
              />
            </div>

            {/* Pilih Paket */}
            <div className="flex flex-col text-left">
              <label className="text-lg font-semibold mb-1">Pilih Paket</label>
              <select className="px-4 py-3 rounded-lg border-2 bg-white border-i-dark/80 focus:border-i-dark focus:outline-none">
                <option value="">-- Pilih Paket --</option>
                <option value="umroh">Paket Umroh</option>
                <option value="haji">Paket Haji</option>
                <option value="wisata">Wisata Religi</option>
              </select>
            </div>

            {/* Pesan */}
            <div className="flex flex-col text-left">
              <label className="text-lg font-semibold mb-1">Pesan</label>
              <textarea
                rows="2"
                placeholder="Tulis pesan Anda di sini..."
                className="px-4 py-3 rounded-lg border-2 bg-white border-i-dark/80 focus:border-i-dark focus:outline-none resize-none"
              ></textarea>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="mt-2 bg-i-dark text-white font-bold text-lg py-3 rounded-xl hover:bg-i-dark/80 transition-all"
            >
              Kirim
            </button>
          </form>
        </div>

        {/* Bottom Scrolling Text (Static Loop) */}
        <div className="flex whitespace-nowrap text-[12.25rem] font-extrabold leading-none text-i-dark -mb-4">
          <span>CONTACT&nbsp;US&nbsp;</span>
          <span>CONTACT&nbsp;US&nbsp;</span>
          <span>CONTACT&nbsp;US&nbsp;</span>
          <span>CONTACT&nbsp;US&nbsp;</span>
          <span>CONTACT&nbsp;US&nbsp;</span>
        </div>
      </div>

      {/* Maps */}
      <div className="w-full relative bg-i-neon-green overflow-hidden h-[48rem]">
        <div className="relative z-10 text-i-dark px-12 flex flex-col items-center">
          <h2 className="absolute left-0 top-1/2 -translate-y-1/2 -rotate-90 origin-left ml-[2.75rem] mt-[25rem] text-[12.5rem] font-extrabold">
            FIND US
          </h2>
          <div className="absoulte w-full px-[4.875rem]">
            <iframe
              className="w-full h-[48rem] border-1"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3967.06550733093!2d106.14049697587583!3d-6.121885793864781!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e418adbcdf7e995%3A0x2f202baab2481f02!2sJl.%20Empat%20Lima%20No.31%2C%20Serang%2C%20Kec.%20Serang%2C%20Kota%20Serang%2C%20Banten%2042116!5e0!3m2!1sen!2sid!4v1759913751785!5m2!1sen!2sid"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>

          <h2 className="absolute right-0 top-1/2 -translate-y-1/2 rotate-90 origin-right mr-[2.75rem] mt-[25rem] text-[12.5rem] font-extrabold">
            FIND US
          </h2>
        </div>
      </div>
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Home;
