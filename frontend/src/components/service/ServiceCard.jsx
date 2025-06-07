import React from "react";

const ServiceCard = ({ icon, description, title }) => {
  return (
    <div className="bg-[#7F7F7F] font-lato rounded-lg p-6 h-full cursor-pointer group">
      <div className="flex flex-col gap-y-3 items-center">
        <div className="text-gray-200/30 group-hover:text-[#FEB600] transition-color duration-300">{icon}</div>
        <h3 className="text-[#feb600] font-bold text-2xl">{title}</h3>
        <p className="text-white font-medium">{description}</p>
      </div>
    </div>
  );
};

export default ServiceCard;
