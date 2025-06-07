// src/components/Error404.jsx
import { Link } from "react-router-dom";
import { FaceFrownIcon } from "@heroicons/react/24/outline";

const Error404 = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFF5D9] to-white flex flex-col items-center justify-center p-6 text-center">
      <div className="max-w-md mx-auto">
        <FaceFrownIcon className="h-20 w-20 text-[#815C00] mx-auto mb-6" />
        <h1 className="text-5xl font-bold text-[#815C00] mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Page Not Found
        </h2>
        <p className="text-gray-600 mb-8">
          Oops! The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/home"
            className="px-6 py-3 bg-[#FFB600] hover:bg-[#E6A400] text-white font-medium rounded-md shadow-md transition-colors duration-300"
          >
            Return Home
          </Link>
        </div>
      </div>
      <div className="mt-12 text-sm text-gray-500">
        <p>Error code: 404 | {new Date().toLocaleString()}</p>
      </div>
    </div>
  );
};

export default Error404;
