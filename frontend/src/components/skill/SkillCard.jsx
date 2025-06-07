import React from "react";
import * as Io5Icon from "react-icons/io5";
import * as FaIcons from "react-icons/fa";
import * as MdIcons from "react-icons/md";
import * as SiIcons from "react-icons/si";

const iconLibraries = {
  fa: FaIcons,
  md: MdIcons,
  si: SiIcons,
  io5: Io5Icon,
};
const SkillCard = ({ icon, title, progress = 0 }) => {
  const IconComponent = iconLibraries[icon.library]?.[icon.name];
  // Arc configuration
  const radius = 28;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div
      className="
      relative
      bg-white 
      p-6 rounded-xl
      border border-gray-200 
      flex flex-col items-center
      transition-all duration-300 ease-in-out
      hover:shadow-md hover:-translate-y-1
      hover:border-[#FFB600]/30
      group
    "
    >
      {/* Progress Arc */}
      <div className="relative w-24 h-24 mb-4">
        <svg className="w-full h-full" viewBox="0 0 72 72">
          {/* Background circle */}
          <circle
            cx="36"
            cy="36"
            r={radius}
            fill="none"
            stroke="currentColor"
            strokeWidth="4"
            className="text-gray-200 "
          />
          {/* Progress circle */}
          <circle
            cx="36"
            cy="36"
            r={radius}
            fill="none"
            stroke="currentColor"
            strokeWidth="4"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            transform="rotate(-90 36 36)"
            className="
              text-[#FFB600] 
              transition-all duration-700 ease-[cubic-bezier(0.65,0,0.35,1)]
              group-hover:stroke-[5]
            "
          />
        </svg>
        {/* Center content */}
        <div
          className="
          absolute inset-0 flex flex-col items-center justify-center
          gap-1
        "
        >
          <div
            className="
            text-4xl text-[#FFB600] 
            transition-all duration-300
            group-hover:scale-110
          "
          >
            {<IconComponent /> || "★"}
          </div>
        </div>
      </div>

      {/* Text content */}
      <div className="text-center">
        <span
          className="
          text-2xl font-lato font-bold bg-gradient-to-br from-[#FFB600] to-[#906701] bg-clip-text text-transparent
          "
        >
          {progress}%
        </span>
        <h3
          className="
          font-lato font-bold text-[#959595]
          mb-2
        "
        >
          {title || "Skill Name"}
        </h3>
      </div>
    </div>
  );
};

export default SkillCard;
