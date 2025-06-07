import { Skeleton } from "@/components/ui/skeleton";

const BioTemplate = ({ data, title, className, isLoading }) => {
  return (
    <div className={` ${className} border-gray-500`}>
      {isLoading ? (
        <Skeleton className="h-6 w-24" />
      ) : (
        <p className="font-lato font-extrabold text-xl text-[#FD6F00]">
          {data || "N/A"}+
        </p>
      )}

      {isLoading ? (
        <Skeleton className="h-4 w-20 mt-2" />
      ) : (
        <p className="font-lato font-bold text-[#686868]">{title}</p>
      )}
    </div>
  );
};

export default BioTemplate;