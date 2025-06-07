// src/components/admin/AdminDashboard.jsx
import { useState } from "react";
import { ShieldCheckIcon, FolderIcon } from "@heroicons/react/24/outline";
import { useFetch } from "../../../query/useFetch";
import { GoldParticleLoader } from "../../common/loadings/GoldParticleLoader";
import StatsCard from "./StatsCard";
import { IoPerson } from "react-icons/io5";
import { ProjectTable } from "./ProjectTable";

const AdminDashboard = () => {
  const { data: totalProject } = useFetch({
    query: "/api/totalProjects",
    key: "totalProjects",
  });
  const { data: projects, isLoading } = useFetch({
    query: "/api/projects",
    key: "projects",
  });

  // Statistics calculations
  const stats = {
    activeProjects: projects?.filter((p) => p.status === "Active").length,
  };

  if (isLoading) return <GoldParticleLoader />;

  // defining columns using columnHelper
  return (
    <div className="min-h-screen bg-gray-50 px-8 lg:px-40 py-8">
      {/* header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-[#815C00] flex items-center">
          <ShieldCheckIcon className="h-8 w-8 mr-3" />
          Admin Dashboard
        </h1>
        <div className="text-sm text-gray-500">
          Last updated: {new Date().toLocaleDateString()}
        </div>
      </div>

      {/* stats cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <StatsCard
          icon={<FolderIcon className="h-6 w-6 text-white" />}
          title="Total Projects"
          value={totalProject?.projectCount}
          color="bg-[#FFB600]"
        />
        <StatsCard
          icon={<FolderIcon className="h-6 w-6 text-white" />}
          title="Active Projects"
          value={stats?.activeProjects}
          color="bg-green-500"
        />
        <StatsCard
          icon={<IoPerson className="h-6 w-6 text-white" />}
          title="Total Client"
          value={totalProject?.clientCount}
          color="bg-blue-500"
        />
      </div>

      {/* My Skills */}

      {/* My Projects */}
      <ProjectTable data={projects} totalProject={totalProject} />
    </div>
  );
};
export default AdminDashboard;
