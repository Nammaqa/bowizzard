import DashNav from "@/components/dashnav/dashnav";
import { useState } from "react";
import { Clipboard, Upload, Trash } from "lucide-react";

export default function LinkedInOptimization() {
  const [isUrlActive, setUrlActive] = useState(true);
  const [userProfileUrl, setUserProfileUrl] = useState("");
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [browsedFileName, setBrowsedFileName] = useState(
    <>
      <Upload /> Browse or Drop LinkedIn profile pdf...
    </>
  );

  const handleFileName = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setResumeFile(file);
      setBrowsedFileName(<>{file.name}</>);
    }
  };

  const handleFileDeletion = () => {
    setResumeFile(null);
    setBrowsedFileName(
      <>
        <Upload /> Browse or Drop LinkedIn profile pdf...
      </>
    );
  };

  {
    /* Reading the contents of clipboard */
  }
  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      if (text) {
        setUserProfileUrl(text);
      } else {
        alert("Clipboard is empty!");
      }
    } catch (err) {
      alert("Unable to access clipboard. Please paste manually.");
    }
  };

  return (
    <div className="flex flex-col h-screen">
      {/* Navigation Bar */}
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

          {/* Toggle button for users to provide the LinkiedIn user profile URL or the resume file PDF */}
          <div className="flex flex-col gap-6 mx-8 text-base">
            <div className="p-1.5 bg-white rounded-full flex items-center justify-center font-normal shadow-sm">
              <button
                className={`px-9 py-2 cursor-pointer flex items-center justify-center gap-1 rounded-full ${
                  isUrlActive === true
                    ? "bg-orange-500 rounded-full text-white"
                    : "bg-white"
                }`}
                aria-label="Paste from clipboard"
                onClick={() => {
                  setUrlActive(true);
                }}
              >
                <Clipboard />
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
                }}
              >
                <Upload />
                Upload LinkedIn Profile PDF
              </button>
            </div>

            {/* Depending on the user selection on toggle button either the text box to enter the LinkedIn porfile URL appears or
                the button to browse the pdf file appears */}
            {isUrlActive && (
              <div className="flex flex-1 gap-3">
                <input
                  type="text"
                  className="bg-white px-5 py-2 w-full flex-1 rounded-xl border-1 border-black outline-none shadow-sm"
                  placeholder="Paste LinkedIn Profile URL..."
                  value={userProfileUrl}
                  onChange={(e) => {
                    setUserProfileUrl(e.target.value);
                  }}
                />

                {/* Clipboard button to paste the content from the clipboard */}
                <div
                  className="bg-white p-4 rounded-full cursor-pointer shadow-sm"
                  onClick={handlePaste}
                >
                  <Clipboard className="size-6.5" />
                </div>
                <button className="bg-orange-400 px-5 py-2 rounded-xl text-white shadow-sm">
                  Submit
                </button>
              </div>
            )}
            {!isUrlActive && (
              <div className="flex flex-col gap-6.5">
                <div className="flex gap-3">
                  <div
                    className={`bg-white flex-1 px-4 py-2 rounded-xl border-black border-1 shadow-sm ${
                      resumeFile ? "flex pr-0 pt-0 pb-0" : ""
                    }`}
                  >
                    <label
                      htmlFor="file-upload"
                      className={`bg-white px-4 py-2 rounded-xl flex flex-1 justify-center items-center gap-2 cursor-pointer border-0 ${
                        resumeFile ? "flex-1 text-black" : "text-[gray]"
                      }`}
                    >
                      {browsedFileName}
                    </label>

                    {/* If the user selects a file from the system the file delete button appears on the right end of the same
                        same file browse button */}
                    {resumeFile && (
                      <button
                        className="p-4 cursor-pointer rounded-r-xl flex justify-center items-center border-black border-1"
                        aria-label="Remove the browsed resume file"
                        onClick={() => {
                          handleFileDeletion();
                        }}
                      >
                        <Trash className="text-red-500 size-5.5" />
                      </button>
                    )}
                    <input
                      type="file"
                      id="file-upload"
                      className="hidden"
                      onChange={handleFileName}
                      accept="application/pdf"
                    />
                  </div>
                  <button className="bg-orange-400 px-5 py-2 rounded-xl text-white shadow-sm">
                    Submit
                  </button>
                </div>

                {/* If the user selects the browse file from the system, steps to help the user how to browse the file from 
                    linkedIn appears, once the user selects the file it dissappears */}
                {!resumeFile && (
                  <div className="flex justify-center">
                    <div className="flex flex-col text-sm">
                      <p className="m-[10px] text-center">Steps</p>
                      <p>Step1: Go to your profile in LinkedIn</p>
                      <p>Step1: Click "Resources"</p>
                      <p>Step1: Click on to "Save to PDF"</p>
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
