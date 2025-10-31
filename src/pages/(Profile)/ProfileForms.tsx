import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import DashNav from "@/components/dashnav/dashnav";
import ProfileStepper from "./components/ProfileStepper";
import PersonalDetailsForm from "./components/PersonalDetailsForm";
import EducationDetailsForm from "./components/EducationDetailsForm";
import ExperienceDetailsForm from "./components/ExperienceDetailsForm";
import ProjectDetailsForm from "./components/ProjectDetailsForm";
import SkillsLinksDetailsForm from "./components/SkillsLinksDetailsForm";
import CertificationDetailsForm from "./components/CertificationDetailsForm";

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
  const [validationErrors, setValidationErrors] = useState<{
    [key: string]: boolean;
  }>({});
  
  const location = useLocation();
  const navigate = useNavigate();
  const parsedData = location.state?.parsedData;

  const steps = [
    "Personal",
    "Education",
    "Experience",
    "Projects",
    "Skills & Links",
    "Certification",
  ];

  // Validation function to check if step has any validation errors
  const validateStepData = (stepIndex: number, data: any): boolean => {
    const stepKeys = [
      "personal",
      "education",
      "experience",
      "projects",
      "skills",
      "certification",
    ];
    
    // Basic validation - check if data exists
    if (!data || Object.keys(data).length === 0) {
      return false;
    }

    // Step-specific validation
    switch (stepIndex) {
      case 0: // Personal Details
        // Check if required fields have values
        if (!data.firstName || !data.lastName) {
          return false;
        }
        // Check email format
        if (data.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
          return false;
        }
        // Check phone format (if provided)
        if (data.phoneNumber && !/^[0-9]{10,15}$/.test(data.phoneNumber.replace(/[\s-]/g, ''))) {
          return false;
        }
        break;

      case 1: // Education Details
        // Check if at least one education entry exists with required fields
        if (data.educationDetails && Array.isArray(data.educationDetails)) {
          const hasValidEducation = data.educationDetails.some(
            (edu: any) => edu.institutionName && edu.degree
          );
          if (!hasValidEducation) {
            return false;
          }
        }
        break;

      case 2: // Experience Details
        // Check if job role is selected
        if (!data.jobRole) {
          return false;
        }
        break;

      case 3: // Projects
        // Projects are optional, so always return true
        break;

      case 4: // Skills & Links
        // Check if at least one skill exists
        if (data.skills && Array.isArray(data.skills)) {
          const hasValidSkill = data.skills.some((skill: any) => skill.skillName);
          if (!hasValidSkill) {
            return false;
          }
        }
        break;

      case 5: // Certification
        // Certifications are optional, so always return true
        break;
    }

    return true;
  };

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
    
    const updatedFormData = {
      ...formData,
      [stepKeys[currentStep]]: data,
    };
    
    setFormData(updatedFormData);

    // Validate the current step data
    const isValid = validateStepData(currentStep, data);
    setValidationErrors((prev) => ({
      ...prev,
      [stepKeys[currentStep]]: !isValid,
    }));

    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Final submission - validate all steps
      let hasErrors = false;
      const allErrors: { [key: string]: boolean } = {};

      stepKeys.forEach((key, index) => {
        const stepData = index === currentStep ? data : formData[key as keyof typeof formData];
        const isStepValid = validateStepData(index, stepData);
        if (!isStepValid) {
          hasErrors = true;
          allErrors[key] = true;
        }
      });

      if (hasErrors) {
        setValidationErrors(allErrors);
        console.log("Validation errors found. Please complete all required fields.");
        // Optionally, scroll to first error or show a message
        return;
      }

      // All validation passed - prepare for API integration
      console.log("Final form data:", updatedFormData);
      
      // TODO: API call will go here
      // Example:
      // try {
      //   const response = await submitProfileData(updatedFormData);
      //   if (response.success) {
      //     navigate('/dashboard');
      //   }
      // } catch (error) {
      //   console.error('Submission error:', error);
      // }
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleStepClick = (stepIndex: number) => {
    // Allow navigation to any step (user can review/edit previous steps)
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
        return (
          <EducationDetailsForm
            onNext={handleNext}
            onBack={handleBack}
            initialData={formData.education}
          />
        );
      case 2:
        return (
          <ExperienceDetailsForm
            onNext={handleNext}
            onBack={handleBack}
            initialData={formData.experience}
          />
        );
      case 3:
        return (
          <ProjectDetailsForm
            onNext={handleNext}
            onBack={handleBack}
            initialData={formData.projects}
          />
        );
      case 4:
        return (
          <SkillsLinksDetailsForm
            onNext={handleNext}
            onBack={handleBack}
            initialData={formData.skills}
          />
        );
      case 5:
        return (
          <CertificationDetailsForm
            onNext={handleNext}
            onBack={handleBack}
            initialData={formData.certification}
          />
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