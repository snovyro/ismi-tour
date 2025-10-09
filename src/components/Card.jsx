import React from "react";

const Card = (props) => {
  const { title, description, tColor, dColor } = props;
  return (
    <div className="bg-white/15 border border-white/10 rounded-2xl p-8 text-left backdrop-blur-sm hover:bg-white/25 transition-all duration-300">
      <h3 className={`text-2xl font-extrabold mb-4 text-${tColor}`}>{title}</h3>
      <p className={`text-base leading-relaxed text-${dColor}/90`}>
        {description}
      </p>
    </div>
  );
};

export default Card;
