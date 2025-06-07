import { lazy } from "react";

export const Home = lazy(() => import("../pages/HomePage.jsx"));
export const AdminDashboard = lazy(() => import("../components/admin/dashboard/AdminDashboard.jsx"));
export const AboutMe = lazy(() => import("../components/aboutMe/About.jsx"))
export const Project = lazy(() => import("../components/project/Projects.jsx"))
export const Single_Project = lazy(() => import ("../components/project/single/singleProject.jsx"));
export const BioSection = lazy(() => import("../components/bio/Bio.jsx"))
export const Skill = lazy(() => import("../components/skill/SkillCard.jsx"))
export const ContactForm = lazy(() => import("../components/contact/ContactForm.jsx"))