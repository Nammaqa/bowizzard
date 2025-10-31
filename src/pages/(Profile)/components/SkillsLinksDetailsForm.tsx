import React, { useState } from "react";
import { Plus, Trash2, ChevronDown, RotateCcw, X } from "lucide-react";

interface SkillsLinksFormProps {
  onNext: (data: any) => void;
  onBack: () => void;
  initialData?: any;
}

interface Skill {
  id: string;
  skillName: string;
  skillLevel: string;
}

interface Link {
  id: string;
  linkedinProfile: string;
  githubProfile: string;
  portfolioUrl: string;
  portfolioDescription: string;
  publicationUrl: string;
  publicationDescription: string;
}

export default function SkillsLinksDetailsForm({
  onNext,
  onBack,
  initialData = {},
}: SkillsLinksFormProps) {
  const [skills, setSkills] = useState<Skill[]>(
    initialData.skills || [
      { id: "1", skillName: "", skillLevel: "" },
      { id: "2", skillName: "", skillLevel: "" },
    ]
  );

  const [links, setLinks] = useState<Link[]>(
    initialData.links || [
      {
        id: "1",
        linkedinProfile: "",
        githubProfile: "",
        portfolioUrl: "",
        portfolioDescription: "",
        publicationUrl: "",
        publicationDescription: "",
      },
    ]
  );

  const [skillsExpanded, setSkillsExpanded] = useState(true);
  const [linksExpanded, setLinksExpanded] = useState(true);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  // Validation functions
  const validateSkillName = (value: string) => {
    if (value && !/^[a-zA-Z0-9\s.+#-]+$/.test(value)) {
      return "Invalid characters in skill name";
    }
    return "";
  };

  const validateUrl = (value: string, type: string) => {
    if (!value) return "";
    
    // Basic URL format validation
    const urlPattern = /^(https?:\/\/)?([\w\-]+(\.[\w\-]+)+)([\w\-\.,@?^=%&:/~\+#]*[\w\-@?^=%&/~\+#])?$/;
    
    if (!urlPattern.test(value)) {
      return `Invalid ${type} URL format`;
    }

    // Specific validation for LinkedIn
    if (type === "LinkedIn" && value && !value.includes("linkedin.com")) {
      return "Please enter a valid LinkedIn URL";
    }

    // Specific validation for GitHub
    if (type === "GitHub" && value && !value.includes("github.com")) {
      return "Please enter a valid GitHub URL";
    }

    return "";
  };

  const handleSkillChange = (index: number, field: string, value: string) => {
    const updated = [...skills];
    updated[index] = { ...updated[index], [field]: value };
    setSkills(updated);

    // Validate skill name
    if (field === "skillName") {
      const error = validateSkillName(value);
      setErrors((prev) => ({ ...prev, [`skill-${index}-skillName`]: error }));
    }
  };

  const addSkill = () => {
    setSkills([
      ...skills,
      {
        id: Date.now().toString(),
        skillName: "",
        skillLevel: "",
      },
    ]);
  };

  const removeSkill = (index: number) => {
    if (skills.length > 1) {
      setSkills(skills.filter((_, i) => i !== index));
      
      // Clear errors for removed skill
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[`skill-${index}-skillName`];
        return newErrors;
      });
    }
  };

  const resetSkills = () => {
    setSkills([
      { id: "1", skillName: "", skillLevel: "" },
      { id: "2", skillName: "", skillLevel: "" },
    ]);
    
    // Clear all skill errors
    setErrors((prev) => {
      const newErrors = { ...prev };
      Object.keys(newErrors).forEach(key => {
        if (key.startsWith('skill-')) {
          delete newErrors[key];
        }
      });
      return newErrors;
    });
  };

  const toggleSkillsExpand = () => {
    setSkillsExpanded(!skillsExpanded);
  };

  const handleLinkChange = (
    linkIndex: number,
    field: string,
    value: string
  ) => {
    const updated = [...links];
    updated[linkIndex] = { ...updated[linkIndex], [field]: value };
    setLinks(updated);

    // Validate URLs
    if (field === "linkedinProfile") {
      const error = validateUrl(value, "LinkedIn");
      setErrors((prev) => ({ ...prev, [`link-${linkIndex}-linkedinProfile`]: error }));
    } else if (field === "githubProfile") {
      const error = validateUrl(value, "GitHub");
      setErrors((prev) => ({ ...prev, [`link-${linkIndex}-githubProfile`]: error }));
    } else if (field === "portfolioUrl") {
      const error = validateUrl(value, "Portfolio");
      setErrors((prev) => ({ ...prev, [`link-${linkIndex}-portfolioUrl`]: error }));
    } else if (field === "publicationUrl") {
      const error = validateUrl(value, "Publication");
      setErrors((prev) => ({ ...prev, [`link-${linkIndex}-publicationUrl`]: error }));
    }
  };

  const clearLinkField = (linkIndex: number, field: string) => {
    const updated = [...links];
    updated[linkIndex] = { ...updated[linkIndex], [field]: "" };
    setLinks(updated);
    
    // Clear error for this field
    setErrors((prev) => {
      const newErrors = { ...prev };
      delete newErrors[`link-${linkIndex}-${field}`];
      return newErrors;
    });
  };

  const addLink = () => {
    setLinks([
      ...links,
      {
        id: Date.now().toString(),
        linkedinProfile: "",
        githubProfile: "",
        portfolioUrl: "",
        portfolioDescription: "",
        publicationUrl: "",
        publicationDescription: "",
      },
    ]);
  };

  const removeLink = (index: number) => {
    if (links.length > 1) {
      setLinks(links.filter((_, i) => i !== index));
      
      // Clear errors for removed link
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[`link-${index}-linkedinProfile`];
        delete newErrors[`link-${index}-githubProfile`];
        delete newErrors[`link-${index}-portfolioUrl`];
        delete newErrors[`link-${index}-publicationUrl`];
        return newErrors;
      });
    }
  };

  const resetLinks = () => {
    setLinks([
      {
        id: "1",
        linkedinProfile: "",
        githubProfile: "",
        portfolioUrl: "",
        portfolioDescription: "",
        publicationUrl: "",
        publicationDescription: "",
      },
    ]);
    
    // Clear all link errors
    setErrors((prev) => {
      const newErrors = { ...prev };
      Object.keys(newErrors).forEach(key => {
        if (key.startsWith('link-')) {
          delete newErrors[key];
        }
      });
      return newErrors;
    });
  };

  const toggleLinksExpand = () => {
    setLinksExpanded(!linksExpanded);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext({ skills, links });
  };

  return (
    <div className="px-3 sm:px-4 md:px-6 lg:px-8 py-4 md:py-6">
      <div className="max-w-6xl mx-auto">
        {/* Step Header */}
        <div className="mb-4 md:mb-6">
          <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-900 mb-1">
            Step 5: Links & Skills
          </h2>
          <p className="text-xs sm:text-sm text-gray-600">
            Add portfolio links, profile links, publication links and key skills
            related to your job role.
          </p>
        </div>

        {/* Skills Section */}
        <div className="bg-white border border-gray-200 rounded-xl mb-4 md:mb-5 overflow-hidden">
          {/* Skills Header */}
          <div className="flex items-center justify-between px-4 sm:px-5 md:px-6 py-3 md:py-4 border-b border-gray-200">
            <h3 className="text-sm sm:text-base md:text-lg font-semibold text-gray-900">
              Skills
            </h3>
            <div className="flex gap-2 items-center">
              <button
                type="button"
                onClick={toggleSkillsExpand}
                className="w-5 h-5 flex items-center justify-center rounded-full border-2 border-gray-600 hover:bg-gray-100 transition-colors"
              >
                <ChevronDown
                  className={`w-3 h-3 text-gray-600 cursor-pointer transition-transform ${
                    !skillsExpanded ? "rotate-180" : ""
                  }`}
                  strokeWidth={2.5}
                />
              </button>
              <button
                type="button"
                onClick={resetSkills}
                className="w-5 h-5 flex items-center justify-center rounded-full border-2 border-gray-600 hover:bg-gray-100 transition-colors"
              >
                <RotateCcw
                  className="w-3 h-3 text-gray-600 cursor-pointer"
                  strokeWidth={2.5}
                />
              </button>
            </div>
          </div>

          {/* Skills Content */}
          {skillsExpanded && (
            <div className="p-4 sm:p-5 md:p-6">
              <div className="space-y-3">
                {skills.map((skill, index) => (
                  <div key={skill.id}>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 items-start">
                      {/* Skill Name */}
                      <div>
                        <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5">
                          Skill
                        </label>
                        <div className="relative">
                          <input
                            type="text"
                            value={skill.skillName}
                            onChange={(e) =>
                              handleSkillChange(
                                index,
                                "skillName",
                                e.target.value
                              )
                            }
                            placeholder="Enter Skill Name..."
                            className={`w-full px-3 py-2 sm:py-2.5 border rounded-lg focus:outline-none focus:ring-2 text-xs sm:text-sm pr-8 ${
                              errors[`skill-${index}-skillName`]
                                ? "border-red-500 focus:ring-red-400"
                                : "border-gray-300 focus:ring-orange-400 focus:border-transparent"
                            }`}
                          />
                          {skill.skillName && (
                            <button
                              type="button"
                              onClick={() =>
                                handleSkillChange(index, "skillName", "")
                              }
                              className="absolute right-3 top-1/2 -translate-y-1/2 p-0.5 hover:bg-gray-100 rounded-full transition-colors"
                            >
                              <X className="w-3.5 h-3.5 text-gray-500 cursor-pointer" />
                            </button>
                          )}
                        </div>
                        {errors[`skill-${index}-skillName`] && (
                          <p className="mt-1 text-xs text-red-500">
                            {errors[`skill-${index}-skillName`]}
                          </p>
                        )}
                      </div>

                      {/* Skill Level */}
                      <div className="flex gap-2 items-end">
                        <div className="flex-1">
                          <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5">
                            Skill Level
                          </label>
                          <div className="relative">
                            <select
                              value={skill.skillLevel}
                              onChange={(e) =>
                                handleSkillChange(
                                  index,
                                  "skillLevel",
                                  e.target.value
                                )
                              }
                              className="w-full px-3 py-2 sm:py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent text-xs sm:text-sm appearance-none bg-white pr-8"
                            >
                              <option value="">Select Skill Level</option>
                              <option value="Beginner">Beginner</option>
                              <option value="Intermediate">Intermediate</option>
                              <option value="Advanced">Advanced</option>
                              <option value="Expert">Expert</option>
                            </select>
                            <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1">
                              <ChevronDown className="w-4 h-4 text-gray-400 pointer-events-none" />
                            </div>
                          </div>
                        </div>
                        {skills.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeSkill(index)}
                            className="w-9 h-9 flex items-center justify-center rounded border-2 border-red-500 hover:bg-red-50 transition-colors flex-shrink-0 cursor-pointer"
                          >
                            <Trash2
                              className="w-4 h-4 text-red-500 cursor-pointer"
                              strokeWidth={2.5}
                            />
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}

                {/* Add Skill Button */}
                <button
                  type="button"
                  onClick={addSkill}
                  className="flex items-center gap-2 px-4 py-2 text-orange-400 hover:text-orange-500 font-medium text-xs sm:text-sm transition-colors cursor-pointer"
                >
                  <Plus className="w-4 h-4 cursor-pointer" />
                  Add Skill
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Links Section */}
        {links.map((link, linkIndex) => (
          <div
            key={link.id}
            className="bg-white border border-gray-200 rounded-xl mb-4 md:mb-5 overflow-hidden"
          >
            {/* Links Header */}
            <div className="flex items-center justify-between px-4 sm:px-5 md:px-6 py-3 md:py-4 border-b border-gray-200">
              <h3 className="text-sm sm:text-base md:text-lg font-semibold text-gray-900">
                Links
              </h3>
              <div className="flex gap-2 items-center">
                <button
                  type="button"
                  onClick={toggleLinksExpand}
                  className="w-5 h-5 flex items-center justify-center rounded-full border-2 border-gray-600 hover:bg-gray-100 transition-colors"
                >
                  <ChevronDown
                    className={`w-3 h-3 text-gray-600 cursor-pointer transition-transform ${
                      !linksExpanded ? "rotate-180" : ""
                    }`}
                    strokeWidth={2.5}
                  />
                </button>
                <button
                  type="button"
                  onClick={resetLinks}
                  className="w-5 h-5 flex items-center justify-center rounded-full border-2 border-gray-600 hover:bg-gray-100 transition-colors"
                >
                  <RotateCcw
                    className="w-3 h-3 text-gray-600 cursor-pointer"
                    strokeWidth={2.5}
                  />
                </button>
                {links.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeLink(linkIndex)}
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

            {/* Links Content */}
            {linksExpanded && (
              <div className="p-4 sm:p-5 md:p-6">
                <div className="space-y-4">
                  {/* LinkedIn Profile */}
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5">
                      LinkedIn Profile
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        value={link.linkedinProfile}
                        onChange={(e) =>
                          handleLinkChange(
                            linkIndex,
                            "linkedinProfile",
                            e.target.value
                          )
                        }
                        placeholder="Enter LinkedIn profile link..."
                        className={`w-full px-3 py-2 sm:py-2.5 border rounded-lg focus:outline-none focus:ring-2 text-xs sm:text-sm pr-8 ${
                          errors[`link-${linkIndex}-linkedinProfile`]
                            ? "border-red-500 focus:ring-red-400"
                            : "border-gray-300 focus:ring-orange-400 focus:border-transparent"
                        }`}
                      />
                      {link.linkedinProfile && (
                        <button
                          type="button"
                          onClick={() =>
                            clearLinkField(linkIndex, "linkedinProfile")
                          }
                          className="absolute right-3 top-1/2 -translate-y-1/2 p-0.5 hover:bg-gray-100 rounded-full transition-colors"
                        >
                          <X className="w-3.5 h-3.5 text-gray-500 cursor-pointer" />
                        </button>
                      )}
                    </div>
                    {errors[`link-${linkIndex}-linkedinProfile`] && (
                      <p className="mt-1 text-xs text-red-500">
                        {errors[`link-${linkIndex}-linkedinProfile`]}
                      </p>
                    )}
                  </div>

                  {/* GitHub Profile */}
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5">
                      GitHub Profile
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        value={link.githubProfile}
                        onChange={(e) =>
                          handleLinkChange(
                            linkIndex,
                            "githubProfile",
                            e.target.value
                          )
                        }
                        placeholder="Enter GitHub profile link..."
                        className={`w-full px-3 py-2 sm:py-2.5 border rounded-lg focus:outline-none focus:ring-2 text-xs sm:text-sm pr-8 ${
                          errors[`link-${linkIndex}-githubProfile`]
                            ? "border-red-500 focus:ring-red-400"
                            : "border-gray-300 focus:ring-orange-400 focus:border-transparent"
                        }`}
                      />
                      {link.githubProfile && (
                        <button
                          type="button"
                          onClick={() =>
                            clearLinkField(linkIndex, "githubProfile")
                          }
                          className="absolute right-3 top-1/2 -translate-y-1/2 p-0.5 hover:bg-gray-100 rounded-full transition-colors"
                        >
                          <X className="w-3.5 h-3.5 text-gray-500 cursor-pointer" />
                        </button>
                      )}
                    </div>
                    {errors[`link-${linkIndex}-githubProfile`] && (
                      <p className="mt-1 text-xs text-red-500">
                        {errors[`link-${linkIndex}-githubProfile`]}
                      </p>
                    )}
                  </div>

                  {/* Portfolio URL */}
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5">
                      Portfolio URL
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        value={link.portfolioUrl}
                        onChange={(e) =>
                          handleLinkChange(
                            linkIndex,
                            "portfolioUrl",
                            e.target.value
                          )
                        }
                        placeholder="Enter Portfolio URL..."
                        className={`w-full px-3 py-2 sm:py-2.5 border rounded-lg focus:outline-none focus:ring-2 text-xs sm:text-sm pr-8 ${
                          errors[`link-${linkIndex}-portfolioUrl`]
                            ? "border-red-500 focus:ring-red-400"
                            : "border-gray-300 focus:ring-orange-400 focus:border-transparent"
                        }`}
                      />
                      {link.portfolioUrl && (
                        <button
                          type="button"
                          onClick={() =>
                            clearLinkField(linkIndex, "portfolioUrl")
                          }
                          className="absolute right-3 top-1/2 -translate-y-1/2 p-0.5 hover:bg-gray-100 rounded-full transition-colors"
                        >
                          <X className="w-3.5 h-3.5 text-gray-500 cursor-pointer" />
                        </button>
                      )}
                    </div>
                    {errors[`link-${linkIndex}-portfolioUrl`] && (
                      <p className="mt-1 text-xs text-red-500">
                        {errors[`link-${linkIndex}-portfolioUrl`]}
                      </p>
                    )}
                  </div>

                  {/* Portfolio Description */}
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5">
                      Portfolio Description
                    </label>
                    <div className="relative">
                      <textarea
                        value={link.portfolioDescription}
                        onChange={(e) =>
                          handleLinkChange(
                            linkIndex,
                            "portfolioDescription",
                            e.target.value
                          )
                        }
                        placeholder="Provide Portfolio Description..."
                        rows={3}
                        className="w-full px-3 py-2 sm:py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent text-xs sm:text-sm resize-none pr-8"
                      />
                      {link.portfolioDescription && (
                        <button
                          type="button"
                          onClick={() =>
                            clearLinkField(linkIndex, "portfolioDescription")
                          }
                          className="absolute right-3 top-3 p-0.5 hover:bg-gray-100 rounded-full transition-colors cursor-pointer"
                        >
                          <X className="w-3.5 h-3.5 text-gray-500 cursor-pointer" />
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Publication URL */}
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5">
                      Publication URL
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        value={link.publicationUrl}
                        onChange={(e) =>
                          handleLinkChange(
                            linkIndex,
                            "publicationUrl",
                            e.target.value
                          )
                        }
                        placeholder="Enter Publication URL..."
                        className={`w-full px-3 py-2 sm:py-2.5 border rounded-lg focus:outline-none focus:ring-2 text-xs sm:text-sm pr-8 ${
                          errors[`link-${linkIndex}-publicationUrl`]
                            ? "border-red-500 focus:ring-red-400"
                            : "border-gray-300 focus:ring-orange-400 focus:border-transparent"
                        }`}
                      />
                      {link.publicationUrl && (
                        <button
                          type="button"
                          onClick={() =>
                            clearLinkField(linkIndex, "publicationUrl")
                          }
                          className="absolute right-3 top-1/2 -translate-y-1/2 p-0.5 hover:bg-gray-100 rounded-full transition-colors cursor-pointer"
                        >
                          <X className="w-3.5 h-3.5 text-gray-500 cursor-pointer" />
                        </button>
                      )}
                    </div>
                    {errors[`link-${linkIndex}-publicationUrl`] && (
                      <p className="mt-1 text-xs text-red-500">
                        {errors[`link-${linkIndex}-publicationUrl`]}
                      </p>
                    )}
                  </div>

                  {/* Publication Description */}
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5">
                      Publication Description
                    </label>
                    <div className="relative">
                      <textarea
                        value={link.publicationDescription}
                        onChange={(e) =>
                          handleLinkChange(
                            linkIndex,
                            "publicationDescription",
                            e.target.value
                          )
                        }
                        placeholder="Provide Publication Description..."
                        rows={3}
                        className="w-full px-3 py-2 sm:py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent text-xs sm:text-sm resize-none pr-8"
                      />
                      {link.publicationDescription && (
                        <button
                          type="button"
                          onClick={() =>
                            clearLinkField(linkIndex, "publicationDescription")
                          }
                          className="absolute right-3 top-3 p-0.5 hover:bg-gray-100 rounded-full transition-colors cursor-pointer"
                        >
                          <X className="w-3.5 h-3.5 text-gray-500 cursor-pointer" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}

        {/* Add Link Button */}
        <button
          type="button"
          onClick={addLink}
          className="flex items-center gap-2 px-4 py-2 text-orange-400 hover:text-orange-500 font-medium text-xs sm:text-sm transition-colors mb-4 md:mb-5 cursor-pointer"
        >
          <Plus className="w-4 h-4 cursor-pointer" />
          Add Link
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