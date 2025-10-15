import React, { useState, useEffect, useRef, useMemo } from "react";
import logo from "../assets/logos/Logo-custom-2.png";
import { useNavigate, useLocation } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [openDropdown, setOpenDropdown] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState(null);
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
    setOpenDropdown((prev) => (prev === index ? null : index));
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
    <>
      {/* Background Blur Overlay */}
      <div
        className={`fixed inset-0 transition-all duration-300 z-40 ${
          mobileMenuOpen
            ? "backdrop-blur-sm bg-black/40"
            : "pointer-events-none opacity-0"
        }`}
        onClick={() => setMobileMenuOpen(false)}
      ></div>

      <div
        className={`w-full ${color} z-50 sticky top-0 left-0 right-0 transition-colors duration-500`}
      >
        <div className="flex justify-between items-center py-2 px-6 lg:px-48">
          {/* DESKTOP MENU */}
          <div className={`hidden lg:flex items-center font-bold ${textColor}`}>
            {items.map((item, index) => (
              <div
                key={index}
                className="flex items-center whitespace-nowrap relative"
                onMouseEnter={() => handleMouseEnter(index)}
                onMouseLeave={handleMouseLeave}
              >
                <div
                  onClick={() => navigate(item.href)}
                  className={`cursor-pointer px-4 py-2 transition-all duration-200 hover:scale-105 ${hoverTextColor}`}
                >
                  {item.name}
                </div>

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

          {/* LOGO */}
          <img
            onClick={() => navigate("/home")}
            src={logo}
            alt="logo"
            className="max-w-[4rem] cursor-pointer transition-all duration-300 hover:scale-105 p-2"
          />

          {/* HAMBURGER (MOBILE) */}
          <div
            className="lg:hidden flex flex-col gap-1 cursor-pointer"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <span className="w-6 h-1 bg-white"></span>
            <span className="w-6 h-1 bg-white"></span>
            <span className="w-6 h-1 bg-white"></span>
          </div>
        </div>

        {/* MOBILE MENU */}
        {mobileMenuOpen && (
          <div
            className={`flex flex-col px-6 pb-4 font-bold ${textColor} z-50 relative`}
          >
            {items.map((item, index) => (
              <div key={index}>
                <div
                  className="py-2 cursor-pointer flex justify-between items-center"
                  onClick={() => {
                    if (item.dropdown) {
                      setMobileDropdownOpen((prev) =>
                        prev === index ? null : index
                      );
                    } else {
                      navigate(item.href);
                      setMobileMenuOpen(false);
                    }
                  }}
                >
                  {item.name}
                  {item.dropdown && (
                    <span>{mobileDropdownOpen === index ? "-" : "+"}</span>
                  )}
                </div>

                {item.dropdown && mobileDropdownOpen === index && (
                  <div className="pl-4 flex flex-col">
                    {item.dropdown.map((sub, sidx) => (
                      <div
                        key={sidx}
                        className="py-1 cursor-pointer"
                        onClick={() => {
                          navigate(sub.href);
                          setMobileMenuOpen(false);
                        }}
                      >
                        {sub.name}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Scroll Progress Bar */}
        <div className="w-full h-[4px] bg-black/10">
          <div
            className="h-[4px] bg-i-neon-green transition-all duration-300"
            style={{ width: `${scrollProgress}%` }}
          />
        </div>
      </div>
    </>
  );
};

export default Navbar;
