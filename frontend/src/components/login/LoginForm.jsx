// src/components/admin/AdminLoginForm.jsx
import React from "react";
import { XMarkIcon, ShieldCheckIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { loggedIn } from "../../context/AuthProvider";

const AdminLoginForm = ({ onClose }) => {
  const navigate = useNavigate();
  const {login} = loggedIn();
  
  const apiUrl = import.meta.env.VITE_API_URL;

  const loginMutation = useMutation({
    mutationFn: async (data) => {
      const response = await axios.post(`${apiUrl}/api/admin/login`, data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response.data;
    },
    onSuccess: (data) => {
      localStorage.setItem("adminToken", data.token);
      login()
      if (onClose) {
        onClose();
      } else {
        navigate("/admin/dashboard");
      }
    },
    onError: (error) => {
      return error.response?.data?.message || "Login failed";
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = {
      email: formData.get("email"),
      password: formData.get("password"),
    };
    loginMutation.mutate(data);
  };

  return (
    <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-auto p-6 relative border-2 border-[#FFB600]">
      {onClose && (
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors"
          aria-label="Close login"
        >
          <XMarkIcon className="h-6 w-6" />
        </button>
      )}

      <div className="text-center mb-6">
        <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-[#FFF5D9] mb-3">
          <ShieldCheckIcon className="h-6 w-6 text-[#815C00]" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800">Admin Portal</h2>
        <p className="text-gray-600 mt-1">
          Restricted access to authorized personnel only
        </p>
      </div>

      {loginMutation.isError && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md text-sm flex items-start">
          <ShieldCheckIcon className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
          <span>{loginMutation.error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="admin-email"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Admin Email
          </label>
          <input
            type="email"
            id="admin-email"
            name="email"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FFB600]"
            placeholder="admin@yourdomain.com"
          />
        </div>

        <div>
          <label
            htmlFor="admin-password"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Password
          </label>
          <input
            type="password"
            id="admin-password"
            name="password"
            required
            minLength={8}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FFB600]"
            placeholder="••••••••"
          />
        </div>

        <div className="pt-2">
          <button
            type="submit"
            disabled={loginMutation.isPending}
            className={`w-full py-2.5 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#815C00] hover:bg-[#6A4D00] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FFB600] transition-colors ${
              loginMutation.isPending ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            {loginMutation.isPending ? (
              <span className="flex items-center justify-center">
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Authenticating...
              </span>
            ) : (
              "Access Admin Dashboard"
            )}
          </button>
        </div>
      </form>

      <div className="mt-6 pt-4 border-t border-gray-200">
        <p className="text-xs text-gray-500 text-center">
          Unauthorized access to this system is prohibited and may be subject to
          legal action.
        </p>
      </div>
    </div>
  );
};

export default AdminLoginForm;
