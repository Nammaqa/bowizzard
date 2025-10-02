import DashNav from "@/components/dashnav/dashnav";
import { ArrowRight } from "lucide-react";

const MockInterview = () => {
  return (
    <div className="flex flex-col h-screen font-['Baloo_2']">
      <DashNav heading="Mock Interview" />

      <div className="flex-1 max-h-screen overflow-auto bg-[#F0F0F0] p-2 sm:p-4 lg:p-6">
        <div className="max-w-7xl mx-auto">
          {/* Description */}
          <div className="bg-white rounded-md p-5 mb-6">
            <p className="text-[#3A3A3A] text-sm sm:text-base leading-relaxed">
              Ace your next opportunity with real-world practice. Our Mock
              Interview pairs you with experienced professionals who simulate
              actual interview scenarios. Gain personalized feedback, sharpen
              your responses, and build the confidence needed to succeed in any
              role or domain.
            </p>
          </div>

          {/* Interview Options */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
            {/* Give Interview Card */}
            <div className="bg-white rounded-md overflow-hidden shadow-sm flex flex-col">
              <div className="h-40 overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=600&h=400&fit=crop"
                  alt="Give Interview"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="text-[#FF8351] text-lg sm:text-xl font-semibold mb-3">
                  Give Interview
                </h3>
                <p className="text-[#3A3A3A] text-sm sm:text-base leading-relaxed mb-4">
                  Gain real interview practice with industry experts. Improve
                  your confidence, sharpen your skills, and receive valuable
                  feedback.
                </p>
                <button
                  onClick={() =>
                    (window.location.href =
                      "/interview-prep/give-mock-interview")
                  }
                  className="w-full py-2.5 rounded-md text-white text-sm sm:text-base font-semibold transition-transform hover:scale-102 cursor-pointer"
                  style={{
                    background:
                      "linear-gradient(180deg, #FF9D48 0%, #FF8251 100%)",
                  }}
                >
                  Give Interview
                </button>
              </div>
            </div>

            {/* Take Interview Card */}
            <div className="bg-white rounded-md overflow-hidden shadow-sm flex flex-col">
              <div className="h-40 overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&h=400&fit=crop"
                  alt="Take Interview"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="text-[#FF8351] text-lg sm:text-xl font-semibold mb-3">
                  Take Interview
                </h3>
                <p className="text-[#3A3A3A] text-sm sm:text-base leading-relaxed mb-4">
                  Conduct interviews to guide aspiring professionals. Share your
                  expertise, support their growth, and earn rewards in return.
                </p>
                <button
                  className="w-full py-2.5 rounded-md text-white text-sm sm:text-base font-semibold transition-transform hover:scale-102 cursor-pointer"
                  style={{
                    background:
                      "linear-gradient(180deg, #FF9D48 0%, #FF8251 100%)",
                  }}
                >
                  Take Interview
                </button>
              </div>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Career Path Card */}
            <div className="bg-white rounded-md p-4 max-h-[250px] overflow-hidden">
              <h3 className="text-xs sm:text-sm font-semibold text-[#FF8351] uppercase tracking-wide mb-2">
                PREPARING FOR A NEW CAREER PATH?
              </h3>
              <h4 className="text-[#3A3A3A] text-sm sm:text-base font-medium mb-3 leading-snug">
                Create a New Role that ensures your resume, skills, and
                interview practice match the domain.
              </h4>
              <button
                className="flex items-center gap-2 px-4 py-1.5 rounded-md text-white text-xs sm:text-sm font-semibold transition-transform hover:scale-102 cursor-pointer"
                style={{
                  background:
                    "linear-gradient(180deg, #FF9D48 0%, #FF8251 100%)",
                }}
              >
                Create new role
                <ArrowRight size={14} />
              </button>
            </div>

            {/* Community Banner */}
            <div
              className="rounded-md p-4 flex flex-col justify-center max-h-[250px]"
              style={{
                background: "linear-gradient(90deg, #FFE8C8 0%, #FFEFD8 100%)",
              }}
            >
              <h4 className="text-[#3A3A3A] text-sm sm:text-base font-medium mb-3">
                One IT Community, Endless Opportunities - NammaQA Community
              </h4>
              <button className="flex items-center gap-2 px-4 py-1.5 rounded-md bg-white text-[#FF8251] text-xs sm:text-sm font-semibold transition-transform hover:scale-102 self-start cursor-pointer">
                Join Now
                <ArrowRight size={14} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MockInterview;
