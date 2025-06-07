import clsx from "clsx";
import React from "react";
import { IoArrowBackCircle } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const BackButton = ({className, ...props}) => {
  const navigate = useNavigate();
  return (
    <div
      className={clsx(`absolute left-[-160px] text-[#FFB600] hover:text-[#ffb700b1] ${className} ${props}`)}
      onClick={() => navigate(-1)}
    >
      <IoArrowBackCircle size={40} />
    </div>
  );
};

export default BackButton;
