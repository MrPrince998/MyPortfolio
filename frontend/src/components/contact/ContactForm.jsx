import { useState } from "react";
import {Input} from "../ui/Input";
import { Button } from "../ui/Button";

export default function ContactForm() {
  const apiUrl = import.meta.env.VITE_API_URL;

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "+977 ",
    message: "",
  });

  const [errors, setErrors] = useState({}); // Store errors
  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone is required";
    } else if (!formData.phone.startsWith("+977")) {
      newErrors.phone = "Phone must start with +977";
    }
    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    } else if (formData.message.length < 10) {
      newErrors.message = "Message must be at least 10 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // valid if no errors
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) {
      return; // Stop submission if invalid
    }

    try {
        const res = await fetch(`${apiUrl}/api/email/send`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setStatus("Message sent!");
        setFormData({
          name: "",
          email: "",
          phone: "+977 ",
          message: "",
        });
        setErrors({});
      } else {
        setStatus("Failed to send message.");
      }
    } catch (err) {
      console.log("Something went wrong:", err);
      setStatus("Something went wrong. Please try again.");
    } finally {
      setTimeout(() => setStatus(""), 3000);
    }
  };

  return (
    <form className="grid gap-y-[30px]" onSubmit={handleSubmit}>
      <Input
        name="name"
        placeholder="Name"
        value={formData.name}
        onChange={handleChange}
        required
      />
      {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}

      <Input
        name="email"
        placeholder="Email"
        type="email"
        value={formData.email}
        onChange={handleChange}
        required
      />
      {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}

      <Input
        name="phone"
        placeholder="Phone Number"
        type="text"
        value={formData.phone}
        onChange={handleChange}
        required
      />
      {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}

      <textarea
        name="message"
        placeholder="Message"
        value={formData.message}
        onChange={handleChange}
        required
        className="w-full h-[162px]
          px-4 py-3
          rounded-lg border
          bg-[#BFBFBF]
          text-white
          border-gray-300 
          placeholder-white
          focus:outline-none focus:ring-2
          focus:ring-gray-300 
          focus:border-transparent
          transition-all duration-200 ease-in-out
          disabled:opacity-50 disabled:cursor-not-allowed"
      />
      {errors.message && (
        <p className="text-red-500 text-sm">{errors.message}</p>
      )}

      <Button variant="outline">Send</Button>

      {status && <p className="text-sm text-gray-700">{status}</p>}
    </form>
  );
}
