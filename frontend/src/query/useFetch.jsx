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

export const post = () => {
  return useMutation({
    mutationFn: async ({ query, data }) => {
      const response = await axios.post(`${url}${query}`, data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response.data;
    },
  });
};

export const deleteData = () => {
  return useMutation({
    mutationFn: async ({ query }) => {
      const response = await axios.delete(`${url}${query}`, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response.data;
    },
  });
};

export const updateData = () => {
  return useMutation({
    mutationFn: async ({ query, data }) => {
      const response = await axios.patch(`${url}${query}`, data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response.data;
    },
  });
};
