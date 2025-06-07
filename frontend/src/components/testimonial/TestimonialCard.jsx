import React from "react";
import { StarIcon } from "@heroicons/react/24/solid"; // Requires @heroicons/react package

const TestimonialCard = ({ testimonialData }) => {
  const {
    message = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae aliquid culpa et velit.",
    img,
    rating = 5,
    name = "John Doe",
    workAt = "Company Name",
  } = testimonialData || {};

  // Render star ratings
  const renderStars = () => {
    return Array.from({ length: 5 }).map((_, i) => (
      <StarIcon
        key={i}
        className={`w-5 h-5 ${
          i < rating ? "text-[#FFB600]" : "text-gray-300 "
        }`}
      />
    ));
  };

  return (
    <div
      className="
      bg-white
      border border-gray-200 
      rounded-xl p-6
      shadow-sm hover:shadow-md
      transition-all duration-300 ease-in-out
      hover:border-[#FFB600]/30
      group
    "
    >
      {/* Testimonial Text */}
      <p
        className="
        text-gray-600
        italic mb-6
        before:content-['\'] before:text-4xl before:text-gray-300 before:mr-1
        after:content-['\'] after:text-4xl after:text-gray-300 after:ml-1
        transition-colors duration-300
        group-hover:text-gray-800 
      "
      >
        {message}
      </p>

      {/* Author Info */}
      <div className="flex items-start gap-4">
        {/* Avatar */}
        <div
          className="
          w-12 h-12 rounded-full
          bg-gray-100
          flex items-center justify-center
          overflow-hidden
          border-2 border-gray-200
          transition-all duration-300
          group-hover:border-[#FFB600] 
        "
        >
          {img || (
            <span className="text-xl text-gray-400 ">{name.charAt(0)}</span>
          )}
        </div>

        {/* Author Details */}
        <div>
          {/* Rating */}
          <div className="flex">{renderStars()}</div>
          <h3
            className="
            font-medium text-gray-900 
            transition-colors duration-300
            group-hover:text-[#FFB600] 
          "
          >
            {name}
          </h3>
          <p className="text-sm text-gray-500">{workAt}</p>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;
