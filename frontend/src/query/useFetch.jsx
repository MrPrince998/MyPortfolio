import { queryClient } from "@/main";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";

const url = import.meta.env.VITE_API_URL;

export const useFetch = ({ query, key }) => {
  return useQuery({
    queryKey: [key],
    queryFn: async () => {
      const res = await axios.get(`${url}${query}`);
      return res.data;
    },
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
  const mutate = useMutation(async ({ query, data }) => {
    console.log(data);
    // Use axios for FormData POST
    console.log(`${url}${query}`);
    const response = await axios.post(`${url}${query}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
        // Do NOT set Content-Type for FormData, let the browser set it
      },
    });
    return response.data;
  });
  return mutate;
};

export const deleteData = () => {
  return useMutation({
    mutationFn: async ({ query, key }) => {
      const response = await axios.delete(`${url}${query}`, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      queryClient.invalidateQueries(`${key}`);
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
