import React from "react";
import userImg from "../../assets/heroImage/userImg.png";
import { Button } from "../ui/Button";

const About = () => {
  return (
    <section id="about" className="font-lato px-4 md:px-0">
      <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16">
        <div className="order-2 md:order-1 md:w-1/2">
          <h1 className="font-bold text-2xl text-[#575757] text-center md:text-left mb-6">
            About me
          </h1>
          <p className="text-[#828282] mb-8 text-center md:text-left">
            I'm a passionate UX/UI and web developer focused on crafting
            intuitive, responsive, and visually engaging digital experiences. I
            combine design thinking with clean code to bring ideas to life on
            the web.
          </p>
          <div className="text-center md:text-left">
            <Button>Resume</Button>
          </div>
        </div>

        <div className="order-1 md:order-2 relative w-64 h-64 md:w-80 md:h-80 bg-[#fdc435] rounded-full mx-auto">
          <img
            src={userImg}
            alt="user"
            className="absolute bottom-0 right-0 w-full h-auto"
          />
        </div>
      </div>
    </section>
  );
};

export default About;
