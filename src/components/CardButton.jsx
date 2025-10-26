import React from "react";
import Button from "./Button";

const CardButton = (props) => {
  const { title, description, tColor, dColor, imageSrc } = props;
  return (
    <div className="w-100 h-fit bg-white border border-white/10 p-8 text-left backdrop-blur-sm hover:bg-white/75 transition-all duration-300">
      <img src={imageSrc} alt="Icon" className="w-full h-full mb-4" />
      <h3 className={`text-2xl font-extrabold mb-4 text-${tColor}`}>{title}</h3>
      <p className={`mb-4 text-base leading-relaxed text-${dColor}/90`}>
        {description}
      </p>
      <Button
        text="Learn More"
        bgColor="jungle-green"
        textColor="white"
        bgColorHover="c-black"
      />
    </div>
  );
};

export default CardButton;
