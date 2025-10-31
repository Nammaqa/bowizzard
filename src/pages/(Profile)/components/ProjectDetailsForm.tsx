import React, { useState } from "react";
import { ChevronDown, RotateCcw, Trash2, Plus } from "lucide-react";

interface ProjectDetailsFormProps {
  onNext: (data: any) => void;
  onBack: () => void;
  initialData?: any;
}

interface Project {
  id: string;
  projectTitle: string;
  projectType: string;
  startDate: string;
  endDate: string;
  currentlyWorking: boolean;
  description: string;
  rolesAndResponsibilities: string;
  isExpanded: boolean;
}

export default function ProjectDetailsForm({
  onNext,
  onBack,
  initialData = {},
}: ProjectDetailsFormProps) {
  const [projects, setProjects] = useState<Project[]>(
    initialData.projects || [
      {
        id: "1",
        projectTitle: "",
        projectType: "",
        startDate: "",
        endDate: "",
        currentlyWorking: false,
        description: "",
        rolesAndResponsibilities: "",
        isExpanded: true,
      },
    ]
  );

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  // Validation functions
  const validateProjectTitle = (value: string) => {
    if (value && !/^[a-zA-Z0-9\s.,-]+$/.test(value)) {
      return "Invalid characters in project title";
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

  const handleProjectChange = (
    index: number,
    field: string,
    value: string | boolean
  ) => {
    const updated = [...projects];
    updated[index] = { ...updated[index], [field]: value };
    setProjects(updated);

    // Validate fields
    if (field === "projectTitle" && typeof value === "string") {
      const error = validateProjectTitle(value);
      setErrors((prev) => ({ ...prev, [`project-${index}-projectTitle`]: error }));
    } else if (field === "startDate" && typeof value === "string") {
      const error = validateDateRange(value, updated[index].endDate);
      setErrors((prev) => ({ ...prev, [`project-${index}-endDate`]: error }));
    } else if (field === "endDate" && typeof value === "string") {
      const error = validateDateRange(updated[index].startDate, value);
      setErrors((prev) => ({ ...prev, [`project-${index}-endDate`]: error }));
    }
  };

  const toggleExpand = (index: number) => {
    const updated = [...projects];
    updated[index] = {
      ...updated[index],
      isExpanded: !updated[index].isExpanded,
    };
    setProjects(updated);
  };

  const resetProject = (index: number) => {
    const updated = [...projects];
    updated[index] = {
      ...updated[index],
      projectTitle: "",
      projectType: "",
      startDate: "",
      endDate: "",
      currentlyWorking: false,
      description: "",
      rolesAndResponsibilities: "",
    };
    setProjects(updated);

    // Clear errors for this project
    setErrors((prev) => {
      const newErrors = { ...prev };
      delete newErrors[`project-${index}-projectTitle`];
      delete newErrors[`project-${index}-endDate`];
      return newErrors;
    });
  };

  const addProject = () => {
    setProjects([
      ...projects,
      {
        id: Date.now().toString(),
        projectTitle: "",
        projectType: "",
        startDate: "",
        endDate: "",
        currentlyWorking: false,
        description: "",
        rolesAndResponsibilities: "",
        isExpanded: true,
      },
    ]);
  };

  const removeProject = (index: number) => {
    if (projects.length > 1 && index > 0) {
      setProjects(projects.filter((_, i) => i !== index));
      
      // Clear errors for removed project
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[`project-${index}-projectTitle`];
        delete newErrors[`project-${index}-endDate`];
        return newErrors;
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext({ projects });
  };

  const renderProjectCard = (project: Project, index: number) => (
    <div
      key={project.id}
      className="bg-white border border-gray-200 rounded-xl mb-4 md:mb-5 overflow-hidden"
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 sm:px-5 md:px-6 py-3 md:py-4 border-b border-gray-200">
        <h3 className="text-sm sm:text-base md:text-lg font-semibold text-gray-900">
          Project {index + 1}
        </h3>
        <div className="flex gap-2 items-center">
          <button
            type="button"
            onClick={() => toggleExpand(index)}
            className="w-5 h-5 flex items-center justify-center rounded-full border-2 border-gray-600 hover:bg-gray-100 transition-colors"
          >
            <ChevronDown
              className={`w-3 h-3 text-gray-600 transition-transform cursor-pointer ${
                !project.isExpanded ? "rotate-180" : ""
              }`}
              strokeWidth={2.5}
            />
          </button>
          <button
            type="button"
            onClick={() => resetProject(index)}
            className="w-5 h-5 flex items-center justify-center rounded-full border-2 border-gray-600 hover:bg-gray-100 transition-colors"
          >
            <RotateCcw
              className="w-3 h-3 text-gray-600 cursor-pointer"
              strokeWidth={2.5}
            />
          </button>
          {index > 0 && (
            <button
              type="button"
              onClick={() => removeProject(index)}
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
      {project.isExpanded && (
        <div className="p-4 sm:p-5 md:p-6">
          <div className="space-y-3 sm:space-y-4">
            {/* Project Title */}
            <div>
              <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5">
                Project Title
              </label>
              <input
                type="text"
                value={project.projectTitle}
                onChange={(e) =>
                  handleProjectChange(index, "projectTitle", e.target.value)
                }
                placeholder="Enter Project Title"
                className={`w-full px-3 py-2 sm:py-2.5 border rounded-lg focus:outline-none focus:ring-2 text-xs sm:text-sm ${
                  errors[`project-${index}-projectTitle`]
                    ? "border-red-500 focus:ring-red-400"
                    : "border-gray-300 focus:ring-orange-400 focus:border-transparent"
                }`}
              />
              {errors[`project-${index}-projectTitle`] && (
                <p className="mt-1 text-xs text-red-500">
                  {errors[`project-${index}-projectTitle`]}
                </p>
              )}
            </div>

            {/* Project Type, Start Date, End Date Row */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
              {/* Project Type */}
              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5">
                  Project Type
                </label>
                <div className="relative">
                  <select
                    value={project.projectType}
                    onChange={(e) =>
                      handleProjectChange(index, "projectType", e.target.value)
                    }
                    className="w-full px-3 py-2 sm:py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent text-xs sm:text-sm appearance-none bg-white pr-8"
                  >
                    <option value="">Select Project Type</option>
                    <option value="Personal">Personal</option>
                    <option value="Academic">Academic</option>
                    <option value="Professional">Professional</option>
                    <option value="Open Source">Open Source</option>
                    <option value="Freelance">Freelance</option>
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
                    value={project.startDate}
                    onChange={(e) =>
                      handleProjectChange(index, "startDate", e.target.value)
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
                    value={project.endDate}
                    onChange={(e) =>
                      handleProjectChange(index, "endDate", e.target.value)
                    }
                    placeholder="Select End Date"
                    disabled={project.currentlyWorking}
                    className={`w-full px-3 py-2 sm:py-2.5 border rounded-lg focus:outline-none focus:ring-2 text-xs sm:text-sm pr-8 disabled:bg-gray-100 ${
                      errors[`project-${index}-endDate`]
                        ? "border-red-500 focus:ring-red-400"
                        : "border-gray-300 focus:ring-orange-400 focus:border-transparent"
                    }`}
                  />
                </div>
                {errors[`project-${index}-endDate`] && (
                  <p className="mt-1 text-xs text-red-500">
                    {errors[`project-${index}-endDate`]}
                  </p>
                )}
              </div>
            </div>

            {/* Currently Working Checkbox */}
            <div className="flex items-center">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={project.currentlyWorking}
                  onChange={(e) =>
                    handleProjectChange(
                      index,
                      "currentlyWorking",
                      e.target.checked
                    )
                  }
                  className="w-4 h-4 text-orange-400 border-gray-300 rounded focus:ring-orange-400"
                />
                <span className="text-xs sm:text-sm text-gray-700">
                  Currently Working
                </span>
              </label>
            </div>

            {/* Description */}
            <div>
              <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5">
                Description
              </label>
              <textarea
                value={project.description}
                onChange={(e) =>
                  handleProjectChange(index, "description", e.target.value)
                }
                placeholder="Provide Description of your project.."
                rows={4}
                className="w-full px-3 py-2 sm:py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent text-xs sm:text-sm resize-none"
              />
            </div>

            {/* Roles & Responsibilities */}
            <div>
              <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5">
                Roles & Responsibilities
              </label>
              <textarea
                value={project.rolesAndResponsibilities}
                onChange={(e) =>
                  handleProjectChange(
                    index,
                    "rolesAndResponsibilities",
                    e.target.value
                  )
                }
                placeholder="Provide your roles & responsibilities in the project.."
                rows={4}
                className="w-full px-3 py-2 sm:py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent text-xs sm:text-sm resize-none"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div className="px-3 sm:px-4 md:px-6 lg:px-8 py-4 md:py-6">
      <div className="max-w-6xl mx-auto">
        {/* Step Header */}
        <div className="mb-4 md:mb-6">
          <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-900 mb-1">
            Step 4: Projects
          </h2>
          <p className="text-xs sm:text-sm text-gray-600">
            Showcase academic or personal projects that demonstrate your skills
            and problem-solving ability.
          </p>
        </div>

        {/* Project Cards */}
        {projects.map((project, index) => renderProjectCard(project, index))}

        {/* Add Project Button */}
        <button
          type="button"
          onClick={addProject}
          className="flex items-center gap-2 px-4 py-2.5 text-orange-400 hover:text-orange-500 font-medium text-sm transition-colors mb-4 md:mb-5 cursor-pointer"
        >
          <Plus className="w-4 h-4 cursor-pointer" />
          Add Project
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