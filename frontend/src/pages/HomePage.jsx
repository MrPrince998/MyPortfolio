import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import HeroImage from "../assets/heroImage/header.jpg";
import mdheroImage from "../assets/heroImage/mdHeader.svg";
import { FaFacebook, FaInstagram, FaTiktok, FaWhatsapp } from "react-icons/fa";
import ServiceCard from "../components/service/ServiceCard";
import { CommandLineIcon } from "@heroicons/react/24/outline";
import { LayoutDashboard, Settings } from "lucide-react";
import userImg from "../assets/heroImage/userImg.png";
import SkillCard from "../components/skill/SkillCard";
import ContactForm from "../components/contact/ContactForm";
import Typewriter from "typewriter-effect";
import { Link as ScrollLink } from "react-scroll";
import Bio from "../components/bio/Bio";
import Projects from "../components/project/Projects";
import { useFetch } from "../query/useFetch";
import { href } from "react-router-dom";
import { Button } from "../components/ui/Button";

const HomePage = () => {
  const socialMediaLinks = [
    {
      title: "instagram",
      icon: <FaInstagram />,
      color: "hover:text-pink-600",
      href: "https://www.instagram.com/prince98021/",
    },
    {
      title: "facebook",
      icon: <FaFacebook />,
      color: "hover:text-blue-600",
      href: "https://www.facebook.com/prince.rana.magar.132443",
    },
    {
      title: "whatsapp",
      icon: <FaWhatsapp />,
      color: "hover:text-green-500",
      href: "",
    },
    {
      title: "tiktok",
      icon: <FaTiktok />,
      color:
        "hover:text-[#FE2C55] hover:drop-shadow-[0_0_8px_rgba(37,244,238,0.8)]",
    },
  ];

  const serviceDetails = [
    {
      title: "Web Development",
      description:
        "From backend systems to polished frontends, I build scalable, high-performance web applications tailored to your goals.",
      icon: <CommandLineIcon className="w-20 h-20" />,
    },
    {
      title: "UI/UX Design",
      description:
        "I design clean, intuitive interfaces that enhance user experience and reflect your brand's identity.",
      icon: <LayoutDashboard className="w-20 h-20" />,
    },
    {
      title: "Custom CMS & Dashboards",
      description:
        "Need control over your content or data? I create user-friendly admin panels and dashboards built just for you.",
      icon: <Settings className="w-20 h-20" />,
    },
  ];

  // const skillDetails = [
  //   { icon: <FaFigma />, title: "Figma", progress: 100 },
  //   { icon: <FaNodeJs />, title: "Node Js", progress: 20 },
  //   { icon: <IoLogoJavascript />, title: "JavaScript", progress: 90 },
  //   { icon: <FaReact />, title: "React Js", progress: 85 },
  //   { icon: <DiIllustrator />, title: "Adobe Illustrator", progress: 100 },
  // ];

  const { data: skillDetails } = useFetch({
    query: "/api/skills",
    key: ["skills"],
  });

  // Create refs for each section
  const heroRef = useRef(null);
  const servicesRef = useRef(null);
  const aboutRef = useRef(null);
  const projectsRef = useRef(null);
  const testimonialRef = useRef(null);
  const contactRef = useRef(null);

  // Check if sections are in view
  const isHeroInView = useInView(heroRef, { once: true, amount: 0.1 });
  const isServicesInView = useInView(servicesRef, { once: true, amount: 0.1 });
  const isAboutInView = useInView(aboutRef, { once: true, amount: 0.1 });
  const isProjectsInView = useInView(projectsRef, { once: true, amount: 0.1 });
  const isContactInView = useInView(contactRef, { once: true, amount: 0.1 });

  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  return (
    <main className="flex flex-col gap-y-16 md:gap-y-25 max-w-7xl mx-auto">
      {/* Hero Section */}
      <motion.header
        ref={heroRef}
        initial="hidden"
        id="home"
        animate={isHeroInView ? "visible" : "hidden"}
        variants={staggerContainer}
        className="grid gap-y-4 md:grid-cols-2 md:items-center md:gap-x-8"
      >
        <motion.div variants={fadeInUp} className="md:hidden">
          <img src={HeroImage} alt="user" className="w-full h-auto" />
        </motion.div>

        <motion.div
          variants={fadeInUp}
          className="py-3 text-center md:text-left"
        >
          <p className="text-[#313131] font-semibold font-lato">Hi I am</p>
          <p className="text-[#747474] font-bold font-lato text-xl my-2">
            Bharat Rana
          </p>

          <motion.h1
            className="text-4xl md:text-5xl font-black font-lato bg-gradient-to-r from-[#815C00] via-[#FFB600] to-[#C19600] bg-clip-text text-transparent pb-1 leading-tight"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="inline-block align-middle">
              <Typewriter
                options={{
                  strings: ["Web Designer", "Web Developer"],
                  autoStart: true,
                  loop: true,
                  delay: 100,
                  deleteSpeed: 50,
                  cursor: "|",
                  cursorClassName: "text-[#FFB600]",
                }}
              />
            </div>
          </motion.h1>

          <motion.div variants={fadeInUp} className="space-y-4 my-6">
            <div className="flex space-x-6 justify-center md:justify-start">
              {socialMediaLinks.map((item, i) => (
                <motion.div
                  key={i}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="border border-gray-300 w-10 h-10 rounded-full flex justify-center items-center"
                >
                  <motion.a
                    href={item?.href}
                    target="blank"
                    whileHover={{ y: -3 }}
                    className={`text-[#484848] text-xl transition-colors duration-300 ${item.color}`}
                    aria-label={item.title}
                  >
                    {item.icon}
                  </motion.a>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            variants={fadeInUp}
            className="flex gap-x-5 justify-center md:justify-start"
          >
            <ScrollLink to={"contact"} spy={true} offset={-70} duration={500}>
              <Button>Hire Me! </Button>
            </ScrollLink>
            <Button variant="outline" className="py-2 px-8">
              Download CV
            </Button>
          </motion.div>
          <motion.div
            variants={fadeInUp}
            className="hidden md:grid grid-cols-3 p-6 gap-x-2 bg-[#E1E1E1] mt-20 rounded-lg"
          >
            {/* ... (stats content) */}
            <Bio />
          </motion.div>
        </motion.div>

        <motion.div variants={fadeInUp} className="hidden md:block">
          <img src={mdheroImage} alt="user" className="w-full h-auto" />
        </motion.div>

        <motion.div
          variants={fadeInUp}
          className="grid grid-cols-3 p-6 gap-x-2 bg-[#E1E1E1] md:hidden "
        >
          {/* ... (stats content) */}
          <Bio />
        </motion.div>
      </motion.header>

      {/* Services Section */}
      <motion.section
        ref={servicesRef}
        initial="hidden"
        animate={isServicesInView ? "visible" : "hidden"}
        variants={staggerContainer}
        id="service"
        className="text-center font-lato px-4 md:px-0"
      >
        <motion.h1
          variants={fadeInUp}
          className="text-[#575757] font-bold text-2xl md:text-3xl"
        >
          Services
        </motion.h1>
        <motion.p
          variants={fadeInUp}
          className="text-[#707070] my-3 max-w-2xl mx-auto"
        >
          Custom solutions, delivered with quality and care.
        </motion.p>
        <motion.div
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 my-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {serviceDetails.map((item, i) => (
            <motion.div
              key={i}
              variants={fadeInUp}
              whileHover={{ y: -20 }}
              transition={{ type: "tween", duration: 0.2 }}
            >
              <ServiceCard
                icon={item.icon}
                title={item.title}
                description={item.description}
              />
            </motion.div>
          ))}
        </motion.div>
      </motion.section>

      {/* About Me Section */}
      <motion.section
        ref={aboutRef}
        initial="hidden"
        animate={isAboutInView ? "visible" : "hidden"}
        variants={staggerContainer}
        id="about"
        className="font-lato px-4 md:px-0"
      >
        <motion.div
          variants={fadeInUp}
          className="flex flex-col md:flex-row items-center gap-8 md:gap-16"
        >
          <section id="about" className="font-lato px-4 md:px-0">
            <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16">
              <div className="order-2 md:order-1 md:w-1/2">
                <h1 className="font-bold text-2xl text-[#575757] text-center md:text-left mb-6">
                  About me
                </h1>
                <p className="text-[#828282] mb-8 text-center md:text-left">
                  I'm a passionate UX/UI and web developer focused on crafting
                  intuitive, responsive, and visually engaging digital
                  experiences. I combine design thinking with clean code to
                  bring ideas to life on the web.
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
        </motion.div>

        <motion.div
          variants={staggerContainer}
          className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-16"
        >
          {skillDetails?.map((item) => (
            <motion.div key={item._id} variants={fadeInUp}>
              <SkillCard
                icon={item.icon}
                title={item.title}
                progress={item.progress}
              />
            </motion.div>
          ))}
        </motion.div>
      </motion.section>

      {/* Projects Section */}
      <motion.section
        ref={projectsRef}
        initial="hidden"
        animate={isProjectsInView ? "visible" : "hidden"}
        variants={staggerContainer}
        id="projects"
        className="font-lato px-4 md:px-0"
      >
        <motion.h1
          variants={fadeInUp}
          className="text-2xl md:text-3xl font-semibold text-center text-[#575757] mb-8"
        >
          Latest Projects
        </motion.h1>
        <motion.div variants={staggerContainer}>
          <motion.div
            variants={fadeInUp}
            whileHover={{ y: -10 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Projects />
          </motion.div>
        </motion.div>
      </motion.section>

      {/* Testimonial Section
      <motion.section
        ref={testimonialRef}
        initial="hidden"
        animate={isTestimonialInView ? "visible" : "hidden"}
        variants={fadeInUp}
        className="font-lato px-4 md:px-0"
      >
        <h1 className="font-semibold text-2xl md:text-3xl text-[#575757] text-center my-8">
          Latest Testimonial
        </h1>
        <div className="max-w-4xl mx-auto">
          <TestimonailCard />
        </div>
      </motion.section> */}

      {/* Contact Section */}
      <motion.section
        ref={contactRef}
        initial="hidden"
        animate={isContactInView ? "visible" : "hidden"}
        variants={fadeInUp}
        id="contact"
        className="grid gap-y-8 py-5 px-6 text-center font-lato bg-[#EBEBEB] rounded-lg mb-16 hover:shadow-inner transition-shadow duration-300"
      >
        <section
          id="contact"
          className="grid gap-y-8 py-8 px-6 text-center font-lato bg-[#EBEBEB] rounded-lg mb-16"
        >
          <div className="flex flex-col gap-y-4">
            <h1 className="font-bold text-2xl md:text-3xl text-[#575757]">
              Contact me
            </h1>
            <p className="font-medium text-[#707070] text-sm md:text-base">
              Cultivating Connections: Reach Out and Connect with Me
            </p>
          </div>
          <ContactForm />
        </section>
      </motion.section>
    </main>
  );
};

export default HomePage;
