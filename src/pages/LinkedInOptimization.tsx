import DashNav from "@/components/dashnav/dashnav";
import React, { useEffect, useRef, useState } from "react";
import { Clipboard, Upload, Trash } from "lucide-react";

export default function LinkedInOptimization() {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [isUrlActive, setUrlActive] = useState(true);
  const [userProfileUrl, setUserProfileUrl] = useState("");
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [browsedFileName, setBrowsedFileName] = useState(
    "Browse or Drop LinkedIn profile pdf..."
  );

  // Updating file and filename
  const handleFileName = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setResumeFile(file);
      setBrowsedFileName(file.name);
    }
  };

  // File deletion
  const handleFileDeletion = () => {
    setResumeFile(null);
    setBrowsedFileName("Browse or Drop LinkedIn profile pdf...");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // Pasting the copied content from clipboard to the text box
  const handlePaste = async () => {
    try {
      const text = (await navigator.clipboard.readText()).trim();
      if (text) setUserProfileUrl(text);
      else alert("Clipboard is empty!");
    } catch {
      alert("Unable to access clipboard. Please paste manually.");
    }
  };

  // Ensures whether the the LinkedIn profile URL entered by user is valid
  const handleURLSubmit = () => {
    const LINKEDIN_URL = "https://www.linkedin.com/in/";
    if (userProfileUrl) {
      if (
        userProfileUrl.startsWith(LINKEDIN_URL) &&
        userProfileUrl.length > LINKEDIN_URL.length
      )
        alert("LinkedIn URL submitted successfully!");
      else alert("Invalid LinkedIn URL! Enter valid one...");
    } else alert("Please enter the LinkedIn user profile URL!");
  };

  // Ensures files under 2MB are only accepted
  const handleFileSubmit = () => {
    const MAX_FILE_SIZE = 2 * 1024 * 1024;
    if (resumeFile) {
      if (resumeFile.size > MAX_FILE_SIZE)
        alert("File size exceeds 2MB! Select smaller file...");
      else alert("File submitted successfully!");
    } else alert("Please select a file!");
  };

  // Handles dragging feature and makes the drop area highlight while dragging the file
  const handleDrag =
    (isActive: boolean) => (e: React.DragEvent<HTMLDivElement>) => {
      if (isUrlActive) return; // only active in PDF mode
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(isActive);
    };

  // Handles file drop, file validation etc.
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    if (isUrlActive) return;
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const droppedFile = e.dataTransfer.files[0];
    if (!droppedFile) return;

    // Ensures only PDF files are accepted
    if (droppedFile.type !== "application/pdf") {
      alert("Only PDF files are allowed!");
      return;
    }

    // Adding the dragged file into hidden input tag(so input.files reflects it)
    if (fileInputRef.current) {
      const dt = new DataTransfer();
      dt.items.add(droppedFile);
      fileInputRef.current.files = dt.files;
    }

    // Updating the file and filename
    setResumeFile(droppedFile);
    setBrowsedFileName(droppedFile.name);
  };

  // Prevent default navigation if a file is dropped outside the drop area
  useEffect(() => {
    const prevent = (e: DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
    };
    window.addEventListener("dragover", prevent);
    window.addEventListener("drop", prevent);
    return () => {
      window.removeEventListener("dragover", prevent);
      window.removeEventListener("drop", prevent);
    };
  }, []);

  return (
    <div className="flex flex-col h-screen">
      <DashNav heading={"LinkedIn Optimization"} />

      <div className="flex flex-col flex-1 overflow-auto">
        <div className="flex flex-col items-center gap-6 min-h-screen justify-center relative">
          <h1 className="text-4xl mx-8 text-center">
            Find Out If Your{" "}
            <span className="underline text-amber-500">LinkedIn Profile</span>{" "}
            is Recruiter-Ready
          </h1>
          <p className="text-base mx-8 text-center">
            Know your LinkedIn score and unlock smart recommendations to level
            up your career presence
          </p>

          <div className="flex flex-col gap-6 mx-8 text-base">
            {/* Toggle button for the user to select either paste the LinkedIn User Profile URl or uload the PDF file */}
            <div className="p-1 bg-white rounded-full flex items-center justify-center font-normal shadow-sm">
              <button
                className={`px-9 py-2 cursor-pointer flex items-center justify-center gap-1 rounded-full ${
                  isUrlActive === true
                    ? "bg-orange-500 rounded-full text-white"
                    : "bg-white"
                }`}
                aria-label="Paste from clipboard"
                onClick={() => {
                  setUrlActive(true);
                  handleFileDeletion();
                }}
              >
                <Clipboard className="size-5" />
                Paste LinkedIn Profile URL
              </button>

              <button
                className={`px-9 py-2 cursor-pointer flex items-center justify-center gap-1 rounded-full ${
                  isUrlActive === false
                    ? "bg-orange-500 rounded-full text-white"
                    : "bg-white"
                }`}
                aria-label="Upload a resume file from the system"
                onClick={() => {
                  setUrlActive(false);
                  setUserProfileUrl("");
                }}
              >
                <Upload className="size-5" />
                Upload LinkedIn Profile PDF
              </button>
            </div>

            {isUrlActive && (
              <div className="flex flex-1 gap-3">
                <input
                  type="text"
                  className="bg-white px-5 h-12 w-full flex-1 rounded-[10px] border border-black outline-none shadow-sm"
                  placeholder="Paste LinkedIn Profile URL..."
                  value={userProfileUrl}
                  onChange={(e) => setUserProfileUrl(e.target.value)}
                />
                <div
                  className="bg-white h-12 w-12 flex justify-center items-center rounded-full cursor-pointer shadow-sm"
                  onClick={handlePaste}
                >
                  <Clipboard className="" />
                </div>
                <button
                  className="bg-orange-400 px-5 h-12 rounded-[10px] text-white shadow-sm cursor-pointer"
                  onClick={handleURLSubmit}
                >
                  Submit
                </button>
              </div>
            )}

            {!isUrlActive && (
              <div className="flex flex-col gap-6.5">
                <div className="flex gap-3">
                  {/* Drop Target - User drops the file and browses the file manually here*/}
                  <div
                    onDragEnter={handleDrag(true)}
                    onDragOver={handleDrag(true)}
                    onDragLeave={handleDrag(false)}
                    onDrop={handleDrop}
                    className={`bg-white flex flex-1 rounded-[10px] flex-shrink min-w-0 max-w-[478px] h-12 border-black border shadow-sm items-center
                      ${
                        isDragging
                          ? "border-dashed border-2 border-orange-500"
                          : ""
                      }`}
                  >
                    {/* Shows the file name that has been loaded */}
                    <label
                      htmlFor="file-upload"
                      className={`bg-white rounded-[10px] px-3 sm:px-5 h-full flex flex-1 justify-center items-center gap-2 cursor-pointer flex-shrink min-w-0
                        ${resumeFile ? "text-black" : "text-[gray] w-full"}`}
                    >
                      {!resumeFile ? (
                        <>
                          <Upload className="size-5" />
                          <span>Browse or Drop LinkedIn profile pdf...</span>
                        </>
                      ) : (
                        <span className="overflow-hidden whitespace-nowrap text-ellipsis min-w-0 inline-block flex-shrink">
                          {browsedFileName}
                        </span>
                      )}
                    </label>

                    {/* Delete — To remove the loaded PDF file */}
                    {resumeFile && (
                      <button
                        className="px-3 h-12 cursor-pointer rounded-r-xl flex justify-center items-center"
                        aria-label="Remove the browsed resume file"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleFileDeletion();
                        }}
                      >
                        <Trash className="text-red-500 size-4" />
                      </button>
                    )}

                    {/* hidden input */}
                    <input
                      type="file"
                      id="file-upload"
                      className="hidden"
                      ref={fileInputRef}
                      onChange={handleFileName}
                      accept="application/pdf"
                    />
                  </div>

                  <button
                    className="bg-orange-400 h-12 px-5 rounded-[10px] text-white shadow-sm cursor-pointer"
                    onClick={handleFileSubmit}
                  >
                    Submit
                  </button>
                </div>

                {/* Steps for the user to follow how to get the User Profile PDF from LinkedIn */}
                {!resumeFile && (
                  <div className="flex justify-center">
                    <div className="flex flex-col text-sm">
                      <p className="m-[10px] text-center">Steps</p>
                      <p>Step 1: Go to your profile in LinkedIn</p>
                      <p>Step 2: Click "Resources"</p>
                      <p>Step 3: Click on to "Save to PDF"</p>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        <div className="flex text-base w-full justify-between px-2 pb-6 max-sm:flex-col max-sm:items-center">
          <a
            href="https://wizzybox.com/privacy-policy/"
            className="underline [text-decoration-skip-ink:none] underline-offset-[2px]"
          >
            Privacy Policy
          </a>
          <a
            href="https://policies.google.com/terms?utm_source=about.google&utm_medium=referral&utm_campaign=footer"
            className="underline [text-decoration-skip-ink:none] underline-offset-[2px]"
          >
            Terms And Conditions
          </a>
        </div>
      </div>
    </div>
  );
}
