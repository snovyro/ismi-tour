import React from "react";
import ImgLogo from "../assets/logos/Logo-custom-2.png";
import ImgInsta from "../assets/svg/instagram-svgrepo-com.svg";
import ImgYoutube from "../assets/svg/youtube-svgrepo-com.svg";
import ImgFacebook from "../assets/svg/facebook-svgrepo-com.svg";

const Footer = () => {
  return (
    <div>
      {/* Top Section */}
      <div className="w-full px-6 sm:px-12 lg:px-24 py-6 flex flex-col lg:flex-row items-center justify-center lg:justify-around bg-i-dark text-i-neon-green text-center gap-6 lg:gap-0">
        <div className="hidden lg:block"></div>

        <div className="flex flex-col justify-center items-center w-24">
          <img src={ImgLogo} alt="Logo" className="h-full" />
          <div className="w-full flex justify-center items-center gap-6 mt-6">
            <img
              src={ImgInsta}
              alt="Insta"
              className="w-8 invert brightness-0"
            />
            <img
              src={ImgYoutube}
              alt="Youtube"
              className="w-8 invert brightness-0"
            />
            <img
              src={ImgFacebook}
              alt="Facebook"
              className="w-6 invert brightness-0"
            />
          </div>
        </div>

        <div className="hidden lg:block"></div>
      </div>

      {/* Bottom Section */}
      <div className="w-full p-4 sm:p-6 px-6 sm:px-12 lg:px-48 bg-i-dark text-i-neon-green text-center text-sm sm:text-base">
        &copy; 2024 ISMI Tour. All rights reserved.
      </div>
    </div>
  );
};

export default Footer;
