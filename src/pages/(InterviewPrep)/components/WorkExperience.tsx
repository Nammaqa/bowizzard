
import { useState } from "react";
import { Plus, Trash2, Calendar } from "lucide-react";

interface Experience {
  companyName: string;
  jobTitle: string;
  employmentType: string;
  location: string;
  workMode: string;
  startDate: string;
  endDate: string;
  currentlyWorking: boolean;
  description: string;
  isExpanded: boolean;
}

interface WorkExperienceProps {
  formData: any;
  setFormData: (data: any) => void;
  onNext: () => void;
  onPrevious: () => void;
}

const WorkExperience = ({
  formData,
  setFormData,
  onNext,
  onPrevious,
}: WorkExperienceProps) => {
  const [experiences, setExperiences] = useState<Experience[]>(
    formData.experiences || [
      {
        companyName: "",
        jobTitle: "",
        employmentType: "",
        location: "",
        workMode: "",
        startDate: "",
        endDate: "",
        currentlyWorking: false,
        description: "",
        isExpanded: true,
      },
    ]
  );

  const addExperience = () => {
    setExperiences([
      ...experiences,
      {
        companyName: "",
        jobTitle: "",
        employmentType: "",
        location: "",
        workMode: "",
        startDate: "",
        endDate: "",
        currentlyWorking: false,
        description: "",
        isExpanded: true,
      },
    ]);
  };

  const removeExperience = (index: number) => {
    setExperiences(experiences.filter((_, i) => i !== index));
  };

  const updateExperience = (index: number, field: string, value: any) => {
    const updated = [...experiences];
    updated[index] = { ...updated[index], [field]: value };
    setExperiences(updated);
  };

  const toggleExpand = (index: number) => {
    const updated = [...experiences];
    updated[index].isExpanded = !updated[index].isExpanded;
    setExperiences(updated);
  };

  const handleNext = () => {
    setFormData({ ...formData, experiences });
    onNext();
  };

  return (
    <div className="bg-white rounded-md p-6">
      <div className="space-y-6">
        {experiences.map((exp, index) => (
          <div key={index} className="border border-gray-200 rounded-md p-5">
            <div className="flex justify-between items-center mb-4">
              <h4 className="font-semibold text-[#3A3A3A]">
                Work Experience*
              </h4>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => toggleExpand(index)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  {exp.isExpanded ? (
                    <svg
                      className="w-5 h-5"
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
                  ) : (
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  )}
                </button>
                {index > 0 && (
                  <button
                    onClick={() => removeExperience(index)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 size={18} />
                  </button>
                )}
              </div>
            </div>

            {exp.isExpanded && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-gray-600 mb-1">
                    Company Name
                  </label>
                  <input
                    type="text"
                    value={exp.companyName}
                    onChange={(e) =>
                      updateExperience(index, "companyName", e.target.value)
                    }
                    placeholder="Enter Company Name"
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF8351]"
                  />
                </div>

                <div>
                  <label className="block text-xs text-gray-600 mb-1">
                    Job Title / Role
                  </label>
                  <input
                    type="text"
                    value={exp.jobTitle}
                    onChange={(e) =>
                      updateExperience(index, "jobTitle", e.target.value)
                    }
                    placeholder="Enter Job Title"
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF8351]"
                  />
                </div>

                <div>
                  <label className="block text-xs text-gray-600 mb-1">
                    Employment Type
                  </label>
                  <select
                    value={exp.employmentType}
                    onChange={(e) =>
                      updateExperience(index, "employmentType", e.target.value)
                    }
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF8351]"
                  >
                    <option value="">Select Employment Type</option>
                    <option value="fulltime">Full-time</option>
                    <option value="parttime">Part-time</option>
                    <option value="contract">Contract</option>
                    <option value="internship">Internship</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs text-gray-600 mb-1">
                    Work Mode
                  </label>
                  <select
                    value={exp.workMode}
                    onChange={(e) =>
                      updateExperience(index, "workMode", e.target.value)
                    }
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF8351]"
                  >
                    <option value="">Select Work Mode</option>
                    <option value="onsite">On-site</option>
                    <option value="remote">Remote</option>
                    <option value="hybrid">Hybrid</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs text-gray-600 mb-1">
                    Location
                  </label>
                  <select
                    value={exp.location}
                    onChange={(e) =>
                      updateExperience(index, "location", e.target.value)
                    }
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF8351]"
                  >
                    <option value="">Select Location</option>
                    <option value="bangalore">Bangalore</option>
                    <option value="mumbai">Mumbai</option>
                    <option value="delhi">Delhi</option>
                  </select>
                </div>

                <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-gray-600 mb-1">
                      Start Date
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="Select Start Date"
                        className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF8351]"
                      />
                      <Calendar
                        size={16}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs text-gray-600 mb-1">
                      End Date
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="Select End Date"
                        disabled={exp.currentlyWorking}
                        className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF8351] disabled:bg-gray-50"
                      />
                      <Calendar
                        size={16}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                      />
                      <label className="flex items-center gap-2 mt-2 text-xs text-gray-600">
                        <input
                          type="checkbox"
                          checked={exp.currentlyWorking}
                          onChange={(e) =>
                            updateExperience(
                              index,
                              "currentlyWorking",
                              e.target.checked
                            )
                          }
                          className="rounded"
                        />
                        Currently Working here
                      </label>
                    </div>
                  </div>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-xs text-gray-600 mb-1">
                    Description
                  </label>
                  <textarea
                    value={exp.description}
                    onChange={(e) =>
                      updateExperience(index, "description", e.target.value)
                    }
                    placeholder="Provide Description / Projects of your work"
                    rows={3}
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF8351] resize-none"
                  />
                </div>
              </div>
            )}
          </div>
        ))}

        <button
          onClick={addExperience}
          className="flex items-center gap-2 text-[#FF8351] font-medium text-sm hover:text-[#FF9D48] transition-colors"
        >
          <Plus size={18} />
          Add Work Experience
        </button>

        {/* Navigation Buttons */}
        <div className="flex justify-end mt-6 space-x-4">
          <button
            onClick={onPrevious}
            className="px-6 py-2.5 rounded-md border-2 border-[#FF8351] text-[#FF8351] font-semibold hover:bg-[#FFF5F0] transition-colors"
          >
            Previous
          </button>
          <button
            onClick={handleNext}
            className="px-6 py-2.5 rounded-md text-white font-semibold transition-transform hover:scale-105"
            style={{
              background: "linear-gradient(180deg, #FF9D48 0%, #FF8251 100%)",
            }}
          >
            Proceed to next
          </button>
        </div>
      </div>
    </div>
  );
};

export default WorkExperience;