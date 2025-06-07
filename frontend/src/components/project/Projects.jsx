import React from "react";
import { useFetch } from "../../query/useFetch";
import { Link } from "react-router-dom";
import { RiArrowDropDownLine, RiWifiOffLine } from "react-icons/ri";

const Projects = () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const { data, isLoading, isError, error } = useFetch({
    query: "/api/projects", 
    key: "projects",
  });

  // Skeleton Loading Component
  const Skeleton = () => (
    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
      {/* Image Skeleton */}
      <div className="h-48 bg-gray-100 animate-pulse"></div>

      {/* Content Skeleton */}
      <div className="p-5">
        <div className="h-6 bg-gray-200 rounded-full animate-pulse mb-3 w-3/4"></div>
        <div className="space-y-2">
          <div className="h-4 bg-gray-200 rounded-full animate-pulse"></div>
          <div className="h-4 bg-gray-200 rounded-full animate-pulse w-5/6"></div>
          <div className="h-4 bg-gray-200 rounded-full animate-pulse w-2/3"></div>
        </div>
      </div>
    </div>
  );

  // Error State Component
  const ErrorState = () => (
    <div className="col-span-full flex flex-col items-center justify-center py-12 text-center">
      <RiWifiOffLine className="text-4xl text-gray-400 mb-4" />
      <h3 className="text-lg font-medium text-gray-900 mb-2">
        Unable to load projects
      </h3>
      <p className="text-gray-600 mb-4 max-w-md">
        {error?.message ||
          "There was a problem fetching the projects. Please check your internet connection and try again."}
      </p>
      <button
        onClick={() => window.location.reload()}
        className="px-4 py-2 bg-[#FFB600] text-white rounded-md hover:bg-[#e6a400] transition-colors"
      >
        Retry
      </button>
    </div>
  );

  // Empty State Component
  const EmptyState = () => (
    <div className="col-span-full flex flex-col items-center justify-center py-12 text-center">
      <h3 className="text-lg font-medium text-gray-900 mb-2">
        No projects found
      </h3>
      <p className="text-gray-600">
        There are currently no projects to display.
      </p>
    </div>
  );

  const renderProjects = (project) => {
    return (
      <div
        className="
          group relative
          bg-white
          border border-gray-200
          rounded-xl overflow-hidden
          shadow-sm hover:shadow-md
          transition-all duration-300 ease-in-out
          hover:-translate-y-1
        "
      >
        {/* Image Container */}
        <div
          className="
            relative overflow-hidden
            h-48 bg-gray-100
            flex items-center justify-center
          "
        >
          <img
            src={`${apiUrl}${project.image}`}
            alt={project.title}
            className="object-cover w-full h-full"
            loading="lazy"
          />
          {/* Overlay */}
          <div className="absolute inset-0 flex items-center justify-center gap-1 bg-black/0 text-white opacity-0 transition-opacity group-hover:bg-black/40 group-hover:opacity-100">
            <span>Read More</span>
            <RiArrowDropDownLine size={24} />
          </div>
        </div>

        {/* Content */}
        <div className="p-5">
          <h3
            className="
              text-lg font-semibold
              text-gray-900 
              mb-2
              transition-colors duration-300
              group-hover:text-[#FFB600] 
            "
          >
            {project.title || "Project Title"}
          </h3>
          <p
            className="
              text-sm text-gray-600
              mb-3 line-clamp-2
            "
          >
            {project.description || "Description"}
          </p>
        </div>
      </div>
    );
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {isLoading ? (
          // Show skeleton loaders while loading
          Array(3)
            .fill()
            .map((_, index) => (
              <div key={`skeleton-${index}`}>
                <Skeleton />
              </div>
            ))
        ) : isError ? (
          // Show error state if there's an error
          <ErrorState />
        ) : !data || data.length === 0 ? (
          // Show empty state if no data
          <EmptyState />
        ) : (
          // Show actual data
          data?.map((project) => (
            <div key={project._id}>
              <Link to={`/project/${project._id}`}>
                {renderProjects(project)}
              </Link>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Projects;
