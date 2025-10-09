import React, { useState, useEffect, useRef, useMemo } from "react";
import logo from "../assets/logos/Logo-custom-2.png";
import { useNavigate, useLocation } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [openDropdown, setOpenDropdown] = useState(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [currentDropdownWidth, setCurrentDropdownWidth] = useState(0);
  const dropdownContentRefs = useRef([]);

  const pages = [
    {
      url: "/",
      color: "bg-i-bright-blue",
      textColor: "text-white",
      hoverTextColor: "hover:text-i-neon-green",
      hoverDropdownBg: "hover:text-white",
    },
    {
      url: "/home",
      color: "bg-i-bright-blue",
      textColor: "text-white",
      hoverTextColor: "hover:text-i-neon-green",
      hoverDropdownBg: "hover:text-white",
    },
    {
      url: "/about",
      color: "bg-i-pink",
      textColor: "text-white",
      hoverTextColor: "hover:text-i-neon-green",
      hoverDropdownBg: "hover:text-white",
    },
    {
      url: "/packages",
      color: "bg-i-yellow",
      textColor: "text-i-dark",
      hoverTextColor: "hover:text-i-pink",
      hoverDropdownBg: "hover:text-i-dark",
    },
    {
      url: "/schedule",
      color: "bg-i-yellow",
      textColor: "text-i-dark",
      hoverTextColor: "hover:text-i-pink",
      hoverDropdownBg: "hover:text-i-dark",
    },
    {
      url: "/review",
      color: "bg-i-neon-green",
      textColor: "text-i-dark",
      hoverTextColor: "hover:text-i-pink",
      hoverDropdownBg: "hover:text-i-dark",
    },
  ];

  const items = [
    { name: "About Us", href: "/about" },
    { name: "List Paket Travel", href: "/packages" },
    { name: "List Jadwal Keberangkatan", href: "/schedule" },
    {
      name: "Review",
      dropdown: [
        { name: "Gallery", href: "/review/gallery" },
        { name: "Testimony", href: "/review/testimony" },
      ],
    },
  ];

  const activePage = useMemo(() => {
    const path = location.pathname.toLowerCase();
    return pages.find((p) => path === p.url.toLowerCase()) || pages[0];
  }, [location.pathname]);

  const { color, textColor, hoverTextColor, hoverDropdownBg } = activePage;

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const scrollHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
      const progress = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
      setScrollProgress(progress);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleMouseEnter = (index) => {
    setOpenDropdown(index);
    const el = dropdownContentRefs.current[index];
    if (el) {
      const width = el.scrollWidth;
      setCurrentDropdownWidth(width + 8);
    }
  };

  const handleMouseLeave = () => {
    setOpenDropdown(null);
    setCurrentDropdownWidth(0);
  };

  return (
    <div
      className={`w-full ${color} z-50 sticky top-0 left-0 right-0 transition-colors duration-500`}
    >
      <div className="flex justify-between items-center py-2 px-48">
        {/* Left Navigation */}
        <div className={`flex items-center font-bold ${textColor}`}>
          {items.map((item, index) => (
            <div
              key={index}
              className="flex items-center whitespace-nowrap relative"
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={handleMouseLeave}
            >
              {/* Main label */}
              <div
                onClick={() => navigate(item.href)}
                className={`cursor-pointer px-4 py-2 transition-all duration-200 hover:scale-105 ${hoverTextColor}`}
              >
                {item.name}
              </div>

              {/* Dropdown */}
              {item.dropdown && (
                <div
                  style={{
                    maxWidth:
                      openDropdown === index
                        ? `${currentDropdownWidth}px`
                        : "0px",
                    opacity: openDropdown === index ? 1 : 0,
                    transition:
                      "max-width 220ms ease, opacity 180ms ease, transform 200ms ease",
                    overflow: "hidden",
                    transform:
                      openDropdown === index
                        ? "translateY(0)"
                        : "translateY(-4px)",
                  }}
                  className="flex items-center"
                >
                  <div
                    ref={(el) => (dropdownContentRefs.current[index] = el)}
                    className={`flex shadow-md ml-2 ${textColor} ${hoverDropdownBg}`}
                    style={{ whiteSpace: "nowrap" }}
                  >
                    {item.dropdown.map((subItem, subIndex) => (
                      <div
                        key={subIndex}
                        onClick={() => navigate(subItem.href)}
                        className={`px-4 py-2 cursor-pointer transition-all duration-300 hover:scale-110 ${hoverTextColor}`}
                      >
                        {subItem.name}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Logo */}
        <img
          onClick={() => navigate("/home")}
          src={logo}
          alt="logo"
          className="max-w-[4rem] cursor-pointer transition-all duration-300 hover:scale-105 p-2"
        />
      </div>

      {/* Scroll Progress Bar */}
      <div className="w-full h-[4px] bg-black/10">
        <div
          className="h-[4px] bg-i-neon-green transition-all duration-300"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>
    </div>
  );
};

export default Navbar;
