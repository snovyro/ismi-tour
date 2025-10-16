import React from "react";

const Button = (props) => {
  const {
    bgColor = "i-yellow",
    bgColorHover = "i-dark",
    textColor = "i-dark",
    text,
    width,
    onClick,
  } = props;

  return (
    <div
      onClick={onClick}
      style={{ width: width ? `${width}rem` : "100%" }}
      className={`
        relative overflow-hidden 
        px-8 py-4 cursor-pointer 
        bg-${bgColor}
        transition-transform duration-300 hover:scale-105
        group text-center
        text-${textColor}
        
      `}
    >
      <div
        className={`
          absolute top-0 left-0 h-full w-0 
          bg-${bgColorHover} 
          transition-all duration-500 ease-in-out 
          group-hover:w-full
        `}
      ></div>

      <div className={`relative z-10 text-${textColor} font-semibold`}>
        {text}
      </div>
    </div>
  );
};

export default Button;
