import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { Button } from "@/components/ui/Button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/Input";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { queryClient } from "@/main";
import { X } from "lucide-react";
import { Switch } from "@/components/ui/switch";

const Status = [
  { value: "pending", label: "Pending" },
  { value: "active", label: "Active" },
  { value: "completed", label: "Complete" },
];

const AddProjectModal = () => {
  const [open, setOpen] = useState(false);
  const url = import.meta.env.VITE_API_URL;
  const token = localStorage.getItem("adminToken");

  const { mutate, isPending } = useMutation({
    mutationFn: async (formData) => {
      const response = await axios.post(`${url}/api/projects/`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries("projects");
      setOpen(false);
    },
    onError: (error) => {
      console.error("Mutation failed:", error);
    },
  });

  const projectValidationSchema = Yup.object().shape({
    title: Yup.string()
      .required("Title is required")
      .min(2, "Title must be at least 2 characters"),
    description: Yup.string().required("Description is required"),
    image: Yup.mixed()
      .required("Image is required")
      .test("fileType", "Only images (JPEG, PNG, WEBP) are allowed", (value) =>
        value
          ? ["image/jpeg", "image/png", "image/webp"].includes(value.type)
          : false
      ),
    projectLink: Yup.string().url("Must be a valid URL").nullable(),
    status: Yup.string().required("Status is required"),
    isclientProject: Yup.boolean(),
    techStack: Yup.array() // Changed to array
      .of(Yup.string().trim().required("Technology cannot be empty"))
      .min(1, "At least one technology is required")
      .required("Technologies used is required"),
  });

  const handleAddProjects = (values, { resetForm }) => {
    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("description", values.description);
    formData.append("projectLink", values.projectLink || "");
    formData.append("status", values.status);
    formData.append("isclientProject", values.isclientProject.toString());
    formData.append("image", values.image);

    // Handle techStack: convert comma-separated string to array if necessary
    let techStackArray = values.techStack;
    if (typeof values.techStack === "string") {
      techStackArray = values.techStack
        .split(",")
        .map((tech) => tech.trim())
        .filter(Boolean);
    }
    // Append each tech stack item individually if your backend expects it that way,
    // or stringify the array if it expects a single stringified array.
    // Assuming backend now expects an array of strings directly for FormData:
    if (Array.isArray(techStackArray)) {
      techStackArray.forEach((tech) => formData.append("techStack[]", tech));
    }

    mutate(formData);
    resetForm();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Add Project</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">
            Add New Project
          </DialogTitle>
        </DialogHeader>

        <Formik
          initialValues={{
            title: "",
            description: "",
            image: null,
            projectLink: "",
            status: "pending",
            isclientProject: false,
            techStack: [], // Changed to empty array
          }}
          validationSchema={projectValidationSchema}
          onSubmit={handleAddProjects}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            setFieldValue,
            resetForm,
          }) => (
            <Form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Title *</Label>
                  <Input
                    id="title"
                    name="title"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.title}
                    placeholder="Project title"
                  />
                  {errors.title && touched.title && (
                    <p className="text-red-500 text-sm">{errors.title}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="status">Status *</Label>
                  <Select
                    onValueChange={(value) => setFieldValue("status", value)}
                    value={values.status}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      {Status.map((stat) => (
                        <SelectItem key={stat.value} value={stat.value}>
                          {stat.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.status && touched.status && (
                    <p className="text-red-500 text-sm">{errors.status}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="projectLink">Project Link</Label>
                  <Input
                    id="projectLink"
                    name="projectLink"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.projectLink}
                    placeholder="https://example.com"
                  />
                  {errors.projectLink && touched.projectLink && (
                    <p className="text-red-500 text-sm">{errors.projectLink}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="techStack">Technologies *</Label>
                  <Input
                    id="techStack"
                    name="techStack"
                    // For Formik, the value should be a string for the input field
                    onChange={(e) => {
                      // Keep the input as a string, validation/submission will handle array
                      handleChange(e);
                    }}
                    onBlur={handleBlur}
                    value={
                      Array.isArray(values.techStack)
                        ? values.techStack.join(", ")
                        : values.techStack
                    }
                    placeholder="React, Node.js, MongoDB (comma-separated)"
                  />
                  {errors.techStack && touched.techStack && (
                    <p className="text-red-500 text-sm">
                      {/* Display error for array or string */}
                      {typeof errors.techStack === "string"
                        ? errors.techStack
                        : errors.techStack?.join?.(", ") || "Invalid input"}
                    </p>
                  )}
                </div>

                <div className="flex items-center space-x-2 pt-2 md:pt-6">
                  <Switch
                    id="isclientProject"
                    checked={values.isclientProject}
                    onCheckedChange={(checked) =>
                      setFieldValue("isclientProject", checked)
                    }
                  />
                  <Label htmlFor="isclientProject">Client Project</Label>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  name="description"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.description}
                  placeholder="Project description"
                  rows={4}
                />
                {errors.description && touched.description && (
                  <p className="text-red-500 text-sm">{errors.description}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="image">Project Image *</Label>
                <div className="flex items-center gap-4">
                  {/* Selected image preview */}
                  {values.image && (
                    <div className="relative group">
                      <img
                        src={URL.createObjectURL(values.image)}
                        alt="Project preview"
                        className="h-24 w-24 object-cover rounded-md border"
                      />
                      <button
                        type="button"
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"
                        onClick={() => setFieldValue("image", null)}
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                  )}
                  <div className="flex-1">
                    <Input
                      id="image"
                      type="file"
                      accept="image/jpeg, image/png, image/webp"
                      onChange={(e) => {
                        setFieldValue("image", e.target.files[0]);
                      }}
                      onBlur={handleBlur}
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      JPEG, PNG, or WEBP. Max 5MB.
                    </p>
                    {errors.image && touched.image && (
                      <p className="text-red-500 text-sm">{errors.image}</p>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-4 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    resetForm();
                    setOpen(false);
                  }}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={isPending || Object.keys(errors).length > 0}
                >
                  {isPending ? "Adding..." : "Add Project"}
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  );
};

export default AddProjectModal;
