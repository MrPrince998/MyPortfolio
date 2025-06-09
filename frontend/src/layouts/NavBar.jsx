import React, { useEffect, useState } from "react";
import { Link as ScrollLink } from "react-scroll";
import { Link, useLocation, useNavigate } from "react-router-dom";
import AdminLoginForm from "../components/login/LoginForm";
import { loggedIn } from "../context/AuthProvider";
import { Button } from "../components/ui/Button";
import { Menu, X } from "lucide-react";

const NavBar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeNavLink, setActiveNavLink] = useState("Home");
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showLoginLink, setShowLoginLink] = useState(
    localStorage.getItem("showLoginLink") === "true" || false
  );

  const { isLoggedIn } = loggedIn();
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = loggedIn();

  // Navigation links for both desktop and mobile men
  const navLinks = [
    { title: "Home", to: "home" },
    { title: "Service", to: "service" },
    { title: "About Me", to: "about" },
    { title: "Projects", to: "projects" },
    { title: "Contact me", to: "contact" },
  ];

  // Handle login button click
  const handleLoginClick = () => {
    setShowLoginModal(true);
    setMobileMenuOpen(false); // Close mobile menu if open
  };

  const handleActiveNav = (activeTab, url) => {
    setActiveNavLink(activeTab);
    navigate(`/${url}`);
  };

  useEffect(() => {
    const handleKey = (e) => {
      if (e.shiftKey && e.key === "L") {
        setShowLoginLink(true);
        localStorage.setItem("showLoginLink", true);
      } else if (e.shiftKey && e.key === "H") {
        setShowLoginLink(false);
        localStorage.setItem("showLoginLink", false);
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  useEffect(()=> {
    if(location.pathname.toLocaleLowerCase() === "/admin/dashboard") {
      handleActiveNav("dashboard", "admin/dashboard")
    }
  },[])
  return (
    <>
      <nav className="bg-white/80 border-b border-gray-200 sticky top-0 z-50 transition-colors duration-300 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            {/* Logo/Name */}
            <div className="flex-shrink-0 flex items-center">
              <Link
                to="/home"
                onClick={() => handleActiveNav("Home", "home")}
                className="text-xl font-bold bg-gradient-to-r from-[#815C00] via-[#FFB600] to-[#C19600] bg-clip-text text-transparent hover:opacity-80 transition-opacity duration-300"
              >
                Bharat Rana
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8">
              <ul className="flex space-x-4">
                {navLinks.map((link, i) => (
                  <li key={i} className="m-0">
                    <ScrollLink
                      to={link.to}
                      spy={true}
                      offset={-100}
                      duration={500}
                      onSetActive={() => setActiveNavLink(link.title)}
                      // onClick={location.path === "/admin/dashboard" ? () => handleActiveNav(link.title, link.to) : " "}
                      className={`px-3 py-2 font-medium transition-colors duration-300 relative
                        after:content-[''] after:absolute after:bottom-0 after:left-0
                        after:w-0 after:h-0.5 after:bg-[#FFB600] after:transition-all after:duration-300
                        hover:after:w-full ${
                          activeNavLink === link.title
                            ? "text-[#FFB600] after:w-full"
                            : "text-gray-700 hover:text-[#FFB600]"
                        }`}
                    >
                      {link.title}
                    </ScrollLink>
                  </li>
                ))}
                {isLoggedIn && (
                  <li>
                    <Link
                      to={"/admin/dashboard"}
                      onClick={() =>
                        handleActiveNav("dashboard", "admin/dashboard")
                      }
                      className={`px-3 py-2 font-medium transition-colors duration-300 relative
                        after:content-[''] after:absolute after:bottom-0 after:left-0
                        after:w-0 after:h-0.5 after:bg-[#FFB600] after:transition-all after:duration-300
                        hover:after:w-full ${
                          activeNavLink === "dashboard"
                            ? "text-[#FFB600] after:w-full"
                            : "text-gray-700 hover:text-[#FFB600]"
                        }`}
                    >
                      Dashboard
                    </Link>
                  </li>
                )}
              </ul>
              {showLoginLink &&
                (!isLoggedIn ? (
                  <Button onClick={handleLoginClick}>Login</Button>
                ) : (
                  <Button onClick={logout}>Logout</Button>
                ))}
            </div>

            {/* Mobile menu button */}
            <div className="lg:hidden flex items-center space-x-2">
              <Button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                size="icon"
              >
                {mobileMenuOpen ? <X /> : <Menu />}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="lg:hidden">
            <ul className="pt-2 pb-3 space-y-2 bg-white/80 transition-colors duration-300 backdrop-blur-sm absolute w-full top-[65px] shadow-md">
              {navLinks.map((link, i) => (
                <li key={i}>
                  <ScrollLink
                    to={link.to}
                    spy={true}
                    offset={-90}
                    duration={500}
                    onSetActive={() => setActiveNavLink(link.title)}
                    className={`block px-4 py-3 font-medium transition-colors duration-300 ${
                      activeNavLink === link.title
                        ? "text-[#FFB600] bg-gray-100"
                        : "text-gray-900 hover:text-[#FFB600] hover:bg-gray-100"
                    }`}
                  >
                    {link.title}
                  </ScrollLink>
                </li>
              ))}
              {isLoggedIn && (
                <li>
                  <Link
                    to={"/admin/dashboard"}
                    onClick={() =>
                      handleActiveNav("dashboard", "admin/dashboard")
                    }
                    className={`px-3 py-2 font-medium transition-colors duration-300 relative
                        after:content-[''] after:absolute after:bottom-0 after:left-0
                        after:w-0 after:h-0.5 after:bg-[#FFB600] after:transition-all after:duration-300
                        hover:after:w-full ${
                          activeNavLink === "dashboard"
                            ? "text-[#FFB600] after:w-full"
                            : "text-gray-700 hover:text-[#FFB600]"
                        }`}
                  >
                    Dashboard
                  </Link>
                </li>
              )}
              {showLoginLink &&
                (!isLoggedIn ? (
                  <Button
                    onClick={handleLoginClick}
                    className="px-4 py-2 m-3 mt-5"
                  >Login</Button>
                ) : (
                  <Button
                    onClick={logout}
                    className="px-4 py-2 ml-3 mt-5"
                  >Logout</Button>
                ))}
            </ul>
          </div>
        )}
      </nav>

      {/* Login Modal */}
      {showLoginModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <AdminLoginForm
            onClose={() => setShowLoginModal(false)}
            onLoginSuccess={() => {
              setShowLoginModal(false);
              navigate("/dashboard"); // Or your desired post-login route
            }}
          />
        </div>
      )}
    </>
  );
};

export default NavBar;
