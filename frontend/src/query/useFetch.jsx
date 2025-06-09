import { queryClient } from "@/main";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";

const url = import.meta.env.VITE_API_URL;

export const useFetch = ({ query, key, enabled }) => {
  return useQuery({
    queryKey: key,
    queryFn: async () => {
      const res = await axios.get(`${url}${query}`);
      return res.data;
    },
    enabled: enabled,
  });
};

const token = localStorage.getItem("adminToken");
export const post = () => {
  return useMutation({
    mutationFn: async ({ query, data }) => {
      const response = await axios.post(`${url}${query}`, data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    },
  });
};

export const postProject = () => {
  try {
    mutate(
      { query: "/api/projects", data: formData },
      {
        onSuccess: () => {
          console.log("Mutation succeeded");
          resetForm();
          queryClient.invalidateQueries(["projects"]); // Changed to array
          setOpen(false);
        },
        onError: (error) => {
          console.error("Mutation failed", error);
        },
      }
    );
  } catch (err) {
    console.error("Caught error calling mutate:", err);
  }
};

export const deleteData = () => {
  return useMutation({
    mutationFn: async ({ query, key }) => {
      const response = await axios.delete(`${url}${query}`, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      // Ensure the key is an array for invalidateQueries
      queryClient.invalidateQueries(Array.isArray(key) ? key : [key]);
      return response.data;
    },
  });
};

export const updateData = () => {
  return useMutation({
    mutationFn: async ({ query, data }) => {
      const response = await axios.put(`${url}${query}`, data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response.data;
    },
  });
};

export const useFetchById = (query, key) => {
  return useQuery({
    queryKey: [key],
    queryFn: async () => {
      const { data } = await axios.get(`${url}${query}`);
      return data;
    },
    enabled: !!query,
  });
};
