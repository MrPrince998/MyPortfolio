import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import NavBar from "./layouts/NavBar";
import Footer from "./layouts/Footer";

import { Suspense } from "react";
import Error404 from "./components/common/Error.jsx";
import { GoldParticleLoader } from "./components/common/loadings/GoldParticleLoader.jsx";
import AdminRoute from "./components/admin/AdminRoute.jsx";
import { Home, AdminDashboard, Single_Project } from "./routes/routes.js";
import ScrollToTop from "./components/common/GoToTop";
function App() {
  return (
    <div className="app-container">
      <NavBar />
      <ScrollToTop />
      <main className="content-area">
        <Suspense
          fallback={
            <div className="suspense-fallback-container">
              <GoldParticleLoader />
            </div>
          }
        >
          <Routes>
            {/* public route */}
            <Route path="/" element={<Navigate to="/home" />} />
            <Route path="/home" element={<Home />} />
            <Route path="/project/:id" element={<Single_Project />} />
            {/* admin route */}
            <Route
              path="/admin/dashboard"
              element={
                <AdminRoute>
                  <AdminDashboard />
                </AdminRoute>
              }
            />

            <Route path="*" element={<Error404 />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}

export default App;
