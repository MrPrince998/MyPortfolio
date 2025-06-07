import React from "react";
import { useParams } from "react-router-dom";
import { useFetch } from "../../../query/useFetch";
import { GoldParticleLoader } from "../../common/loadings/GoldParticleLoader";
import BackButton from "../../ui/BackButton";
import { Button } from "../../ui/Button";

const SingleProject = () => {
  const { id } = useParams();
  const apiUrl = import.meta.env.VITE_API_URL;

  const { data, isLoading } = useFetch({
    query: `/api/projects/${id}`,
    key: ["project", id],
  });
  if (isLoading) return <GoldParticleLoader />;

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8 relative">
      <BackButton/>
      <header className="space-y-2">
        <h1 className="text-3xl font-bold text-gray-900">{data?.title}</h1>
        <div className="h-1 w-20 bg-[#FFB600]"></div>
      </header>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="rounded-lg overflow-hidden border border-gray-200">
          <img
            src={`${apiUrl}${data?.image}`}
            alt={data?.title}
            className="w-full h-auto object-cover"
            loading="lazy"
          />
        </div>

        <div className="space-y-6">
          <p className="text-gray-700 leading-relaxed">{data?.description}</p>

          <div className="space-y-3">
            <h3 className="font-medium text-gray-900">Technologies</h3>
            <div className="flex flex-wrap gap-2">
              {data?.techStack?.map((tech, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-[#FFF5D9] text-[#815C00] rounded-full text-sm"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div>
        <a
          href={data?.projectLink} target="_blank"
        >
        <Button variant="primary" name={"View Source Code"} className="text-base font-medium py-2 px-3"/>
        </a>
      </div>
    </div>
  );
};

export default SingleProject;
