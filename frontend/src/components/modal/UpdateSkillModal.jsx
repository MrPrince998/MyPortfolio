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
import { useFetchById, updateData, useFetch } from "@/query/useFetch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { queryClient } from "@/main";

const UpdateSkillModal = ({ id, open, onOpenChange }) => {
  const { mutate, isPending } = updateData();
  const { data: GetSingleSkill } = useFetch({
    query: `/api/skills/${id}`,
    key: "skills"
  });

  const skillValidationSchema = Yup.object().shape({
    icon: Yup.object().shape({
      library: Yup.string().required("Icon Library is required"),
      name: Yup.string().required("Icon name is required"),
    }),
    title: Yup.string()
      .required("Title is required")
      .min(2, "Title must be at least 2 characters"),
    progress: Yup.number()
      .required("Progress is required")
      .min(0, "Progress must be at least 0")
      .max(100, "Progress can't exceed 100"),
  });

  const handleUpdate = (values, { resetForm }) => {
    mutate(
      { query: `/api/skills/${id}`, data: values },
      {
        onSuccess: () => {
          resetForm();
          queryClient.invalidateQueries("skills");
          onOpenChange(false);
        },
      }
    );
  };

  const iconLibraries = [
    { value: "io5", label: "Io5Icon" },
    { value: "fa", label: "FaIcons" },
    { value: "md", label: "MdIcons" },
    { value: "si", label: "SiIcons" },
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[435px]">
        <DialogHeader>
          <DialogTitle>Edit skill</DialogTitle>
        </DialogHeader>
        <Formik
          enableReinitialize={true}
          initialValues={{
            icon: {
              library: GetSingleSkill?.icon?.library || "",
              name: GetSingleSkill?.icon?.name || "",
            },
            title: GetSingleSkill?.title || "",
            progress: GetSingleSkill?.progress || 0,
          }}
          validationSchema={skillValidationSchema}
          onSubmit={handleUpdate}
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
          }) => (
            <Form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="icon.library" className="mb-2 block">
                  Icon Library
                </Label>
                <Select
                  onValueChange={(value) =>
                    setFieldValue("icon.library", value)
                  }
                  value={values.icon.library}
                  onBlur={() => handleBlur("icon.library")}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a React Icons library" />
                  </SelectTrigger>
                  <SelectContent>
                    {iconLibraries.map((lib) => (
                      <SelectItem key={lib.value} value={lib.value}>
                        {lib.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.icon?.library && touched.icon?.library && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.icon.library}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="icon.name" className="mb-2 block">
                  Icon Name
                </Label>
                <Input
                  type="text"
                  name="icon.name"
                  id="icon.name"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.icon.name}
                  placeholder="e.g. FaReact, MdComputer, etc."
                />
                {errors.icon?.name && touched.icon?.name && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.icon.name}
                  </p>
                )}
              </div>

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
                  placeholder="Enter skill name"
                />
                {errors.title && touched.title && (
                  <p className="text-red-500 text-sm mt-1">{errors.title}</p>
                )}
              </div>

              <div>
                <Label htmlFor="progress" className="mb-2 block">
                  Progress
                </Label>
                <Input
                  type="number"
                  name="progress"
                  id="progress"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.progress}
                  min={0}
                  max={100}
                  placeholder="0-100"
                />
                {errors.progress && touched.progress && (
                  <p className="text-red-500 text-sm mt-1">{errors.progress}</p>
                )}
              </div>

              <div className="flex justify-end gap-4 pt-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => onOpenChange(false)}
                  disabled={isSubmitting || isPending}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={isSubmitting || isPending}>
                  {isPending ? "Saving..." : "Save"}
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateSkillModal;
