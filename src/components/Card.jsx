import React from "react";

const Card = ({ title, description, tColor, dColor, bgColor }) => {
  return (
    <div
      className={`bg-${bgColor}/15 border border-${bgColor}/10 rounded-2xl p-8 text-left backdrop-blur-sm hover:bg-${bgColor}/25 transition-all duration-300`}
    >
      <h3 className={`text-2xl font-bold mb-4 text-${tColor}`}>{title}</h3>
      <p className={`text-base leading-relaxed text-${dColor}`}>
        {description}
      </p>
    </div>
  );
};

export default Card;
