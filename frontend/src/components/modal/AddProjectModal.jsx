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
import { postProject } from "@/query/useFetch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { queryClient } from "@/main";
import { TextArea } from "@radix-ui/themes";

const AddProjectModal = () => {
  const [open, setOpen] = useState(false);
  const { mutate, isPending } = postProject();

  const projectValidationSchema = Yup.object().shape({
    title: Yup.string()
      .required("Title is required")
      .min(2, "Title must be at least 2 characters"),
    description: Yup.string().required("Description is required"),
    image: Yup.mixed()
      .required("Image is required")
      .test("fileType", "Unsupported File Format", (value) =>
        value
          ? ["image/jpeg", "image/png", "image/webp"].includes(value.type)
          : false
      ),
    projectLink: Yup.string(),
    status: Yup.string().required("Status is required"),
    isclientProject: Yup.boolean(),
  });

  const handleAddProjects = (values, { resetForm }) => {
    console.log("Submitting form", values);
    const formData = new FormData();
    const fields = [
      { name: "title", value: values.title },
      { name: "description", value: values.description },
      { name: "projectLink", value: values.projectLink },
      { name: "status", value: values.status },
      {
        name: "isclientProject",
        value: values.isclientProject ? "true" : "false",
      },
      { name: "image", value: values.image },
    ];
    fields.forEach((field) => {
      if (
        field.value !== undefined &&
        field.value !== null &&
        field.value !== ""
      ) {
        formData.append(field.name, field.value);
      }
    });
    // Debug: log all FormData entries
    for (let pair of formData.entries()) {
      console.log(pair[0] + ":", pair[1]);
    }
    console.log("Calling mutate");
    mutate(
      { query: "/api/projects", data: formData },
      {
        onSuccess: () => {
          resetForm();
          queryClient.invalidateQueries("projects");
          setOpen(false);
        },
      }
    );
  };

  const Status = [
    { value: "pending", label: "Pending" },
    { value: "active", label: "Active" },
    { value: "completed", label: "Complete" },
  ];

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Add Projects</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[435px]">
        <DialogHeader>
          <DialogTitle>Add Project</DialogTitle>{" "}
          {/* Changed from "Add Skill" */}
        </DialogHeader>
        <Formik
          initialValues={{
            title: "",
            description: "",
            image: "",
            projectLink: "",
            status: "pending",
            isclientProject: false,
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
            isSubmitting,
            setFieldValue,
            resetForm,
          }) => (
            <Form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="title" className="mb-2 block">
                  Title
                </Label>
                <Input
                  type="text"
                  name="title"
                  id="title"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.title}
                  placeholder="Enter title"
                />
                {errors.title && touched.title && (
                  <p className="text-red-500 text-sm mt-1">{errors.title}</p>
                )}
              </div>
              <div>
                <Label htmlFor="description" className="mb-2 block">
                  Description
                </Label>
                <TextArea
                  type="text"
                  name="description"
                  id="description"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.description}
                  className="rounded-md"
                  placeholder="Enter project description"
                />
                {errors.description && touched.description && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.description}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="projectLink" className="mb-2 block">
                  Project Link
                </Label>
                <Input
                  type="text"
                  name="projectLink"
                  id="projectLink"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.projectLink}
                  placeholder="Enter your project link"
                />
              </div>

              <div>
                <Label htmlFor="status" className="mb-2 block">
                  Select Status
                </Label>
                <Select
                  onValueChange={(value) => setFieldValue("status", value)}
                  value={values.status}
                  onBlur={() => handleBlur("status")}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select Project Status" />
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
                  <p className="text-red-500 text-sm mt-1">{errors.status}</p>
                )}
              </div>

              <div>
                <Label htmlFor="isclientProject" className="mb-2 block">
                  Is Client Project
                </Label>
                <Select
                  onValueChange={(value) =>
                    setFieldValue("isclientProject", value === "true")
                  }
                  value={values.isclientProject ? "true" : "false"}
                  onBlur={() => handleBlur("isclientProject")}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select True or False" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="true">True</SelectItem>
                    <SelectItem value="false">False</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="image" className="mb-2 block">
                  Image
                </Label>
                <Input
                  type="file"
                  name="image"
                  id="image"
                  onChange={(e) => {
                    // For file uploads, you might need to handle it differently
                    setFieldValue("image", e.target.files[0]);
                  }}
                  onBlur={handleBlur}
                />
                {errors.image && touched.image && (
                  <p className="text-red-500 text-sm mt-1">{errors.image}</p>
                )}
              </div>
              <div className="flex justify-end gap-4 pt-2">
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
                <Button type="submit" >
                  {isPending ? "Adding..." : "Add"}
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
