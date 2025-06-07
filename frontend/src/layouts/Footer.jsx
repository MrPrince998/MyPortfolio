import { EnvelopeIcon } from "@heroicons/react/24/outline";
import React from "react";
import {
  FaFacebook,
  FaInstagram,
  FaPhoneAlt,
  FaWhatsapp,
} from "react-icons/fa";
import { motion } from "framer-motion";
import { AiFillTikTok } from "react-icons/ai";
import { Link as ScrollLink } from "react-scroll";

const Footer = () => {
  const navLinks = [
    { title: "Home", to: "home" },
    { title: "Service", to: "service" },
    { title: "About Me", to: "about" },
    { title: "Projects", to: "projects" },
    { title: "Contact me", to: "contact" },
  ];

  const socialMediaLinks = [
    { title: "instagram", icon: <FaInstagram />, color: "hover:text-pink-600" },
    { title: "facebook", icon: <FaFacebook />, color: "hover:text-blue-600" },
    { title: "whatsapp", icon: <FaWhatsapp />, color: "hover:text-green-500" },
    {
      title: "tiktok",
      icon: <AiFillTikTok />,
      color:
        "hover:text-[#FE2C55] hover:drop-shadow-[0_0_8px_rgba(37,244,238,0.8)]",
    },
  ];

  const contactInfo = [
    {
      icon: <EnvelopeIcon className="h-5 w-5" />,
      text: "peincerana234@gmail.com",
    },
    { icon: <FaPhoneAlt className="h-5 w-5" />, text: "+977 9804435851" },
  ];

  return (
    <footer
      className=" bg-[#E1E1E1]
      transition-colors duration-300 text-center 
    "
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 grid justify-center">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 max-w-[654px]">
          {/* Brand Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-4"
          >
            <ScrollLink
              to="home"
              className="
                text-2xl font-bold
                bg-gradient-to-r from-[#815C00] via-[#FFB600] to-[#C19600] bg-clip-text text-transparent
                hover:drop-shadow-lg
                transition-all duration-500
                inline-block my-6
              "
            >
              Bharat Rana
            </ScrollLink>
          </motion.div>

          {/* Navigation Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="space-y-4 my-2"
          >
            <ul className="flex space-x-6 justify-center flex-wrap">
              {navLinks.map((item, i) => (
                <motion.li
                  key={i}
                  whileHover={{ y: -5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <ScrollLink
                    to={item.to}
                    className="
                    text-[#494949]
                    font-medium
                      hover:text-[#FFB600] 
                      transition-colors duration-300
                      flex items-center cursor-pointer
                    "
                  >
                    {item.title}
                  </ScrollLink>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Contact & Social */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-4 my-4"
          >
            {/* Social Media */}
            <div className="flex space-x-6 justify-center">
              {socialMediaLinks.map((item, i) => (
                <motion.a
                  key={i}
                  href="#"
                  whileHover={{ y: -3, scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className={`
                    text-[#484848]
                    text-2xl 
                    transition-colors duration-300
                    ${item.color}
                  `}
                  aria-label={item.title}
                >
                  <div className="border border-gray-400 w-10 h-10 rounded-full flex justify-center items-center">
                    {item.icon}
                  </div>
                </motion.a>
              ))}
            </div>

            {/* Contact Info */}
            <div className="space-y-3 mt-4 grid grid-cols-1 md:grid-cols-2">
              {contactInfo.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-3 justify-center hover:scale-105 transition-all duration-300"
                >
                  <div
                    className="
                    p-2 rounded-full
                    bg-gray-100 
                    text-[#494949] 
                    transition-colors duration-300 hover:bg-gray-300
                  "
                  >
                    {item.icon}
                  </div>
                  <p
                    className="
                    transition-colors duration-300
                  "
                  >
                    {item.text}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
      {/* Copyright */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="
            border-t 
            py-4
            text-center 
            transition-colors duration-300
          "
      >
        <p>
          &copy; {new Date().getFullYear()} Designed by{" "}
          <b
            className="
              text-[#FFB600]
              transition-colors duration-300
            "
          >
            Bharat Rana
          </b>{" "}
          - UI/UX Designer
        </p>
      </motion.div>
    </footer>
  );
};

export default Footer;
