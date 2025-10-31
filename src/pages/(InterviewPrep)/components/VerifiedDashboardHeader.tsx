
import React from "react";

interface DashboardHeaderProps {
  onBack?: () => void;
  title: string;
}

const VerifiedDashboardHeader: React.FC<DashboardHeaderProps> = ({ onBack, title }) => (
  <div className="flex flex-wrap items-center justify-between gap-3">
    <div className="flex items-center gap-3">
      <button
        onClick={onBack}
        className="flex items-center justify-center w-10 h-10 rounded-full bg-[#FFF5F0] text-[#FF8351] hover:bg-[#FF8351] hover:text-white transition-colors"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>
      <h1 className="text-2xl font-bold text-gray-800">
        {title}
      </h1>
    </div>
    <div className="flex items-center gap-4">
      <div className="flex items-center justify-center gap-2 bg-white rounded-md w-80 h-13 text-sm text-gray-700 px-4 py-3">
        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
        <span className="font-medium">You are verified as Interviewer</span>
      </div>
    </div>
  </div>
);

export default VerifiedDashboardHeader;
