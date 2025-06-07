import React from "react";

const StatsCard = ({ icon, title, value, trend, color }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <div className="flex items-center">
        <div
          className={`p-2 rounded-full ${color} bg-opacity-10 text-[#815C00]`}
        >
          {icon}
        </div>
        <div className="ml-3">
          <p className="text-sm text-gray-500">{title}</p>
          <p className="text-2xl font-bold">{value}</p>
        </div>
      </div>
      <p className="mt-2 text-xs text-green-600">{trend}</p>
    </div>
  );
};

export default StatsCard;
