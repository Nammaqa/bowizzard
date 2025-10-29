import React, { useState } from "react";
import { Upload, FileText } from "lucide-react";
import DashNav from "@/components/dashnav/dashnav";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [activeButton, setActiveButton] = useState("add");
  const [showUploadSection, setShowUploadSection] = useState(false);
  const navigate = useNavigate();

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (
      file &&
      (file.type === "application/pdf" ||
        file.type ===
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document")
    ) {
      setSelectedFile(file);
      console.log("File selected:", file.name);
    }
  };

  const handleAddDetailsMyself = () => {
    setActiveButton("add");
    setShowUploadSection(false);
    console.log("Add details myself clicked");
  };

  const handleEnterDataManually = () => {
    console.log('navigating');
    navigate("/profile/form");
  };

  const handleUploadResumeClick = () => {
    setActiveButton("upload");
    setShowUploadSection(true);
  };

  const handleSubmit = async () => {
    if (selectedFile) {
      console.log("Submitting file:", selectedFile.name);

      // TODO: Add API call here to parse resume
      // const parsedData = await parseResumeAPI(selectedFile);

      // Navigate to form with parsed data
      // navigate('/profile/form', { state: { parsedData } });
    }
  };

  const handleBrowseClick = () => {
    document.getElementById("file-upload-input").click();
  };

  return (
    <div className="flex flex-col h-screen overflow-hidden font-['Baloo_2']">
      <DashNav heading="Profile" />

      <div className="flex-1 bg-gray-50 overflow-hidden">
        <div className="bg-white rounded-lg m-3 md:m-5 h-[calc(100vh-110px)] overflow-auto flex flex-col">
          <div className="flex-1 max-w-5xl mx-auto text-center px-4 sm:px-6 md:px-8 flex flex-col justify-center py-8">
            <h1 className="text-2xl sm:text-3xl md:text-[2.5rem] font-semibold text-gray-900 mb-4 md:mb-5 leading-tight">
              Complete your profile to get personalized jobs, resumes, and prep.
            </h1>

            <p className="text-sm sm:text-base text-gray-700 mb-4 md:mb-5 font-normal">
              Add your profile details manually or upload your resume to
              auto-fill the information.
            </p>

            <p className="text-xs sm:text-[0.85rem] text-gray-600 mb-6 md:mb-10 max-w-4xl mx-auto leading-relaxed">
              If you choose to upload your resume, please note: details will be
              extracted automatically, but you'll still need to review and
              verify them for accuracy. If the resume is not in a structured
              format, some fields may not be captured. Supported formats: PDF
              and Word documents.
            </p>

            <div className="flex flex-col items-center gap-4 md:gap-5">
              {/* Combined Button with Sliding Animation */}
              <div
                className="relative bg-white border-2 border-gray-300 rounded-full shadow-sm w-full max-w-[580px]"
                style={{ height: "58px" }}
              >
                {/* Sliding Orange Background */}
                <div
                  className={`absolute top-0 h-full bg-orange-400 rounded-full transition-all duration-300 ease-in-out ${
                    activeButton === "upload"
                      ? "left-1/2 w-1/2"
                      : "left-0 w-1/2"
                  }`}
                  style={{ zIndex: 0 }}
                />

                {/* Buttons Container */}
                <div className="relative flex h-full" style={{ zIndex: 1 }}>
                  {/* Add Details Myself Button */}
                  <button
                    onClick={handleAddDetailsMyself}
                    className={`flex-1 flex items-center justify-center gap-1 sm:gap-2 font-medium text-xs sm:text-sm md:text-[15px] transition-colors duration-300 rounded-l-full cursor-pointer px-2 ${
                      activeButton === "add" ? "text-white" : "text-gray-800"
                    }`}
                  >
                    <FileText
                      size={16}
                      className="sm:w-[18px] sm:h-[18px] flex-shrink-0"
                    />
                    <span className="whitespace-nowrap">
                      Add Details Myself
                    </span>
                  </button>

                  {/* Upload Resume Button */}
                  <button
                    onClick={handleUploadResumeClick}
                    className={`flex-1 flex items-center justify-center gap-1 sm:gap-2 font-medium text-xs sm:text-sm md:text-[15px] transition-colors duration-300 rounded-r-full cursor-pointer px-2 ${
                      activeButton === "upload" ? "text-white" : "text-gray-800"
                    }`}
                  >
                    <Upload
                      size={16}
                      className="sm:w-[18px] sm:h-[18px] flex-shrink-0"
                    />
                    <span className="whitespace-nowrap hidden sm:inline">
                      Upload Resume (PDF/Word)
                    </span>
                    <span className="whitespace-nowrap sm:hidden">
                      Upload Resume
                    </span>
                  </button>
                </div>
              </div>

              {/* Upload Section - Shows when Upload Resume is clicked */}
              {showUploadSection && (
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full max-w-xl mt-2 px-2 sm:px-0">
                  <div
                    onClick={handleBrowseClick}
                    className="flex-1 border-2 border-gray-300 rounded-2xl px-4 sm:px-6 py-3 flex items-center justify-center gap-2 cursor-pointer hover:bg-gray-50 transition-colors"
                  >
                    <Upload
                      size={16}
                      className="sm:w-[18px] sm:h-[18px] text-gray-600 flex-shrink-0"
                    />
                    <span className="text-gray-600 text-xs sm:text-sm md:text-[15px] truncate">
                      {selectedFile
                        ? selectedFile.name
                        : "Browse or Drop your resume"}
                    </span>
                  </div>
                  <input
                    id="file-upload-input"
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileSelect}
                    className="hidden"
                  />
                  <button
                    onClick={handleSubmit}
                    className="px-6 sm:px-8 py-3.5 bg-orange-400 hover:bg-orange-500 text-white rounded-2xl font-medium text-sm sm:text-[15px] transition-colors duration-300 shadow-sm cursor-pointer"
                  >
                    Submit
                  </button>
                </div>
              )}

              {/* Enter Data Manually Button - Shows only when Add Details Myself is active */}
              {activeButton === "add" && (
                <button
                  onClick={handleEnterDataManually}
                  className="mt-2 px-6 sm:px-8 py-3.5 bg-orange-400 hover:bg-orange-500 text-white rounded-2xl font-medium text-sm sm:text-[15px] transition-colors duration-300 shadow-sm cursor-pointer"
                >
                  Enter Data Manually
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
