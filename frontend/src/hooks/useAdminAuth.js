// src/hooks/useAdminAuth.ts
import { useMutation } from "@tanstack/react-query";
import { api } from "../lib/api";
import { useNavigate } from "react-router-dom";

export const useAdminLogin = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: ({ email, password }) => api.post("/admin/login", credentials),
    onSuccess: (data) => {
      localStorage.setItem("adminToken", data.data.token);
      navigate("/admin/dashboard");
    },
  });
};
