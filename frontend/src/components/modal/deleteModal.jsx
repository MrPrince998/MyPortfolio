import React from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import clsx from "clsx";
import { deleteData } from "@/query/useFetch";
const DeleteModal = ({ className, id, keys }) => {
  const { mutate } = deleteData();
  let baseQuery = "";

  if (keys === "skills") {
    baseQuery = "/api/skills";
  } else if(keys= "projects"){
    baseQuery = "/api/projects";
  }
  const handleDelete = () => {
    mutate({ query: `${baseQuery}/${id}`, key: `${keys}` });
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger
        className={clsx(
          `inline-flex h-[35px] items-center justify-center rounded bg-violet4 px-[15px] font-medium leading-none text-violet11 outline-none outline-offset-1 hover:bg-mauve3 focus-visible:outline-2 focus-visible:outline-violet6 select-none ${className}`
        )}
      >
        Delete
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="hover:text-secondary">Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete} variant="destructive">
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteModal;
