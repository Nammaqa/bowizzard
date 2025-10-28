import React, { useState } from "react";
import { X } from "lucide-react";
import SavedInterviewCard from "./SavedInterviewCard";
import VerifiedDashboardHeader from "./VerifiedDashboardHeader";

interface Interview {
  id: string;
  title: string;
  experience: string;
  date: string;
  time: string;
  credits?: number;
  priority?: string;
}

interface InterviewDetailsViewProps {
  interview: Interview;
  onBack: () => void;
  viewType: "scheduled" | "available" | "saved";
  onBook?: () => void;
  onViewDetails?: (
    interview: Interview,
    type: "scheduled" | "available" | "saved"
  ) => void;
  savedInterviews?: Interview[];
  showAllSaved?: boolean;
  onToggleSaved?: () => void;
  onToggleSaveInterview?: (interview: Interview) => void;
  isInterviewSaved?: boolean;
}

const InterviewDetailsView: React.FC<InterviewDetailsViewProps> = ({
  interview,
  onBack,
  viewType,
  onBook,
  onViewDetails,
  savedInterviews = [],
  showAllSaved = false,
  onToggleSaved,
  onToggleSaveInterview,
  isInterviewSaved = false,
}) => {
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [timeRemaining] = useState("23:15:20");

  const displayedSaved = showAllSaved
    ? savedInterviews
    : savedInterviews.slice(0, 2);

  const handleBookInterview = () => {
    setShowBookingModal(true);
    
  };

  const handleSaveToggle = () => {
    if (onToggleSaveInterview) {
      onToggleSaveInterview(interview);
    }
  };

  const renderMainContent = () => {
    if (viewType === "scheduled") {
      return (
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">        
              <div>
                <span className="text-lg text-[#FF8351] font-bold">
                  INTERVIEW ID: #{interview.id}
                </span>
              </div>
                <button
                  onClick={handleSaveToggle}
                  className="p-1.5 hover:bg-gray-100 rounded cursor-pointer"
                >
                  <svg
                    className="w-5 h-5"
                    fill={isInterviewSaved ? "currentColor" : "none"}
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                    />
                  </svg>
                </button>
          </div>
          <div className="bg-[#E8E8E8] h-[1px] mb-5"></div>

          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            {interview.title}
          </h2>
          
          <p className="text-gray-600 mb-6">
            Experience: {interview.experience}
          </p>


          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="flex items-center gap-2">
              <svg
                className="w-5 h-5 text-gray-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <div>
                <p className="text-xs text-gray-500">Date</p>
                <p className="text-sm font-medium">{interview.date}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <svg
                className="w-5 h-5 text-gray-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <div>
                <p className="text-xs text-gray-500">Time</p>
                <p className="text-sm font-medium">
                  {interview.time} - 04:00 PM
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {interview.priority && (
                <span
                  className={`px-3 py-1 text-sm font-medium rounded ${
                    interview.priority === "HIGH"
                      ? "bg-red-100 text-red-600"
                      : "bg-green-100 text-green-600"
                  }`}
                >
                  Priority: {interview.priority}
                </span>
              )}
            </div>
          </div>

          <div className="bg-[#E8E8E8] h-[1px] mb-5"></div>

          <div className="mb-6">
            <h3 className="text-sm font-semibold text-gray-800 mb-3">
              PRIMARY SKILLS TO EVALUATE
            </h3>
            <div className="grid grid-cols-5 gap-3 mb-4">
              {[1, 2, 3, 4, 5].map((skill) => (
                <div
                  key={skill}
                  className="bg-gray-50 rounded px-3 py-2 text-sm text-gray-700"
                >
                  Skill {skill}
                </div>
              ))}
            </div>
            <div className="grid grid-cols-2 gap-3">
              {[6, 7].map((skill) => (
                <div
                  key={skill}
                  className="bg-gray-50 rounded px-3 py-2 text-sm text-gray-700"
                >
                  Skill {skill}
                </div>
              ))}
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-sm font-semibold text-gray-800 mb-3">
              SECONDARY SKILLS TO EVALUATE
            </h3>
            <div className="grid grid-cols-5 gap-3 mb-4">
              {[1, 2, 3, 4, 5].map((skill) => (
                <div
                  key={skill}
                  className="bg-gray-50 rounded px-3 py-2 text-sm text-gray-700"
                >
                  Skill {skill}
                </div>
              ))}
            </div>
            <div className="grid grid-cols-2 gap-3">
              {[6, 7].map((skill) => (
                <div
                  key={skill}
                  className="bg-gray-50 rounded px-3 py-2 text-sm text-gray-700"
                >
                  Skill {skill}
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-gray-200 mb-4">
            <div className="text-right">
              <p className="text-2xl font-bold text-gray-800">
                {interview.credits} Credits
              </p>
            </div>
          </div>

          <p className="text-xs text-gray-500 mb-6">
            Note: Candidate details will unlock once the interview begins to
            ensure an unbiased evaluation.
          </p>

          <div className="flex gap-4">
            <button className="flex-1 px-6 py-3 rounded-md border-2 border-[#FF8351] text-[#FF8351] font-semibold transition-all hover:bg-[#FFF5F0] cursor-pointer">
              Cancel Interview
            </button>
            <button
              className="flex-1 px-6 py-3 rounded-md text-white font-semibold transition-transform hover:scale-102 cursor-pointer"
              style={{
                background: "linear-gradient(180deg, #FF9D48 0%, #FF8251 100%)",
              }}
            >
              Starts in {timeRemaining}
            </button>
          </div>
        </div>
      );
    }

    return (
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center justify-between mb-6">
            
            <div>
              <span className="text-lg text-[#FF8351] font-bold">
                INTERVIEW ID: #{interview.id}
              </span>
            </div>
              <button
                onClick={handleSaveToggle}
                className="p-1.5 hover:bg-gray-100 rounded cursor-pointer"
              >
                <svg
                  className="w-5 h-5"
                  fill={isInterviewSaved ? "currentColor" : "none"}
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                  />
                </svg>
              </button>
        </div>

        <div className="bg-[#E8E8E8] h-[1px] mb-5"></div>

        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          {interview.title}
        </h2>
        <p className="text-gray-600 mb-6">Experience: {interview.experience}</p>

        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="flex items-center gap-2">
            <svg
              className="w-5 h-5 text-gray-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <div>
              <p className="text-xs text-gray-500">Date</p>
              <p className="text-sm font-medium">{interview.date}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <svg
              className="w-5 h-5 text-gray-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <div>
              <p className="text-xs text-gray-500">Time</p>
              <p className="text-sm font-medium">{interview.time} - 04:00 PM</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {interview.priority && (
              <span
                className={`px-3 py-1 text-sm font-medium rounded ${
                  interview.priority === "HIGH"
                    ? "bg-red-100 text-red-600"
                    : "bg-green-100 text-green-600"
                }`}
              >
                Priority: {interview.priority}
              </span>
            )}
          </div>
        </div>

        <div className="bg-[#E8E8E8] h-[1px] mb-5"></div>

        <div className="mb-6">
          <h3 className="text-sm font-semibold text-gray-800 mb-3">
            PRIMARY SKILLS TO EVALUATE
          </h3>
          <div className="grid grid-cols-5 gap-3 mb-4">
            {[1, 2, 3, 4, 5].map((skill) => (
              <div
                key={skill}
                className="bg-gray-50 rounded px-3 py-2 text-sm text-gray-700"
              >
                Skill {skill}
              </div>
            ))}
          </div>
          <div className="grid grid-cols-2 gap-3">
            {[6, 7].map((skill) => (
              <div
                key={skill}
                className="bg-gray-50 rounded px-3 py-2 text-sm text-gray-700"
              >
                Skill {skill}
              </div>
            ))}
          </div>
        </div>

        <div className="mb-6">
          <h3 className="text-sm font-semibold text-gray-800 mb-3">
            SECONDARY SKILLS TO EVALUATE
          </h3>
          <div className="grid grid-cols-5 gap-3 mb-4">
            {[1, 2, 3, 4, 5].map((skill) => (
              <div
                key={skill}
                className="bg-gray-50 rounded px-3 py-2 text-sm text-gray-700"
              >
                Skill {skill}
              </div>
            ))}
          </div>
          <div className="grid grid-cols-2 gap-3">
            {[6, 7].map((skill) => (
              <div
                key={skill}
                className="bg-gray-50 rounded px-3 py-2 text-sm text-gray-700"
              >
                Skill {skill}
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-gray-200">
          <div className="text-right">
            <p className="text-2xl font-bold text-gray-800">
              {interview.credits} Credits
            </p>
          </div>
        </div>

        <p className="text-xs text-gray-500 mt-4">
          Note: Candidate details will unlock once the interview begins to
          ensure an unbiased evaluation.
        </p>

        <button
          onClick={handleBookInterview}
          className="w-full mt-6 px-6 py-3 rounded-md text-white font-semibold transition-transform hover:scale-102 cursor-pointer"
          style={{
            background: "linear-gradient(180deg, #FF9D48 0%, #FF8251 100%)",
          }}
        >
          Book Mock Interview
        </button>
      </div>
    );
  };

  return (
    <>
      <VerifiedDashboardHeader
      onBack={onBack}
      title="Take Mock Interview"
    />
    <div className="p-3"></div>
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Main Content */}
        <div className="flex-1">{renderMainContent()}</div>

        {/* Sidebar */}
        <div className="w-full lg:w-80 space-y-4">
          {/* Credits Card */}
          <div className="bg-[#FFF9F0] rounded-lg p-4 flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-full flex items-center justify-center text-white font-bold text-xl flex-shrink-0">
              W
            </div>
            <div>
              <p className="text-sm font-medium text-gray-700">
                100 Credit(s) available
              </p>
              <a href="#" className="text-sm text-[#FF8351] font-medium">
                Redeem in store →
              </a>
            </div>
          </div>

          {/* Saved Interviews Section */}
          <div className="bg-white rounded-lg shadow-sm">
            <div className="p-4 border-b border-gray-200 flex items-center justify-between">
              <h2 className="text-base font-medium text-[#FF8351]">
                Saved Interview(s)
              </h2>
              <button
                onClick={onToggleSaved}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <svg
                  className={`w-4 h-4 transition-transform ${
                    showAllSaved ? "rotate-0" : "rotate-180"
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 15l7-7 7 7"
                  />
                </svg>
              </button>
            </div>
            <div className="p-4 space-y-3">
              {displayedSaved.length > 0 ? (
                displayedSaved.map((savedInterview, index) => (
                  <SavedInterviewCard
                    key={index}
                    interview={savedInterview}
                    onViewDetails={() =>
                      onViewDetails && onViewDetails(
                        {
                          ...savedInterview,
                          credits: 15,
                          priority: "HIGH",
                        },
                        'saved'
                      )
                    }
                  />
                ))
              ) : (
                <p className="text-sm text-gray-500 text-center py-4">
                  No saved interviews
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    

      {/* Booking Success Modal */}
      {showBookingModal && (
        <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4 relative">
            <button
              onClick={() => setShowBookingModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              <X size={20} />
            </button>

            <div className="flex flex-col items-center text-center">
              <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mb-4">
                <svg
                  className="w-10 h-10 text-green-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={3}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>

              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Interview ID #{interview.id} Booked
              </h3>

              <p className="text-gray-600 mb-6">
                {interview.date}, {interview.time} - 4:00 PM
              </p>

              <button
                onClick={() => {
                  setShowBookingModal(false);
                  onBack();
                }}
                className="px-6 py-2.5 rounded-md text-white font-semibold"
                style={{
                  background:
                    "linear-gradient(180deg, #FF9D48 0%, #FF8251 100%)",
                }}
              >
                Go to Interview Dashboard
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default InterviewDetailsView;
