import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import DashNav from "@/components/dashnav/dashnav";
import ProfileStepper from "./components/ProfileStepper";
import PersonalDetailsForm from "./components/PersonalDetailsForm";
import EducationDetailsForm from "./components/EducationDetailsForm";

export default function ProfileForm() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    personal: {},
    education: {},
    experience: {},
    projects: {},
    skills: {},
    certification: {},
  });
  const location = useLocation();
  const parsedData = location.state?.parsedData;

  const steps = [
    "Personal",
    "Education",
    "Experience",
    "Projects",
    "Skills & Links",
    "Certification",
  ];

  const handleNext = (data: any) => {
    // Update form data for current step
    const stepKeys = [
      "personal",
      "education",
      "experience",
      "projects",
      "skills",
      "certification",
    ];
    setFormData((prev) => ({
      ...prev,
      [stepKeys[currentStep]]: data,
    }));

    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Final submission - prepare for API integration
      console.log("Final form data:", formData);
      // TODO: API call will go here
    }
  };


  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleStepClick = (stepIndex: number) => {
    setCurrentStep(stepIndex);
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <PersonalDetailsForm
            onNext={handleNext}
            onBack={handleBack}
            initialData={formData.personal}
          />
        );
      case 1:
        // TODO: Education form component
        return (
          <EducationDetailsForm
            onNext={handleNext}
            onBack={handleBack}
            initialData={formData.education}
          />
        );
      case 2:
        // TODO: Experience form component
        return (
          <div className="text-center py-8">Experience Form - Coming Soon</div>
        );
      case 3:
        // TODO: Projects form component
        return (
          <div className="text-center py-8">Projects Form - Coming Soon</div>
        );
      case 4:
        // TODO: Skills & Links form component
        return (
          <div className="text-center py-8">
            Skills & Links Form - Coming Soon
          </div>
        );
      case 5:
        // TODO: Certification form component
        return (
          <div className="text-center py-8">
            Certification Form - Coming Soon
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col h-screen overflow-hidden font-['Baloo_2']">
      <DashNav heading="Profile" />

      <div className="flex-1 bg-gray-50 overflow-hidden">
        <div className="bg-white rounded-lg m-3 md:m-5 h-[calc(100vh-110px)] overflow-auto flex flex-col">
          {/* Header Section */}
          <div className="border-b border-gray-200 px-4 sm:px-6 md:px-8 py-4 md:py-5">
            <p className="text-sm sm:text-base text-gray-700 mb-3 md:mb-4">
              Providing your details in profile helps us personalize every step
              - from building the right resume to preparing you for interviews
              that matter.
            </p>

            {/* Stepper */}
            <ProfileStepper
              steps={steps}
              currentStep={currentStep}
              onStepClick={handleStepClick}
            />
          </div>

          {/* Form Content */}
          <div className="flex-1 overflow-auto">{renderStepContent()}</div>
        </div>
      </div>
    </div>
  );
}
