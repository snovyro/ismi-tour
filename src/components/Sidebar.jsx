import React from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logos/Logo-custom-2.png";
import Button from "../components/Button";
import Cookies from "js-cookie";

const Sidebar = () => {
  const navigate = useNavigate();

  const handleLogout = (e) => {
    e?.preventDefault?.();
    Cookies.remove("token");
    window.location.reload();
  };

  return (
    <div className="fixed left-0 top-0 h-full w-64 border-r border-black flex flex-col justify-between p-6 bg-jungle-green">
      <div>
        <div className="w-full h-fit justify-center items-center flex mb-10">
          <img className="h-24" src={logo} alt="Logo" />
        </div>
        <nav className="flex flex-col gap-4 text-md text-white">
          <p className="font-bold text-xl">ISMI Dashboard</p>
          <button
            onClick={() => navigate("/dashboard/packages")}
            className="text-left hover:cursor-pointer hover:text-jungle-green hover:scale-105 transition-all duration-300"
          >
            Manage Packages
          </button>
          <button
            onClick={() => navigate("/dashboard/schedules")}
            className="text-left hover:cursor-pointer hover:text-jungle-green hover:scale-105 transition-all duration-300"
          >
            Manage Schedules
          </button>
          <button
            onClick={() => navigate("/dashboard/gallery")}
            className="text-left hover:cursor-pointer hover:text-jungle-green hover:scale-105 transition-all duration-300"
          >
            Photos Gallery
          </button>
          <button
            onClick={() => navigate("/dashboard/testimony")}
            className="text-left hover:cursor-pointer hover:text-jungle-green hover:scale-105 transition-all duration-300"
          >
            Testimony Gallery
          </button>
        </nav>
      </div>

      <Button
        text="Logout"
        bgColor="jungle-green"
        bgColorHover="c-black"
        textColor="white"
        onClick={handleLogout}
      />
    </div>
  );
};

export default Sidebar;
