import { useState } from "react";
import InterviewCard from "./InterviewCard";
import SavedInterviewCard from "./SavedInterviewCard";
import InterviewDetailsView from "./InterviewDetailsView";
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

interface VerifiedDashboardProps {
  onViewDetails?: (interview: Interview, type: 'scheduled' | 'available' | 'saved') => void;
}

const VerifiedDashboard = ({ onViewDetails: externalOnViewDetails }: VerifiedDashboardProps) => {
  const [showAllScheduled, setShowAllScheduled] = useState(false);
  const [showAllAvailable, setShowAllAvailable] = useState(false);
  const [showAllSaved, setShowAllSaved] = useState(false);
  const [selectedInterview, setSelectedInterview] = useState<Interview | null>(null);
  const [viewType, setViewType] = useState<'scheduled' | 'available' | 'saved' | null>(null);
  
  // Saved interviews state - initially empty or can have some default data
  const [savedInterviews, setSavedInterviews] = useState<Interview[]>([
    {
      id: "832349",
      title: "Python Developer",
      experience: "1-2 Years Experience",
      date: "31 AUG 2025",
      time: "03:00 PM",
    },
    {
      id: "832350",
      title: "Python Developer",
      experience: "1-2 Years Experience",
      date: "31 AUG 2025",
      time: "03:00 PM",
    },
  ]);

  // Sample data - Replace with API calls
  const scheduledInterviews: Interview[] = [
    {
      id: "832345",
      title: "Python Developer",
      experience: "1-2 Years Experience",
      date: "31 AUG 2025",
      time: "03:00 PM",
      credits: 15,
      priority: "HIGH",
    },
    {
      id: "832346",
      title: "Python Developer",
      experience: "1-2 Years Experience",
      date: "31 AUG 2025",
      time: "03:00 PM",
      credits: 10,
      priority: "NORMAL",
    },
    {
      id: "832347",
      title: "Python Developer",
      experience: "1-2 Years Experience",
      date: "31 AUG 2025",
      time: "03:00 PM",
      credits: 15,
      priority: "HIGH",
    },
    {
      id: "832348",
      title: "Python Developer",
      experience: "1-2 Years Experience",
      date: "31 AUG 2025",
      time: "03:00 PM",
      credits: 15,
      priority: "HIGH",
    },
  ];

  const availableInterviews: Interview[] = [
    {
      id: "832345",
      title: "Python Developer",
      experience: "1-2 Years Experience",
      date: "31 AUG 2025",
      time: "03:00 PM",
      credits: 15,
      priority: "HIGH",
    },
    {
      id: "832346",
      title: "Python Developer",
      experience: "1-2 Years Experience",
      date: "31 AUG 2025",
      time: "03:00 PM",
      credits: 15,
      priority: "HIGH",
    },
    {
      id: "832347",
      title: "Python Developer",
      experience: "1-2 Years Experience",
      date: "31 AUG 2025",
      time: "03:00 PM",
      credits: 15,
      priority: "HIGH",
    },
    {
      id: "832348",
      title: "Python Developer",
      experience: "1-2 Years Experience",
      date: "31 AUG 2025",
      time: "03:00 PM",
      credits: 15,
      priority: "HIGH",
    },
  ];

  const displayedScheduled = showAllScheduled
    ? scheduledInterviews
    : scheduledInterviews.slice(0, 2);
  const displayedAvailable = showAllAvailable
    ? availableInterviews
    : availableInterviews.slice(0, 2);
  const displayedSaved = showAllSaved
    ? savedInterviews
    : savedInterviews.slice(0, 2);

  const handleViewDetails = (interview: Interview, type: 'scheduled' | 'available' | 'saved') => {
    setSelectedInterview(interview);
    setViewType(type);
    if (externalOnViewDetails) {
      externalOnViewDetails(interview, type);
    }
  };

  const handleBack = () => {
    setSelectedInterview(null);
    setViewType(null);
  };

  const handleBookInterview = () => {
    // After booking, the interview moves to scheduled
    // Return to dashboard
    setSelectedInterview(null);
    setViewType(null);
  };

  // Handle save/unsave interview
  const handleToggleSaveInterview = (interview: Interview) => {
    const isAlreadySaved = savedInterviews.some(saved => saved.id === interview.id);
    
    if (isAlreadySaved) {
      // Remove from saved
      setSavedInterviews(savedInterviews.filter(saved => saved.id !== interview.id));
    } else {
      // Add to saved
      setSavedInterviews([...savedInterviews, interview]);
    }
  };

  // Check if interview is saved
  const isInterviewSaved = (interviewId: string) => {
    return savedInterviews.some(saved => saved.id === interviewId);
  };

  // If viewing details, show the InterviewDetailsView
  if (selectedInterview && viewType) {
    return (
      <div className="space-y-6">
        <VerifiedDashboardHeader
        onBack={handleBack}
        title="Take Mock Interview"
      />

        <InterviewDetailsView
          interview={selectedInterview}
          viewType={viewType}
          onBack={handleBack}
          savedInterviews={savedInterviews}
          showAllSaved={showAllSaved}
          onToggleSaved={() => setShowAllSaved(!showAllSaved)}
          onViewDetails={handleViewDetails}
          onBook={handleBookInterview}
          onToggleSaveInterview={handleToggleSaveInterview}
          isInterviewSaved={isInterviewSaved(selectedInterview.id)}
        />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <button
            onClick={() => window.history.back()}
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
            Take Mock Interview
          </h1>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center justify-center gap-2 bg-white rounded-md w-80 h-13 text-sm text-gray-700 px-4 py-3">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span className="font-medium">You are verified as Interviewer</span>
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        <div className="flex-1 space-y-6">
          {/* Scheduled Interviews Section */}
          <div className="bg-white rounded-lg shadow-sm">
            <div className="p-5 border-b border-gray-200 flex items-center justify-between">
              <h2 className="text-lg font-medium text-[#FF8351]">
                Scheduled Interview(s)
              </h2>
              <button
                onClick={() => setShowAllScheduled(!showAllScheduled)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <svg
                  className={`w-5 h-5 transition-transform ${
                    showAllScheduled ? "rotate-0" : "rotate-180"
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
            <div className="p-5 space-y-4">
              {displayedScheduled.map((interview, index) => (
                <InterviewCard
                  key={index}
                  interview={interview}
                  isScheduled={true}
                  onViewDetails={() => handleViewDetails(interview, 'scheduled')}
                />
              ))}
            </div>
          </div>

          {/* Available Interviews Section */}
          <div className="bg-white rounded-lg shadow-sm">
            <div className="p-5 border-b border-gray-200 flex items-center justify-between">
              <h2 className="text-lg font-medium text-[#FF8351]">
                Available Interview(s)
              </h2>
              <button
                onClick={() => setShowAllAvailable(!showAllAvailable)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <svg
                  className={`w-5 h-5 transition-transform ${
                    showAllAvailable ? "rotate-0" : "rotate-180"
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
            <div className="p-5 space-y-4">
              {displayedAvailable.map((interview, index) => (
                <InterviewCard
                  key={index}
                  interview={interview}
                  isScheduled={false}
                  onViewDetails={() => handleViewDetails(interview, 'available')}
                />
              ))}
            </div>
          </div>
        </div>

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
                onClick={() => setShowAllSaved(!showAllSaved)}
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
                displayedSaved.map((interview, index) => (
                  <SavedInterviewCard
                    key={index}
                    interview={interview}
                    onViewDetails={() =>
                      handleViewDetails(
                        {
                          ...interview,
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
    </div>
  );
};

export default VerifiedDashboard;