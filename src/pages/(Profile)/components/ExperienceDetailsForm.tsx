import React, { useState } from "react";
import { ChevronDown, RotateCcw, Trash2, Plus } from "lucide-react";

interface ExperienceDetailsFormProps {
  onNext: (data: any) => void;
  onBack: () => void;
  initialData?: any;
}

interface WorkExperience {
  id: string;
  jobRole: string;
  companyName: string;
  jobTitle: string;
  employmentType: string;
  location: string;
  workMode: string;
  startDate: string;
  endDate: string;
  description: string;
  currentlyWorking: boolean;
  isExpanded?: boolean;
}

export default function ExperienceDetailsForm({
  onNext,
  onBack,
  initialData = {},
}: ExperienceDetailsFormProps) {
  const [jobRole, setJobRole] = useState(initialData.jobRole || "");
  const [jobRoleExpanded, setJobRoleExpanded] = useState(true);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const [workExperiences, setWorkExperiences] = useState<WorkExperience[]>(
    initialData.workExperiences || [
      {
        id: "1",
        jobRole: "",
        companyName: "",
        jobTitle: "",
        employmentType: "",
        location: "",
        workMode: "",
        startDate: "",
        endDate: "",
        description: "",
        currentlyWorking: false,
        isExpanded: true,
      },
    ]
  );

  // Validation functions
  const validateCompanyName = (value: string) => {
    if (value && !/^[a-zA-Z0-9\s.,&'-]+$/.test(value)) {
      return "Invalid characters in company name";
    }
    return "";
  };

  const validateJobTitle = (value: string) => {
    if (value && !/^[a-zA-Z0-9\s./-]+$/.test(value)) {
      return "Invalid characters in job title";
    }
    return "";
  };

  const validateDateRange = (startDate: string, endDate: string) => {
    if (startDate && endDate) {
      if (endDate < startDate) {
        return "End date cannot be before start date";
      }
    }
    return "";
  };

  const handleJobRoleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setJobRole(e.target.value);
  };

  const handleExperienceChange = (
    index: number,
    field: string,
    value: string | boolean
  ) => {
    const updated = [...workExperiences];
    updated[index] = { ...updated[index], [field]: value };
    setWorkExperiences(updated);

    // Validate fields
    if (field === "companyName" && typeof value === "string") {
      const error = validateCompanyName(value);
      setErrors((prev) => ({ ...prev, [`exp-${index}-companyName`]: error }));
    } else if (field === "jobTitle" && typeof value === "string") {
      const error = validateJobTitle(value);
      setErrors((prev) => ({ ...prev, [`exp-${index}-jobTitle`]: error }));
    } else if (field === "startDate" && typeof value === "string") {
      const error = validateDateRange(value, updated[index].endDate);
      setErrors((prev) => ({ ...prev, [`exp-${index}-endDate`]: error }));
    } else if (field === "endDate" && typeof value === "string") {
      const error = validateDateRange(updated[index].startDate, value);
      setErrors((prev) => ({ ...prev, [`exp-${index}-endDate`]: error }));
    }
  };

  const toggleExperienceExpanded = (index: number) => {
    const updated = [...workExperiences];
    updated[index] = {
      ...updated[index],
      isExpanded: !updated[index].isExpanded,
    };
    setWorkExperiences(updated);
  };

  const resetExperience = (index: number) => {
    const updated = [...workExperiences];
    updated[index] = {
      ...updated[index],
      companyName: "",
      jobTitle: "",
      employmentType: "",
      location: "",
      workMode: "",
      startDate: "",
      endDate: "",
      description: "",
      currentlyWorking: false,
    };
    setWorkExperiences(updated);

    // Clear errors for this experience
    setErrors((prev) => {
      const newErrors = { ...prev };
      delete newErrors[`exp-${index}-companyName`];
      delete newErrors[`exp-${index}-jobTitle`];
      delete newErrors[`exp-${index}-endDate`];
      return newErrors;
    });
  };

  const addWorkExperience = () => {
    setWorkExperiences([
      ...workExperiences,
      {
        id: Date.now().toString(),
        jobRole: "",
        companyName: "",
        jobTitle: "",
        employmentType: "",
        location: "",
        workMode: "",
        startDate: "",
        endDate: "",
        description: "",
        currentlyWorking: false,
        isExpanded: true,
      },
    ]);
  };

  const removeWorkExperience = (index: number) => {
    if (workExperiences.length > 1) {
      setWorkExperiences(workExperiences.filter((_, i) => i !== index));
      
      // Clear errors for removed experience
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[`exp-${index}-companyName`];
        delete newErrors[`exp-${index}-jobTitle`];
        delete newErrors[`exp-${index}-endDate`];
        return newErrors;
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext({
      jobRole,
      workExperiences,
    });
  };

  const renderExperienceCard = (
    experience: WorkExperience,
    index: number,
    showDelete: boolean = false
  ) => {
    return (
      <div
        key={experience.id}
        className="bg-white border border-gray-200 rounded-xl mb-4 md:mb-5 overflow-hidden"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 sm:px-5 md:px-6 py-3 md:py-4 border-b border-gray-200">
          <h3 className="text-sm sm:text-base md:text-lg font-semibold text-gray-900">
            Work Experience
          </h3>
          <div className="flex gap-2 items-center">
            <button
              type="button"
              onClick={() => toggleExperienceExpanded(index)}
              className="w-5 h-5 flex items-center justify-center rounded-full border-2 border-gray-600 hover:bg-gray-100 transition-colors"
            >
              <ChevronDown
                className={`w-3 h-3 text-gray-600 transition-transform cursor-pointer ${
                  !experience.isExpanded ? "rotate-180" : ""
                }`}
                strokeWidth={2.5}
              />
            </button>
            <button
              type="button"
              onClick={() => resetExperience(index)}
              className="w-5 h-5 flex items-center justify-center rounded-full border-2 border-gray-600 hover:bg-gray-100 transition-colors"
            >
              <RotateCcw
                className="w-3 h-3 text-gray-600 cursor-pointer"
                strokeWidth={2.5}
              />
            </button>
            {showDelete && (
              <button
                type="button"
                onClick={() => removeWorkExperience(index)}
                className="w-5 h-5 flex items-center justify-center rounded border-2 border-red-500 hover:bg-red-50 transition-colors"
              >
                <Trash2
                  className="w-3 h-3 text-red-500 cursor-pointer"
                  strokeWidth={2.5}
                />
              </button>
            )}
          </div>
        </div>

        {/* Content */}
        {experience.isExpanded && (
          <div className="p-4 sm:p-5 md:p-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              {/* Company Name */}
              <div className="sm:col-span-2">
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5">
                  Company Name
                </label>
                <input
                  type="text"
                  value={experience.companyName}
                  onChange={(e) =>
                    handleExperienceChange(index, "companyName", e.target.value)
                  }
                  placeholder="Enter Company Name"
                  className={`w-full px-3 py-2 sm:py-2.5 border rounded-lg focus:outline-none focus:ring-2 text-xs sm:text-sm ${
                    errors[`exp-${index}-companyName`]
                      ? "border-red-500 focus:ring-red-400"
                      : "border-gray-300 focus:ring-orange-400 focus:border-transparent"
                  }`}
                />
                {errors[`exp-${index}-companyName`] && (
                  <p className="mt-1 text-xs text-red-500">
                    {errors[`exp-${index}-companyName`]}
                  </p>
                )}
              </div>

              {/* Job Title/Role */}
              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5">
                  Job Title/ Role
                </label>
                <input
                  type="text"
                  value={experience.jobTitle}
                  onChange={(e) =>
                    handleExperienceChange(index, "jobTitle", e.target.value)
                  }
                  placeholder="Enter Job Title"
                  className={`w-full px-3 py-2 sm:py-2.5 border rounded-lg focus:outline-none focus:ring-2 text-xs sm:text-sm ${
                    errors[`exp-${index}-jobTitle`]
                      ? "border-red-500 focus:ring-red-400"
                      : "border-gray-300 focus:ring-orange-400 focus:border-transparent"
                  }`}
                />
                {errors[`exp-${index}-jobTitle`] && (
                  <p className="mt-1 text-xs text-red-500">
                    {errors[`exp-${index}-jobTitle`]}
                  </p>
                )}
              </div>

              {/* Employment Type */}
              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5">
                  Employment Type
                </label>
                <div className="relative">
                  <select
                    value={experience.employmentType}
                    onChange={(e) =>
                      handleExperienceChange(
                        index,
                        "employmentType",
                        e.target.value
                      )
                    }
                    className="w-full px-3 py-2 sm:py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent text-xs sm:text-sm appearance-none bg-white pr-8"
                  >
                    <option value="">Select Employment Type</option>
                    <option value="Full-time">Full-time</option>
                    <option value="Part-time">Part-time</option>
                    <option value="Contract">Contract</option>
                    <option value="Internship">Internship</option>
                    <option value="Freelance">Freelance</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                </div>
              </div>

              {/* Location */}
              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5">
                  Location
                </label>
                <div className="relative">
                  <select
                    value={experience.location}
                    onChange={(e) =>
                      handleExperienceChange(index, "location", e.target.value)
                    }
                    className="w-full px-3 py-2 sm:py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent text-xs sm:text-sm appearance-none bg-white pr-8"
                  >
                    <option value="">Select Location</option>
                    <option value="Bangalore">Bangalore</option>
                    <option value="Mumbai">Mumbai</option>
                    <option value="Delhi">Delhi</option>
                    <option value="Hyderabad">Hyderabad</option>
                    <option value="Pune">Pune</option>
                    <option value="Chennai">Chennai</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                </div>
              </div>

              {/* Work Mode */}
              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5">
                  Work Mode
                </label>
                <div className="relative">
                  <select
                    value={experience.workMode}
                    onChange={(e) =>
                      handleExperienceChange(index, "workMode", e.target.value)
                    }
                    className="w-full px-3 py-2 sm:py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent text-xs sm:text-sm appearance-none bg-white pr-8"
                  >
                    <option value="">Select Work Mode</option>
                    <option value="On-site">On-site</option>
                    <option value="Remote">Remote</option>
                    <option value="Hybrid">Hybrid</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                </div>
              </div>

              {/* Start Date */}
              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5">
                  Start Date
                </label>
                <div className="relative">
                  <input
                    type="month"
                    value={experience.startDate}
                    onChange={(e) =>
                      handleExperienceChange(index, "startDate", e.target.value)
                    }
                    placeholder="Select Start Date"
                    className="w-full px-3 py-2 sm:py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent text-xs sm:text-sm pr-8"
                  />
                </div>
              </div>

              {/* End Date */}
              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5">
                  End Date
                </label>
                <div className="relative">
                  <input
                    type="month"
                    value={experience.endDate}
                    onChange={(e) =>
                      handleExperienceChange(index, "endDate", e.target.value)
                    }
                    placeholder="Select End Date"
                    disabled={experience.currentlyWorking}
                    className={`w-full px-3 py-2 sm:py-2.5 border rounded-lg focus:outline-none focus:ring-2 text-xs sm:text-sm pr-8 disabled:bg-gray-100 ${
                      errors[`exp-${index}-endDate`]
                        ? "border-red-500 focus:ring-red-400"
                        : "border-gray-300 focus:ring-orange-400 focus:border-transparent"
                    }`}
                  />
                </div>
                {errors[`exp-${index}-endDate`] && (
                  <p className="mt-1 text-xs text-red-500">
                    {errors[`exp-${index}-endDate`]}
                  </p>
                )}
              </div>

              {/* Currently Working Here Checkbox */}
              <div className="sm:col-span-2 flex items-center">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={experience.currentlyWorking}
                    onChange={(e) =>
                      handleExperienceChange(
                        index,
                        "currentlyWorking",
                        e.target.checked
                      )
                    }
                    className="w-4 h-4 text-orange-400 border-gray-300 rounded focus:ring-orange-400"
                  />
                  <span className="text-xs sm:text-sm text-gray-700">
                    Currently Working here
                  </span>
                </label>
              </div>

              {/* Description */}
              <div className="sm:col-span-2">
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5">
                  Description
                </label>
                <textarea
                  value={experience.description}
                  onChange={(e) =>
                    handleExperienceChange(index, "description", e.target.value)
                  }
                  placeholder="Provide Description / Projects of your Work"
                  rows={4}
                  className="w-full px-3 py-2 sm:py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent text-xs sm:text-sm resize-none"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="px-3 sm:px-4 md:px-6 lg:px-8 py-4 md:py-6">
      <div className="max-w-6xl mx-auto">
        {/* Step Header */}
        <div className="mb-4 md:mb-6">
          <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-900 mb-1">
            Step 3: Work Details
          </h2>
          <p className="text-xs sm:text-sm text-gray-600">
            Add your professional experience. Include company, role, and
            responsibilities to highlight your career journey. It's recommended
            to add work details that align with a single career path.
          </p>
        </div>

        {/* Job Role Section */}
        <div className="bg-white border border-gray-200 rounded-xl mb-4 md:mb-5 overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between px-4 sm:px-5 md:px-6 py-3 md:py-4 border-b border-gray-200">
            <h3 className="text-sm sm:text-base md:text-lg font-semibold text-gray-900">
              Job Role*
            </h3>
            <div className="flex gap-2 items-center">
              <button
                type="button"
                onClick={() => setJobRoleExpanded(!jobRoleExpanded)}
                className="w-5 h-5 flex items-center justify-center rounded-full border-2 border-gray-600 hover:bg-gray-100 transition-colors"
              >
                <ChevronDown
                  className={`w-3 h-3 text-gray-600 transition-transform cursor-pointer ${
                    !jobRoleExpanded ? "rotate-180" : ""
                  }`}
                  strokeWidth={2.5}
                />
              </button>
              <button
                type="button"
                onClick={() => setJobRole("")}
                className="w-5 h-5 flex items-center justify-center rounded-full border-2 border-gray-600 hover:bg-gray-100 transition-colors"
              >
                <RotateCcw
                  className="w-3 h-3 text-gray-600 cursor-pointer"
                  strokeWidth={2.5}
                />
              </button>
            </div>
          </div>

          {/* Content */}
          {jobRoleExpanded && (
            <div className="p-4 sm:p-5 md:p-6">
              <p className="text-xs sm:text-sm text-gray-600 mb-4">
                We'll use your job role to tailor resumes, prep, and interviews
                for you. Make sure it's entered correctly so everything matches.
              </p>
              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5">
                  Job Role
                </label>
                <div className="relative">
                  <select
                    value={jobRole}
                    onChange={handleJobRoleChange}
                    className="w-full px-3 py-2 sm:py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent text-xs sm:text-sm appearance-none bg-white pr-8"
                  >
                    <option value="">Select Job Role</option>
                    <option value="Software Engineer">Software Engineer</option>
                    <option value="Senior Software Engineer">
                      Senior Software Engineer
                    </option>
                    <option value="Full Stack Developer">
                      Full Stack Developer
                    </option>
                    <option value="Frontend Developer">
                      Frontend Developer
                    </option>
                    <option value="Backend Developer">Backend Developer</option>
                    <option value="DevOps Engineer">DevOps Engineer</option>
                    <option value="Data Scientist">Data Scientist</option>
                    <option value="Product Manager">Product Manager</option>
                    <option value="UI/UX Designer">UI/UX Designer</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Work Experience Cards */}
        {workExperiences.map((exp, index) =>
          renderExperienceCard(exp, index, workExperiences.length > 1)
        )}

        {/* Add Work Experience Button */}
        <button
          type="button"
          onClick={addWorkExperience}
          className="flex items-center gap-2 px-4 py-2.5 text-orange-400 hover:text-orange-500 font-medium text-sm transition-colors mb-4 md:mb-5 cursor-pointer"
        >
          <Plus className="w-4 h-4 cursor-pointer" />
          Add Work Experience
        </button>

        {/* Action Buttons */}
        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={onBack}
            className="px-6 sm:px-8 py-2.5 sm:py-3 border-2 border-orange-300 hover:border-orange-400 text-orange-400 rounded-xl font-medium text-xs sm:text-sm transition-colors cursor-pointer"
          >
            Previous
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            style={{
              background: "linear-gradient(180deg, #FF9D48 0%, #FF8251 100%)",
            }}
            className="px-6 sm:px-8 py-2.5 sm:py-3 bg-orange-400 hover:bg-orange-500 text-white rounded-xl font-medium text-xs sm:text-sm transition-colors shadow-sm cursor-pointer"
          >
            Proceed to next
          </button>
        </div>
      </div>
    </div>
  );
}