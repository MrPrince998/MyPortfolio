import { lazy } from "react";

export const Home = lazy(() => import("../pages/HomePage.jsx"));
export const AdminDashboard = lazy(() => import("../components/admin/dashboard/AdminDashboard.jsx"));
export const Single_Project = lazy(() => import ("../components/project/single/singleProject.jsx"));