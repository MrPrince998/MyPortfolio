import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useFetch } from "../../../query/useFetch";
import { GoldParticleLoader } from "../../common/loadings/GoldParticleLoader";
import BackButton from "../../ui/BackButton";
import { Button } from "../../ui/Button";

const SingleProject = () => {
  const { id } = useParams();
  const apiUrl = import.meta.env.VITE_API_URL;
  const [techStackData, setTechStackData] = useState([]);

  const { data, isLoading, isError, error } = useFetch({
    query: `/api/projects/${id}`,
    key: ["project", id],
  });

  useEffect(() => {
    if (data?.techStack) {
      setTechStackData(
        data.techStack
          .split(",")
          .map((tech) => tech.trim())
          .filter((tech) => tech)
      );
    }
  }, [data]);

  if (isLoading) return <GoldParticleLoader />;
  if (isError)
    return <p>Error loading project: {error?.message || "Unknown error"}</p>;
  if (!data) return <p>Project not found.</p>;

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8 relative">
      <BackButton />
      <header className="space-y-2">
        <h1 className="text-3xl font-bold text-gray-900">{data.title}</h1>
        <div className="h-1 w-20 bg-[#FFB600]"></div>
      </header>

      <div className="grid md:grid-cols-2 gap-8 items-start">
        <div className="rounded-lg overflow-hidden border border-gray-200 shadow-lg">
          <img
            src={`${apiUrl}${data.image}`}
            alt={data.title}
            className="w-full h-auto object-cover aspect-video"
            loading="lazy"
          />
        </div>

        <div className="space-y-6">
          <p className="text-gray-700 leading-relaxed whitespace-pre-line">
            {data.description}
          </p>

          <div className="space-y-3">
            <h3 className="font-medium text-gray-900 text-lg">
              Technologies Used:
            </h3>
            {techStackData.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {techStackData.map((tech, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-[#FFF5D9] text-[#815C00] rounded-full text-sm font-medium"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-500">No technologies listed.</p>
            )}
          </div>
        </div>
      </div>

      {data.projectLink && (
        <div className="mt-8">
          <a href={data.projectLink} target="_blank" rel="noopener noreferrer">
            <Button
              variant="default"
              size="lg"
              className="bg-primary hover:bg-primary/90"
            >
              View Project / Source Code
            </Button>
          </a>
        </div>
      )}
    </div>
  );
};

export default SingleProject;
