import React from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logos/Logo-custom-2.png";
import Button from "../components/Button";

const Sidebar = () => {
  const navigate = useNavigate();

  return (
    <div className="h-screen w-64 border-r border-black flex flex-col justify-between p-6 bg-i-bright-blue">
      <div>
        <div className="w-full h-fit justify-center items-center flex mb-10">
          <img className="h-24" src={logo} alt="Logo" />
        </div>
        <nav className="flex flex-col gap-4 text-md text-white ">
          <p className="font-bold text-xl">ISMI Dashboard</p>
          <button
            onClick={() => navigate("/dashboard/packages")}
            className="text-left hover:underline"
          >
            Manage Packages
          </button>
          <button
            onClick={() => navigate("/dashboard/schedules")}
            className="text-left hover:underline"
          >
            Manage Schedules
          </button>
          <button
            onClick={() => navigate("/dashboard/photos")}
            className="text-left hover:underline"
          >
            Photos Gallery
          </button>
          <button
            onClick={() => navigate("/dashboard/testimony")}
            className="text-left hover:underline"
          >
            Testimony Gallery
          </button>
        </nav>
      </div>

      <Button
        text="Logout"
        bgColor="i-pink"
        bgColorHover="i-dark"
        textColor="white"
        onClick={() => navigate("/login")}
      />
    </div>
  );
};

export default Sidebar;
