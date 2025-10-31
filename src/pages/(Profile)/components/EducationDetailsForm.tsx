import React, { useState } from "react";
import { ChevronDown, RotateCcw, Trash2, Plus } from "lucide-react";

interface EducationDetailsFormProps {
  onNext: (data: any) => void;
  onBack: () => void;
  initialData?: any;
}

interface HigherEducation {
  id: string;
  degree: string;
  institutionName: string;
  universityBoard: string;
  fieldOfStudy: string;
  startYear: string;
  endYear: string;
  resultFormat: string;
  result: string;
  currentlyPursuing: boolean;
}

export default function EducationDetailsForm({
  onNext,
  onBack,
  initialData = {},
}: EducationDetailsFormProps) {
  const [sslcExpanded, setSslcExpanded] = useState(true);
  const [puExpanded, setPuExpanded] = useState(true);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const [sslcData, setSslcData] = useState({
    institutionName: initialData.sslc?.institutionName || "",
    boardType: initialData.sslc?.boardType || "",
    resultFormat: initialData.sslc?.resultFormat || "",
    yearOfPassing: initialData.sslc?.yearOfPassing || "",
    result: initialData.sslc?.result || "",
  });

  const [puData, setPuData] = useState({
    institutionName: initialData.pu?.institutionName || "",
    boardType: initialData.pu?.boardType || "",
    yearOfPassing: initialData.pu?.yearOfPassing || "",
    resultFormat: initialData.pu?.resultFormat || "",
    subjectStream: initialData.pu?.subjectStream || "",
    result: initialData.pu?.result || "",
  });

  const initialHigherEdu = initialData.higherEducations || [
    {
      id: "1",
      degree: "",
      institutionName: "",
      universityBoard: "",
      fieldOfStudy: "",
      startYear: "",
      endYear: "",
      resultFormat: "",
      result: "",
      currentlyPursuing: false,
    },
  ];

  const initialExtraEdu = initialData.extraEducations || [];

  const getInitialExpanded = (array: HigherEducation[]) =>
    array.reduce((acc, edu) => ({ ...acc, [edu.id]: true }), {});

  const [higherEducations, setHigherEducations] =
    useState<HigherEducation[]>(initialHigherEdu);
  const [extraEducations, setExtraEducations] =
    useState<HigherEducation[]>(initialExtraEdu);
  const [higherExpanded, setHigherExpanded] = useState<Record<string, boolean>>(
    getInitialExpanded(initialHigherEdu)
  );
  const [extraExpanded, setExtraExpanded] = useState<Record<string, boolean>>(
    getInitialExpanded(initialExtraEdu)
  );

  // Validation function
  const validateResult = (value: string, format: string) => {
    if (!value || !format) return "";

    switch (format) {
      case "Percentage":
        const percentage = parseFloat(value);
        if (isNaN(percentage)) return "Must be a number";
        if (percentage < 0 || percentage > 100) return "Must be between 0-100";
        break;
      case "CGPA":
        const cgpa = parseFloat(value);
        if (isNaN(cgpa)) return "Must be a number";
        if (cgpa < 0 || cgpa > 10) return "Must be between 0-10";
        break;
      case "Grade":
        if (!/^[A-F][+-]?$/i.test(value)) return "Enter valid grade (A, B+, etc.)";
        break;
    }
    return "";
  };

  const validateInstitutionName = (value: string) => {
    if (value && !/^[a-zA-Z0-9\s.,'-]+$/.test(value)) {
      return "Invalid characters in name";
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

  const handleSslcChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setSslcData((prev) => ({ ...prev, [name]: value }));

    // Validate result field
    if (name === "result") {
      const error = validateResult(value, sslcData.resultFormat);
      setErrors((prev) => ({ ...prev, [`sslc-result`]: error }));
    } else if (name === "resultFormat") {
      const error = validateResult(sslcData.result, value);
      setErrors((prev) => ({ ...prev, [`sslc-result`]: error }));
    } else if (name === "institutionName") {
      const error = validateInstitutionName(value);
      setErrors((prev) => ({ ...prev, [`sslc-institutionName`]: error }));
    }
  };

  const handlePuChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setPuData((prev) => ({ ...prev, [name]: value }));

    // Validate result field
    if (name === "result") {
      const error = validateResult(value, puData.resultFormat);
      setErrors((prev) => ({ ...prev, [`pu-result`]: error }));
    } else if (name === "resultFormat") {
      const error = validateResult(puData.result, value);
      setErrors((prev) => ({ ...prev, [`pu-result`]: error }));
    } else if (name === "institutionName") {
      const error = validateInstitutionName(value);
      setErrors((prev) => ({ ...prev, [`pu-institutionName`]: error }));
    }
  };

  const handleHigherEdChange = (
    index: number,
    field: string,
    value: string | boolean
  ) => {
    const updated = [...higherEducations];
    updated[index] = { ...updated[index], [field]: value };
    setHigherEducations(updated);

    // Validate fields
    if (field === "result" && typeof value === "string") {
      const error = validateResult(value, updated[index].resultFormat);
      setErrors((prev) => ({ ...prev, [`higher-${index}-result`]: error }));
    } else if (field === "resultFormat" && typeof value === "string") {
      const error = validateResult(updated[index].result, value);
      setErrors((prev) => ({ ...prev, [`higher-${index}-result`]: error }));
    } else if (field === "institutionName" && typeof value === "string") {
      const error = validateInstitutionName(value);
      setErrors((prev) => ({ ...prev, [`higher-${index}-institutionName`]: error }));
    } else if (field === "universityBoard" && typeof value === "string") {
      const error = validateInstitutionName(value);
      setErrors((prev) => ({ ...prev, [`higher-${index}-universityBoard`]: error }));
    } else if (field === "startYear" && typeof value === "string") {
      const error = validateDateRange(value, updated[index].endYear);
      setErrors((prev) => ({ ...prev, [`higher-${index}-endYear`]: error }));
    } else if (field === "endYear" && typeof value === "string") {
      const error = validateDateRange(updated[index].startYear, value);
      setErrors((prev) => ({ ...prev, [`higher-${index}-endYear`]: error }));
    }
  };

  const handleExtraEdChange = (
    index: number,
    field: string,
    value: string | boolean
  ) => {
    const updated = [...extraEducations];
    updated[index] = { ...updated[index], [field]: value };
    setExtraEducations(updated);

    // Validate fields
    if (field === "result" && typeof value === "string") {
      const error = validateResult(value, updated[index].resultFormat);
      setErrors((prev) => ({ ...prev, [`extra-${index}-result`]: error }));
    } else if (field === "resultFormat" && typeof value === "string") {
      const error = validateResult(updated[index].result, value);
      setErrors((prev) => ({ ...prev, [`extra-${index}-result`]: error }));
    } else if (field === "institutionName" && typeof value === "string") {
      const error = validateInstitutionName(value);
      setErrors((prev) => ({ ...prev, [`extra-${index}-institutionName`]: error }));
    } else if (field === "universityBoard" && typeof value === "string") {
      const error = validateInstitutionName(value);
      setErrors((prev) => ({ ...prev, [`extra-${index}-universityBoard`]: error }));
    } else if (field === "startYear" && typeof value === "string") {
      const error = validateDateRange(value, updated[index].endYear);
      setErrors((prev) => ({ ...prev, [`extra-${index}-endYear`]: error }));
    } else if (field === "endYear" && typeof value === "string") {
      const error = validateDateRange(updated[index].startYear, value);
      setErrors((prev) => ({ ...prev, [`extra-${index}-endYear`]: error }));
    }
  };

  const handleEducationExpandToggle = (id: string, isExtra: boolean) => {
    if (isExtra) {
      setExtraExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
    } else {
      setHigherExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
    }
  };

  const addEducation = () => {
    const newEdu: HigherEducation = {
      id: Date.now().toString(),
      degree: "",
      institutionName: "",
      universityBoard: "",
      fieldOfStudy: "",
      startYear: "",
      endYear: "",
      resultFormat: "",
      result: "",
      currentlyPursuing: false,
    };
    setExtraEducations([...extraEducations, newEdu]);
    setExtraExpanded((prev) => ({ ...prev, [newEdu.id]: true }));
  };

  const removeEducation = (index: number) => {
    const id = extraEducations[index].id;
    setExtraEducations(extraEducations.filter((_, i) => i !== index));
    setExtraExpanded((prev) => {
      const updated = { ...prev };
      delete updated[id];
      return updated;
    });
    // Clear errors for removed education
    setErrors((prev) => {
      const updated = { ...prev };
      delete updated[`extra-${index}-result`];
      delete updated[`extra-${index}-institutionName`];
      delete updated[`extra-${index}-universityBoard`];
      return updated;
    });
  };

  const handleClearEducationSSLC = () => {
    setSslcData({
      institutionName: "",
      boardType: "",
      resultFormat: "",
      yearOfPassing: "",
      result: "",
    });
    setErrors((prev) => {
      const updated = { ...prev };
      delete updated["sslc-result"];
      delete updated["sslc-institutionName"];
      return updated;
    });
  };

  const handleClearEducationPreUniversity = () => {
    setPuData({
      institutionName: "",
      boardType: "",
      yearOfPassing: "",
      resultFormat: "",
      subjectStream: "",
      result: "",
    });
    setErrors((prev) => {
      const updated = { ...prev };
      delete updated["pu-result"];
      delete updated["pu-institutionName"];
      return updated;
    });
  };

  const handleClearHigherEducation = (index: number, isExtra: boolean) => {
    if (isExtra) {
      setExtraEducations((prev) =>
        prev.map((edu, i) =>
          i === index
            ? {
                ...edu,
                degree: "",
                institutionName: "",
                universityBoard: "",
                fieldOfStudy: "",
                startYear: "",
                endYear: "",
                resultFormat: "",
                result: "",
                currentlyPursuing: false,
              }
            : edu
        )
      );
      setErrors((prev) => {
        const updated = { ...prev };
        delete updated[`extra-${index}-result`];
        delete updated[`extra-${index}-institutionName`];
        delete updated[`extra-${index}-universityBoard`];
        delete updated[`extra-${index}-endYear`];
        return updated;
      });
    } else {
      setHigherEducations((prev) =>
        prev.map((edu, i) =>
          i === index
            ? {
                ...edu,
                degree: "",
                institutionName: "",
                universityBoard: "",
                fieldOfStudy: "",
                startYear: "",
                endYear: "",
                resultFormat: "",
                result: "",
                currentlyPursuing: false,
              }
            : edu
        )
      );
      setErrors((prev) => {
        const updated = { ...prev };
        delete updated[`higher-${index}-result`];
        delete updated[`higher-${index}-institutionName`];
        delete updated[`higher-${index}-universityBoard`];
        delete updated[`higher-${index}-endYear`];
        return updated;
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext({
      sslc: sslcData,
      pu: puData,
      higherEducations,
      extraEducations,
    });
  };

  const renderEducationCard = (
    education: HigherEducation,
    index: number,
    isExtra: boolean = false,
    showDelete: boolean = false
  ) => {
    const expanded = isExtra
      ? extraExpanded[education.id]
      : higherExpanded[education.id];
    const prefix = isExtra ? `extra-${index}` : `higher-${index}`;

    return (
      <div
        key={education.id}
        className="bg-white border border-gray-200 rounded-xl mb-4 md:mb-5 overflow-hidden"
      >
        <div className="flex items-center justify-between px-4 sm:px-5 md:px-6 py-3 md:py-4 border-b border-gray-200">
          <h3 className="text-sm sm:text-base md:text-lg font-semibold text-gray-900">
            {isExtra ? "Education" : "Higher Education*"}
          </h3>
          <div className="flex gap-2 items-center">
            <button
              type="button"
              onClick={() => handleEducationExpandToggle(education.id, isExtra)}
              className="w-5 h-5 flex items-center justify-center rounded-full border-2 border-gray-600 hover:bg-gray-100 transition-colors"
            >
              <ChevronDown
                className={`w-3 h-3 text-gray-600 transition-transform cursor-pointer ${
                  expanded ? "" : "rotate-180"
                }`}
                strokeWidth={2.5}
              />
            </button>
            <button
              type="button"
              onClick={() => handleClearHigherEducation(index, isExtra)}
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
                onClick={() => removeEducation(index)}
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

        {expanded && (
          <div className="p-4 sm:p-5 md:p-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
              {/* Degree */}
              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5">
                  Degree
                </label>
                <div className="relative">
                  <select
                    value={education.degree}
                    onChange={(e) =>
                      isExtra
                        ? handleExtraEdChange(index, "degree", e.target.value)
                        : handleHigherEdChange(index, "degree", e.target.value)
                    }
                    className="w-full px-3 py-2 sm:py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent text-xs sm:text-sm appearance-none bg-white pr-8"
                  >
                    <option value="">Select Degree</option>
                    <option value="Bachelor">Bachelor's Degree</option>
                    <option value="Master">Master's Degree</option>
                    <option value="Diploma">Diploma</option>
                    <option value="PhD">PhD</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                </div>
              </div>

              {/* Field of Study */}
              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5">
                  Field Of Study
                </label>
                <div className="relative">
                  <select
                    value={education.fieldOfStudy}
                    onChange={(e) =>
                      isExtra
                        ? handleExtraEdChange(
                            index,
                            "fieldOfStudy",
                            e.target.value
                          )
                        : handleHigherEdChange(
                            index,
                            "fieldOfStudy",
                            e.target.value
                          )
                    }
                    className="w-full px-3 py-2 sm:py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent text-xs sm:text-sm appearance-none bg-white pr-8"
                  >
                    <option value="">Select Field of Study</option>
                    <option value="Computer Science">Computer Science</option>
                    <option value="Engineering">Engineering</option>
                    <option value="Business">Business</option>
                    <option value="Arts">Arts</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                </div>
              </div>

              {/* Institution Name */}
              <div className="sm:col-span-2 lg:col-span-1">
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5">
                  Institution Name
                </label>
                <input
                  type="text"
                  value={education.institutionName}
                  onChange={(e) =>
                    isExtra
                      ? handleExtraEdChange(
                          index,
                          "institutionName",
                          e.target.value
                        )
                      : handleHigherEdChange(
                          index,
                          "institutionName",
                          e.target.value
                        )
                  }
                  placeholder="Enter Institution Name"
                  className={`w-full px-3 py-2 sm:py-2.5 border rounded-lg focus:outline-none focus:ring-2 text-xs sm:text-sm ${
                    errors[`${prefix}-institutionName`]
                      ? "border-red-500 focus:ring-red-400"
                      : "border-gray-300 focus:ring-orange-400 focus:border-transparent"
                  }`}
                />
                {errors[`${prefix}-institutionName`] && (
                  <p className="mt-1 text-xs text-red-500">{errors[`${prefix}-institutionName`]}</p>
                )}
              </div>

              {/* University Board */}
              <div className="sm:col-span-2 lg:col-span-3">
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5">
                  University/ Board
                </label>
                <input
                  type="text"
                  value={education.universityBoard}
                  onChange={(e) =>
                    isExtra
                      ? handleExtraEdChange(
                          index,
                          "universityBoard",
                          e.target.value
                        )
                      : handleHigherEdChange(
                          index,
                          "universityBoard",
                          e.target.value
                        )
                  }
                  placeholder="Enter University/ Board Name"
                  className={`w-full px-3 py-2 sm:py-2.5 border rounded-lg focus:outline-none focus:ring-2 text-xs sm:text-sm ${
                    errors[`${prefix}-universityBoard`]
                      ? "border-red-500 focus:ring-red-400"
                      : "border-gray-300 focus:ring-orange-400 focus:border-transparent"
                  }`}
                />
                {errors[`${prefix}-universityBoard`] && (
                  <p className="mt-1 text-xs text-red-500">{errors[`${prefix}-universityBoard`]}</p>
                )}
              </div>

              {/* Start Year */}
              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5">
                  Start Year
                </label>
                <div className="relative">
                  <input
                    type="month"
                    value={education.startYear}
                    onChange={(e) =>
                      isExtra
                        ? handleExtraEdChange(
                            index,
                            "startYear",
                            e.target.value
                          )
                        : handleHigherEdChange(
                            index,
                            "startYear",
                            e.target.value
                          )
                    }
                    className="w-full px-3 py-2 sm:py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent text-xs sm:text-sm"
                  />
                </div>
              </div>

              {/* End Year */}
              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5">
                  End Year
                </label>
                <div className="relative">
                  <input
                    type="month"
                    value={education.endYear}
                    onChange={(e) =>
                      isExtra
                        ? handleExtraEdChange(index, "endYear", e.target.value)
                        : handleHigherEdChange(index, "endYear", e.target.value)
                    }
                    disabled={education.currentlyPursuing}
                    className={`w-full px-3 py-2 sm:py-2.5 border rounded-lg focus:outline-none focus:ring-2 text-xs sm:text-sm disabled:bg-gray-100 ${
                      errors[`${prefix}-endYear`]
                        ? "border-red-500 focus:ring-red-400"
                        : "border-gray-300 focus:ring-orange-400 focus:border-transparent"
                    }`}
                  />
                </div>
                {errors[`${prefix}-endYear`] && (
                  <p className="mt-1 text-xs text-red-500">{errors[`${prefix}-endYear`]}</p>
                )}
              </div>

              {/* Currently Pursuing Checkbox */}
              <div className="flex items-end">
                <label className="flex items-center gap-2 cursor-pointer pb-2.5">
                  <input
                    type="checkbox"
                    checked={education.currentlyPursuing}
                    onChange={(e) =>
                      isExtra
                        ? handleExtraEdChange(
                            index,
                            "currentlyPursuing",
                            e.target.checked
                          )
                        : handleHigherEdChange(
                            index,
                            "currentlyPursuing",
                            e.target.checked
                          )
                    }
                    className="w-4 h-4 text-orange-400 border-gray-300 rounded focus:ring-orange-400"
                  />
                  <span className="text-xs sm:text-sm text-gray-700">
                    Currently Pursuing
                  </span>
                </label>
              </div>

              {/* Result Format */}
              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5">
                  Result Format
                </label>
                <div className="relative">
                  <select
                    value={education.resultFormat}
                    onChange={(e) =>
                      isExtra
                        ? handleExtraEdChange(
                            index,
                            "resultFormat",
                            e.target.value
                          )
                        : handleHigherEdChange(
                            index,
                            "resultFormat",
                            e.target.value
                          )
                    }
                    className="w-full px-3 py-2 sm:py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent text-xs sm:text-sm appearance-none bg-white pr-8"
                  >
                    <option value="">Select Result Format</option>
                    <option value="Percentage">Percentage</option>
                    <option value="CGPA">CGPA</option>
                    <option value="Grade">Grade</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                </div>
              </div>

              {/* Result */}
              <div className="sm:col-span-2">
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5">
                  Result
                </label>
                <input
                  type="text"
                  value={education.result}
                  onChange={(e) =>
                    isExtra
                      ? handleExtraEdChange(index, "result", e.target.value)
                      : handleHigherEdChange(index, "result", e.target.value)
                  }
                  placeholder="Enter Result"
                  className={`w-full px-3 py-2 sm:py-2.5 border rounded-lg focus:outline-none focus:ring-2 text-xs sm:text-sm ${
                    errors[`${prefix}-result`]
                      ? "border-red-500 focus:ring-red-400"
                      : "border-gray-300 focus:ring-orange-400 focus:border-transparent"
                  }`}
                />
                {errors[`${prefix}-result`] && (
                  <p className="mt-1 text-xs text-red-500">{errors[`${prefix}-result`]}</p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="px-3 sm:px-4 md:px-6 lg:px-8 py-4 md:py-6"
    >
      <div className="max-w-6xl mx-auto">
        {/* Step Header */}
        <div className="mb-4 md:mb-6">
          <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-900 mb-1">
            Step 2: Education Details
          </h2>
          <p className="text-xs sm:text-sm text-gray-600">
            Add your educational background (SSLC and PUC details are not
            mandatory but included)
          </p>
        </div>

        {/* SSLC (10th Standard) */}
        <div className="bg-white border border-gray-200 rounded-xl mb-4 md:mb-5 overflow-hidden">
          <div className="flex items-center justify-between px-4 sm:px-5 md:px-6 py-3 md:py-4 border-b border-gray-200">
            <h3 className="text-sm sm:text-base md:text-lg font-semibold text-gray-900">
              SSLC (10th Standard)*
            </h3>
            <div className="flex gap-2 items-center">
              <button
                type="button"
                onClick={() => setSslcExpanded(!sslcExpanded)}
                className="w-5 h-5 flex items-center justify-center rounded-full border-2 border-gray-600 hover:bg-gray-100 transition-colors"
              >
                <ChevronDown
                  className={`w-3 h-3 text-gray-600 transition-transform cursor-pointer ${
                    sslcExpanded ? "" : "rotate-180"
                  }`}
                  strokeWidth={2.5}
                />
              </button>
              <button
                type="button"
                onClick={handleClearEducationSSLC}
                className="w-5 h-5 flex items-center justify-center rounded-full border-2 border-gray-600 hover:bg-gray-100 transition-colors"
              >
                <RotateCcw
                  className="w-3 h-3 text-gray-600 cursor-pointer"
                  strokeWidth={2.5}
                />
              </button>
            </div>
          </div>

          {sslcExpanded && (
            <div className="p-4 sm:p-5 md:p-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                <div className="sm:col-span-2 lg:col-span-3">
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5">
                    Institution Name
                  </label>
                  <input
                    type="text"
                    name="institutionName"
                    value={sslcData.institutionName}
                    onChange={handleSslcChange}
                    placeholder="Enter Institute Name"
                    className={`w-full px-3 py-2 sm:py-2.5 border rounded-lg focus:outline-none focus:ring-2 text-xs sm:text-sm ${
                      errors["sslc-institutionName"]
                        ? "border-red-500 focus:ring-red-400"
                        : "border-gray-300 focus:ring-orange-400 focus:border-transparent"
                    }`}
                  />
                  {errors["sslc-institutionName"] && (
                    <p className="mt-1 text-xs text-red-500">{errors["sslc-institutionName"]}</p>
                  )}
                </div>
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5">
                    Board Type
                  </label>
                  <div className="relative">
                    <select
                      name="boardType"
                      value={sslcData.boardType}
                      onChange={handleSslcChange}
                      className="w-full px-3 py-2 sm:py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent text-xs sm:text-sm appearance-none bg-white pr-8"
                    >
                      <option value="">Select Board Type</option>
                      <option value="CBSE">CBSE</option>
                      <option value="ICSE">ICSE</option>
                      <option value="State Board">State Board</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                  </div>
                </div>
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5">
                    Year Of Passing
                  </label>
                  <input
                    type="month"
                    name="yearOfPassing"
                    value={sslcData.yearOfPassing}
                    onChange={handleSslcChange}
                    className="w-full px-3 py-2 sm:py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent text-xs sm:text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5">
                    Result Format
                  </label>
                  <div className="relative">
                    <select
                      name="resultFormat"
                      value={sslcData.resultFormat}
                      onChange={handleSslcChange}
                      className="w-full px-3 py-2 sm:py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent text-xs sm:text-sm appearance-none bg-white pr-8"
                    >
                      <option value="">Select Result Format</option>
                      <option value="Percentage">Percentage</option>
                      <option value="CGPA">CGPA</option>
                      <option value="Grade">Grade</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                  </div>
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5">
                    Result
                  </label>
                  <input
                    type="text"
                    name="result"
                    value={sslcData.result}
                    onChange={handleSslcChange}
                    placeholder="Enter Result"
                    className={`w-full px-3 py-2 sm:py-2.5 border rounded-lg focus:outline-none focus:ring-2 text-xs sm:text-sm ${
                      errors["sslc-result"]
                        ? "border-red-500 focus:ring-red-400"
                        : "border-gray-300 focus:ring-orange-400 focus:border-transparent"
                    }`}
                  />
                  {errors["sslc-result"] && (
                    <p className="mt-1 text-xs text-red-500">{errors["sslc-result"]}</p>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Pre-University (12th Standard) */}
        <div className="bg-white border border-gray-200 rounded-xl mb-4 md:mb-5 overflow-hidden">
          <div className="flex items-center justify-between px-4 sm:px-5 md:px-6 py-3 md:py-4 border-b border-gray-200">
            <h3 className="text-sm sm:text-base md:text-lg font-semibold text-gray-900">
              Pre-university (12th Standard)*
            </h3>
            <div className="flex gap-2 items-center">
              <button
                type="button"
                onClick={() => setPuExpanded(!puExpanded)}
                className="w-5 h-5 flex items-center justify-center rounded-full border-2 border-gray-600 hover:bg-gray-100 transition-colors"
              >
                <ChevronDown
                  className={`w-3 h-3 text-gray-600 transition-transform cursor-pointer ${
                    puExpanded ? "" : "rotate-180"
                  }`}
                  strokeWidth={2.5}
                />
              </button>
              <button
                type="button"
                onClick={handleClearEducationPreUniversity}
                className="w-5 h-5 flex items-center justify-center rounded-full border-2 border-gray-600 hover:bg-gray-100 transition-colors"
              >
                <RotateCcw
                  className="w-3 h-3 text-gray-600 cursor-pointer"
                  strokeWidth={2.5}
                />
              </button>
            </div>
          </div>

          {puExpanded && (
            <div className="p-4 sm:p-5 md:p-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                <div className="sm:col-span-2 lg:col-span-3">
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5">
                    Institution Name
                  </label>
                  <input
                    type="text"
                    name="institutionName"
                    value={puData.institutionName}
                    onChange={handlePuChange}
                    placeholder="Enter Institute Name"
                    className={`w-full px-3 py-2 sm:py-2.5 border rounded-lg focus:outline-none focus:ring-2 text-xs sm:text-sm ${
                      errors["pu-institutionName"]
                        ? "border-red-500 focus:ring-red-400"
                        : "border-gray-300 focus:ring-orange-400 focus:border-transparent"
                    }`}
                  />
                  {errors["pu-institutionName"] && (
                    <p className="mt-1 text-xs text-red-500">{errors["pu-institutionName"]}</p>
                  )}
                </div>
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5">
                    Board Type
                  </label>
                  <div className="relative">
                    <select
                      name="boardType"
                      value={puData.boardType}
                      onChange={handlePuChange}
                      className="w-full px-3 py-2 sm:py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent text-xs sm:text-sm appearance-none bg-white pr-8"
                    >
                      <option value="">Select Board Type</option>
                      <option value="CBSE">CBSE</option>
                      <option value="ICSE">ICSE</option>
                      <option value="State Board">State Board</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                  </div>
                </div>
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5">
                    Subject Stream
                  </label>
                  <div className="relative">
                    <select
                      name="subjectStream"
                      value={puData.subjectStream}
                      onChange={handlePuChange}
                      className="w-full px-3 py-2 sm:py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent text-xs sm:text-sm appearance-none bg-white pr-8"
                    >
                      <option value="">Select Subject Stream</option>
                      <option value="Science">Science</option>
                      <option value="Commerce">Commerce</option>
                      <option value="Arts">Arts</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                  </div>
                </div>
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5">
                    Year Of Passing
                  </label>
                  <input
                    type="month"
                    name="yearOfPassing"
                    value={puData.yearOfPassing}
                    onChange={handlePuChange}
                    className="w-full px-3 py-2 sm:py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent text-xs sm:text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5">
                    Result Format
                  </label>
                  <div className="relative">
                    <select
                      name="resultFormat"
                      value={puData.resultFormat}
                      onChange={handlePuChange}
                      className="w-full px-3 py-2 sm:py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent text-xs sm:text-sm appearance-none bg-white pr-8"
                    >
                      <option value="">Select Result Format</option>
                      <option value="Percentage">Percentage</option>
                      <option value="CGPA">CGPA</option>
                      <option value="Grade">Grade</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                  </div>
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5">
                    Result
                  </label>
                  <input
                    type="text"
                    name="result"
                    value={puData.result}
                    onChange={handlePuChange}
                    placeholder="Enter Result"
                    className={`w-full px-3 py-2 sm:py-2.5 border rounded-lg focus:outline-none focus:ring-2 text-xs sm:text-sm ${
                      errors["pu-result"]
                        ? "border-red-500 focus:ring-red-400"
                        : "border-gray-300 focus:ring-orange-400 focus:border-transparent"
                    }`}
                  />
                  {errors["pu-result"] && (
                    <p className="mt-1 text-xs text-red-500">{errors["pu-result"]}</p>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Higher Education (Mandatory) */}
        {higherEducations.map((edu, index) =>
          renderEducationCard(edu, index, false, false)
        )}
        {/* Extra Education Cards */}
        {extraEducations.map((edu, index) =>
          renderEducationCard(edu, index, true, true)
        )}

        {/* Add Education Button */}
        <button
          type="button"
          onClick={addEducation}
          className="flex items-center gap-2 px-4 py-2.5 text-orange-400 hover:text-orange-500 font-medium text-sm transition-colors mb-4 md:mb-5 cursor-pointer"
        >
          <Plus className="w-4 h-4 cursor-pointer" />
          Add Education
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
            type="submit"
            style={{
              background: "linear-gradient(180deg, #FF9D48 0%, #FF8251 100%)",
            }}
            className="px-6 sm:px-8 py-2.5 sm:py-3 bg-orange-400 hover:bg-orange-500 text-white rounded-xl font-medium text-xs sm:text-sm transition-colors shadow-sm cursor-pointer"
          >
            Proceed to next
          </button>
        </div>
      </div>
    </form>
  );
}