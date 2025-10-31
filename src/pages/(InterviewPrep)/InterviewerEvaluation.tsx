import React, { useState } from "react";
import DashNav from "@/components/dashnav/dashnav";

const SkillBadge = ({ skill }: { skill: string }) => (
  <div className="flex flex-col items-center bg-white w-[140px] pb-[1px] rounded-lg">
    <span className="text-[#3A3A3A] text-base">{skill}</span>
  </div>
);

const RatingSection = React.memo(
  ({
    title,
    description,
    category,
    ratings,
    comments,
    handleRatingChange,
    handleCommentChange,
  }: {
    title: string;
    description: string;
    category: string;
    ratings: Record<string, number>;
    comments: Record<string, string>;
    handleRatingChange: (category: string, value: number) => void;
    handleCommentChange: (category: string, value: string) => void;
  }) => (
    <div className="flex flex-col items-start self-stretch bg-white py-5 mb-6 rounded-lg border border-solid border-[#CACACA]">
      <div className="flex flex-col items-start mb-3 ml-5">
        <span className="text-[#3A3A3A] text-lg font-medium">{title}</span>
      </div>
      <div className="flex flex-col items-start mb-4 ml-5">
        <span className="text-[#7F7F7F] text-sm leading-relaxed">{description}</span>
      </div>
      <div className="flex items-center self-stretch mb-4 mx-5">
        <div className="flex flex-col items-center mr-4">
          <span className="text-[#3A3A3A] text-sm font-medium">RATE:</span>
        </div>
        <div className="flex gap-2">
          {[1, 2, 3, 4, 5].map((value) => (
            <button
              key={value}
              onClick={() => handleRatingChange(category, value)}
              className={`flex items-center justify-center w-8 h-8 rounded border border-solid transition-all ${
                ratings[category] === value
                  ? "bg-[#FFF0E3] border-[#F26D3A] text-[#F26D3A]"
                  : "bg-white border-[#CACACA] text-[#3A3A3A]"
              }`}
            >
              <span className="text-sm font-medium">{value}</span>
            </button>
          ))}
        </div>
      </div>
      <div className="flex flex-col items-start self-stretch mx-5">
        <span className="text-[#3A3A3A] text-sm font-medium mb-2">Comments</span>
        <textarea
          value={comments[category] || ""}
          onChange={(e) => handleCommentChange(category, e.target.value)}
          placeholder="Type your comments here!!"
          className="w-full h-20 pt-2 px-3 rounded border border-solid border-[#CACACA] text-[#3A3A3A] text-sm resize-none focus:outline-none focus:border-[#F26D3A]"
        />
      </div>
    </div>
  )
);

const InterviewerEvaluation = () => {
  const [interviewData] = useState({
    id: "#12345",
    name: "Interview Name",
    candidateProfile: "Python Developer",
    experience: { years: 1, months: 2 },
    date: "31 AUG 2025",
    time: "03:00 PM - 04:00 PM",
    primarySkills: ["Skill 1", "Skill 2", "Skill 3", "Skill 4", "Skill 5", "Skill 6", "Skill 7"],
    secondarySkills: ["Skill 1", "Skill 2", "Skill 3", "Skill 4", "Skill 5", "Skill 6", "Skill 7"],
  });

  const [ratings, setRatings] = useState({
    technical: 0,
    communication: 0,
    problemSolving: 0,
    collaboration: 0,
    timeManagement: 0,
    overall: 0,
  });

  const [comments, setComments] = useState({
    technical: "",
    communication: "",
    problemSolving: "",
    collaboration: "",
    timeManagement: "",
    overall: "",
    final: "",
  });

  const handleRatingChange = (category: string, value: number) => {
    setRatings((prev) => ({ ...prev, [category]: value }));
  };

  const handleCommentChange = (category: string, value: string) => {
    setComments((prev) => ({ ...prev, [category]: value }));
  };

  const handleSubmit = () => {
    const evaluationData = {
      interviewId: interviewData.id,
      ratings,
      comments,
      submittedAt: new Date().toISOString(),
    };
    console.log("Evaluation submitted:", evaluationData);
    alert("Evaluation submitted successfully!");
  };

  const handleCancel = () => {
    if (confirm("Are you sure you want to cancel? All unsaved changes will be lost.")) {
      setRatings({
        technical: 0,
        communication: 0,
        problemSolving: 0,
        collaboration: 0,
        timeManagement: 0,
        overall: 0,
      });
      setComments({
        technical: "",
        communication: "",
        problemSolving: "",
        collaboration: "",
        timeManagement: "",
        overall: "",
        final: "",
      });
    }
  };

  return (
    <div className="flex flex-col h-screen font-['Baloo_2'] overflow-hidden">
      <DashNav heading="Give Mock Interview" />
      <div className="flex-1 overflow-auto bg-[#F5F5F5] p-4 lg:p-8">
        <div className="max-w-7xl mx-auto w-full">
          <div className="bg-white rounded-[20px] mb-6 shadow-sm">
            <div className="pt-5 pb-8">
              <div className="flex flex-col items-start mb-5 ml-5">
                <span className="text-[#F26D3A] text-xl font-semibold">
                  Interview ID: {interviewData.id}
                </span>
              </div>
              <div className="border-t border-[#DEDEDE] mx-5 mb-5"></div>
              <div className="flex flex-wrap items-center mb-5 gap-3 ml-7">
                <span className="text-black text-xl">Interview Name:</span>
                <span className="text-black text-xl font-semibold">
                  {interviewData.name}
                </span>
              </div>
              <div className="flex flex-wrap justify-between mb-5 mx-7">
                <div className="flex items-center gap-2">
                  <span className="text-black text-lg">Candidate Profile:</span>
                  <span className="text-black text-lg font-semibold">
                    {interviewData.candidateProfile}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-black text-lg">Experience:</span>
                  <span className="text-black text-lg font-semibold">
                    {interviewData.experience.years} Year(s), {interviewData.experience.months} Month(s)
                  </span>
                </div>
              </div>
              <div className="flex flex-wrap justify-between items-center mb-5 mx-7 gap-4">
                <div className="flex items-center gap-2">
                  <svg
                    className="w-6 h-6"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M8 2V5M16 2V5M3.5 9.09H20.5M21 8.5V17C21 20 19.5 22 16 22H8C4.5 22 3 20 3 17V8.5C3 5.5 4.5 3.5 8 3.5H16C19.5 3.5 21 5.5 21 8.5Z"
                      stroke="#3A3A3A"
                      strokeWidth="1.5"
                      strokeMiterlimit="10"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span className="text-black text-base">{interviewData.date}</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg
                    className="w-6 h-6"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                      stroke="#3A3A3A"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M12 6V12L16 14"
                      stroke="#3A3A3A"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span className="text-black text-base">{interviewData.time}</span>
                </div>
              </div>
              <div className="border-t border-[#DEDEDE] mx-5 mb-5"></div>
              <div className="px-5">
                <div className="mb-5">
                  <span className="block text-black text-base mb-3">Primary Skills</span>
                  <div className="flex flex-wrap gap-3">
                    {interviewData.primarySkills.map((skill, i) => (
                      <SkillBadge key={i} skill={skill} />
                    ))}
                  </div>
                </div>
                <div>
                  <span className="block text-black text-base mb-3">Secondary Skills</span>
                  <div className="flex flex-wrap gap-3">
                    {interviewData.secondarySkills.map((skill, i) => (
                      <SkillBadge key={i} skill={skill} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-[20px] shadow-sm p-5">
            <span className="text-[#3A3A3A] text-lg font-medium mb-5 block">
              INTERVIEWER EVALUATION
            </span>
            <RatingSection
              title="1. Technical Skills and Expertise"
              description="Assess the candidate's depth of knowledge in relevant technologies, programming languages, frameworks, and tools."
              category="technical"
              ratings={ratings}
              comments={comments}
              handleRatingChange={handleRatingChange}
              handleCommentChange={handleCommentChange}
            />
            <RatingSection
              title="2. Communication Skills"
              description="Evaluate how clearly the candidate articulates their thoughts, explains complex concepts, and responds to questions."
              category="communication"
              ratings={ratings}
              comments={comments}
              handleRatingChange={handleRatingChange}
              handleCommentChange={handleCommentChange}
            />
            <RatingSection
              title="3. Problem-solving Ability"
              description="Assess the candidate's analytical thinking, approach to solving problems, and ability to handle technical challenges."
              category="problemSolving"
              ratings={ratings}
              comments={comments}
              handleRatingChange={handleRatingChange}
              handleCommentChange={handleCommentChange}
            />
            <RatingSection
              title="4. Teamwork and Collaboration Skills"
              description="Evaluate the candidate's ability to work in a team environment, collaborate with others, and handle feedback."
              category="collaboration"
              ratings={ratings}
              comments={comments}
              handleRatingChange={handleRatingChange}
              handleCommentChange={handleCommentChange}
            />
            <RatingSection
              title="5. Time and Task Management"
              description="Assess the candidate's ability to prioritize tasks, manage time effectively, and meet deadlines."
              category="timeManagement"
              ratings={ratings}
              comments={comments}
              handleRatingChange={handleRatingChange}
              handleCommentChange={handleCommentChange}
            />
            <RatingSection
              title="6. Overall Impression"
              description="Provide your overall assessment of the candidate considering all aspects discussed during the interview."
              category="overall"
              ratings={ratings}
              comments={comments}
              handleRatingChange={handleRatingChange}
              handleCommentChange={handleCommentChange}
            />
            <div className="flex flex-col bg-white py-5 mb-6 rounded-lg border border-solid border-[#CACACA]">
              <div className="ml-5 mb-3">
                <span className="text-[#3A3A3A] text-lg font-medium">FINAL COMMENTS</span>
              </div>
              <div className="mx-5">
                <span className="text-[#7F7F7F] text-sm block mb-2">
                  Provide any additional comments or observations about the candidate that weren't covered in the previous sections.
                </span>
                <textarea
                  value={comments.final || ""}
                  onChange={(e) => handleCommentChange("final", e.target.value)}
                  placeholder="Type your comments here!!"
                  className="w-full h-20 pt-2 px-3 rounded border border-solid border-[#CACACA] text-[#3A3A3A] text-sm resize-none focus:outline-none focus:border-[#F26D3A]"
                />
              </div>
            </div>
            <div className="flex justify-end gap-3 pt-2">
              <button
                onClick={handleCancel}
                className="px-8 py-2 border border-solid border-[#CACACA] text-[#3A3A3A] rounded text-base font-medium hover:bg-gray-50 transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className="px-8 py-2 bg-[#F26D3A] text-white rounded text-base font-medium hover:bg-[#E05C29] transition-colors cursor-pointer"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InterviewerEvaluation;
