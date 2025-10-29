import React, { useState } from 'react';
import { ChevronDown, X, Trash2, Plus } from 'lucide-react';

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

export default function EducationDetailsForm({ onNext, onBack, initialData = {} }: EducationDetailsFormProps) {
  const [sslcExpanded, setSslcExpanded] = useState(true);
  const [puExpanded, setPuExpanded] = useState(true);

  const [sslcData, setSslcData] = useState({
    institutionName: initialData.sslc?.institutionName || '',
    boardType: initialData.sslc?.boardType || '',
    resultFormat: initialData.sslc?.resultFormat || '',
    yearOfPassing: initialData.sslc?.yearOfPassing || '',
    result: initialData.sslc?.result || ''
  });

  const [puData, setPuData] = useState({
    institutionName: initialData.pu?.institutionName || '',
    boardType: initialData.pu?.boardType || '',
    yearOfPassing: initialData.pu?.yearOfPassing || '',
    resultFormat: initialData.pu?.resultFormat || '',
    subjectStream: initialData.pu?.subjectStream || '',
    result: initialData.pu?.result || ''
  });

  const initialHigherEdu =
    initialData.higherEducations || [
      {
        id: '1',
        degree: '',
        institutionName: '',
        universityBoard: '',
        fieldOfStudy: '',
        startYear: '',
        endYear: '',
        resultFormat: '',
        result: '',
        currentlyPursuing: false
      }
    ];

  const initialExtraEdu = initialData.extraEducations || [];

  // Expanded state per card (by id)
  const getInitialExpanded = (array: HigherEducation[]) =>
    array.reduce((acc, edu) => ({ ...acc, [edu.id]: true }), {});

  const [higherEducations, setHigherEducations] = useState<HigherEducation[]>(initialHigherEdu);
  const [extraEducations, setExtraEducations] = useState<HigherEducation[]>(initialExtraEdu);
  const [higherExpanded, setHigherExpanded] = useState<Record<string, boolean>>(getInitialExpanded(initialHigherEdu));
  const [extraExpanded, setExtraExpanded] = useState<Record<string, boolean>>(getInitialExpanded(initialExtraEdu));

  const handleSslcChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setSslcData(prev => ({ ...prev, [name]: value }));
  };

  const handlePuChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setPuData(prev => ({ ...prev, [name]: value }));
  };

  const handleHigherEdChange = (index: number, field: string, value: string | boolean) => {
    const updated = [...higherEducations];
    updated[index] = { ...updated[index], [field]: value };
    setHigherEducations(updated);
  };

  const handleExtraEdChange = (index: number, field: string | boolean, value: string | boolean) => {
    const updated = [...extraEducations];
    updated[index] = { ...updated[index], [field]: value };
    setExtraEducations(updated);
  };

  const handleEducationExpandToggle = (id: string, isExtra: boolean) => {
    if (isExtra) {
      setExtraExpanded(prev => ({ ...prev, [id]: !prev[id] }));
    } else {
      setHigherExpanded(prev => ({ ...prev, [id]: !prev[id] }));
    }
  };

  const addEducation = () => {
    const newEdu: HigherEducation = {
      id: Date.now().toString(),
      degree: '',
      institutionName: '',
      universityBoard: '',
      fieldOfStudy: '',
      startYear: '',
      endYear: '',
      resultFormat: '',
      result: '',
      currentlyPursuing: false
    };
    setExtraEducations([...extraEducations, newEdu]);
    setExtraExpanded(prev => ({ ...prev, [newEdu.id]: true }));
  };

  const removeEducation = (index: number) => {
    const id = extraEducations[index].id;
    setExtraEducations(extraEducations.filter((_, i) => i !== index));
    setExtraExpanded(prev => {
      const updated = { ...prev };
      delete updated[id];
      return updated;
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext({
      sslc: sslcData,
      pu: puData,
      higherEducations,
      extraEducations
    });
  };

  const renderEducationCard = (
    education: HigherEducation,
    index: number,
    isExtra: boolean = false,
    showDelete: boolean = false
  ) => {
    const expanded = isExtra ? extraExpanded[education.id] : higherExpanded[education.id];
    return (
      <div
        key={education.id}
        className="bg-white border border-gray-200 rounded-xl mb-4 md:mb-5 overflow-hidden"
      >
        <div className="flex items-center justify-between px-4 sm:px-5 md:px-6 py-3 md:py-4 border-b border-gray-200">
          <h3 className="text-sm sm:text-base md:text-lg font-semibold text-gray-900">
            {isExtra ? 'Education' : 'Higher Education*'}
          </h3>
          <div className="flex gap-2 items-center">
            <button
              type="button"
              onClick={() => handleEducationExpandToggle(education.id, isExtra)}
              className="w-5 h-5 flex items-center justify-center rounded-full border-2 border-gray-600 hover:bg-gray-100 transition-colors"
            >
              <ChevronDown
                className={`w-3 h-3 text-gray-600${expanded ? '' : ' rotate-180'}`}
                strokeWidth={2.5}
              />
            </button>
            <button
              type="button"
              className="w-5 h-5 flex items-center justify-center rounded-full border-2 border-gray-600 hover:bg-gray-100 transition-colors"
            >
              <X className="w-3 h-3 text-gray-600" strokeWidth={2.5} />
            </button>
            {showDelete && (
              <button
                type="button"
                onClick={() => removeEducation(index)}
                className="w-5 h-5 flex items-center justify-center rounded border-2 border-red-500 hover:bg-red-50 transition-colors"
              >
                <Trash2 className="w-3 h-3 text-red-500" strokeWidth={2.5} />
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
                    onChange={e =>
                      isExtra
                        ? handleExtraEdChange(index, 'degree', e.target.value)
                        : handleHigherEdChange(index, 'degree', e.target.value)
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
                    onChange={e =>
                      isExtra
                        ? handleExtraEdChange(index, 'fieldOfStudy', e.target.value)
                        : handleHigherEdChange(index, 'fieldOfStudy', e.target.value)
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
                  onChange={e =>
                    isExtra
                      ? handleExtraEdChange(index, 'institutionName', e.target.value)
                      : handleHigherEdChange(index, 'institutionName', e.target.value)
                  }
                  placeholder="Enter Institution Name"
                  className="w-full px-3 py-2 sm:py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent text-xs sm:text-sm"
                />
              </div>

              {/* University Board */}
              <div className="sm:col-span-2 lg:col-span-3">
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5">
                  University/ Board
                </label>
                <input
                  type="text"
                  value={education.universityBoard}
                  onChange={e =>
                    isExtra
                      ? handleExtraEdChange(index, 'universityBoard', e.target.value)
                      : handleHigherEdChange(index, 'universityBoard', e.target.value)
                  }
                  placeholder="Enter University/ Board Name"
                  className="w-full px-3 py-2 sm:py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent text-xs sm:text-sm"
                />
              </div>

              {/* Start Year */}
              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5">
                  Start Year
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={education.startYear}
                    onChange={e =>
                      isExtra
                        ? handleExtraEdChange(index, 'startYear', e.target.value)
                        : handleHigherEdChange(index, 'startYear', e.target.value)
                    }
                    placeholder="Select Year of Passing"
                    className="w-full px-3 py-2 sm:py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent text-xs sm:text-sm pr-8"
                  />
                  <svg
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" strokeWidth="2" />
                    <line x1="16" y1="2" x2="16" y2="6" strokeWidth="2" />
                    <line x1="8" y1="2" x2="8" y2="6" strokeWidth="2" />
                    <line x1="3" y1="10" x2="21" y2="10" strokeWidth="2" />
                  </svg>
                </div>
              </div>

              {/* End Year */}
              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5">
                  End Year
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={education.endYear}
                    onChange={e =>
                      isExtra
                        ? handleExtraEdChange(index, 'endYear', e.target.value)
                        : handleHigherEdChange(index, 'endYear', e.target.value)
                    }
                    placeholder="Select Year of Passing"
                    disabled={education.currentlyPursuing}
                    className="w-full px-3 py-2 sm:py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent text-xs sm:text-sm pr-8 disabled:bg-gray-100"
                  />
                  <svg
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" strokeWidth="2" />
                    <line x1="16" y1="2" x2="16" y2="6" strokeWidth="2" />
                    <line x1="8" y1="2" x2="8" y2="6" strokeWidth="2" />
                    <line x1="3" y1="10" x2="21" y2="10" strokeWidth="2" />
                  </svg>
                </div>
              </div>

              {/* Currently Pursuing Checkbox */}
              <div className="flex items-end">
                <label className="flex items-center gap-2 cursor-pointer pb-2.5">
                  <input
                    type="checkbox"
                    checked={education.currentlyPursuing}
                    onChange={e =>
                      isExtra
                        ? handleExtraEdChange(index, 'currentlyPursuing', e.target.checked)
                        : handleHigherEdChange(index, 'currentlyPursuing', e.target.checked)
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
                    onChange={e =>
                      isExtra
                        ? handleExtraEdChange(index, 'resultFormat', e.target.value)
                        : handleHigherEdChange(index, 'resultFormat', e.target.value)
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
                  onChange={e =>
                    isExtra
                      ? handleExtraEdChange(index, 'result', e.target.value)
                      : handleHigherEdChange(index, 'result', e.target.value)
                  }
                  placeholder="Enter Result"
                  className="w-full px-3 py-2 sm:py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent text-xs sm:text-sm"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <form onSubmit={handleSubmit} className="px-3 sm:px-4 md:px-6 lg:px-8 py-4 md:py-6">
      <div className="max-w-6xl mx-auto">
        {/* Step Header */}
        <div className="mb-4 md:mb-6">
          <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-900 mb-1">
            Step 2: Education Details
          </h2>
          <p className="text-xs sm:text-sm text-gray-600">
            Add your educational background (SSLC and PUC details are not mandatory but included)
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
                {sslcExpanded ? (
                  <ChevronDown className="w-3 h-3 text-gray-600" strokeWidth={2.5} />
                ) : (
                  <ChevronDown className="w-3 h-3 text-gray-600 rotate-180" strokeWidth={2.5} />
                )}
              </button>
              <button
                type="button"
                className="w-5 h-5 flex items-center justify-center rounded-full border-2 border-gray-600 hover:bg-gray-100 transition-colors"
              >
                <X className="w-3 h-3 text-gray-600" strokeWidth={2.5} />
              </button>
            </div>
          </div>

          {sslcExpanded && (
            <div className="p-4 sm:p-5 md:p-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                {/* Institution Name */}
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
                    className="w-full px-3 py-2 sm:py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent text-xs sm:text-sm"
                  />
                </div>
                {/* Board Type */}
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
                {/* Year of Passing */}
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5">
                    Year Of Passing
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      name="yearOfPassing"
                      value={sslcData.yearOfPassing}
                      onChange={handleSslcChange}
                      placeholder="Select Year of Passing"
                      className="w-full px-3 py-2 sm:py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent text-xs sm:text-sm pr-8"
                    />
                    <svg
                      className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" strokeWidth="2" />
                      <line x1="16" y1="2" x2="16" y2="6" strokeWidth="2" />
                      <line x1="8" y1="2" x2="8" y2="6" strokeWidth="2" />
                      <line x1="3" y1="10" x2="21" y2="10" strokeWidth="2" />
                    </svg>
                  </div>
                </div>
                {/* Result Format */}
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
                {/* Result */}
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
                    className="w-full px-3 py-2 sm:py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent text-xs sm:text-sm"
                  />
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
                {puExpanded ? (
                  <ChevronDown className="w-3 h-3 text-gray-600" strokeWidth={2.5} />
                ) : (
                  <ChevronDown className="w-3 h-3 text-gray-600 rotate-180" strokeWidth={2.5} />
                )}
              </button>
              <button
                type="button"
                className="w-5 h-5 flex items-center justify-center rounded-full border-2 border-gray-600 hover:bg-gray-100 transition-colors"
              >
                <X className="w-3 h-3 text-gray-600" strokeWidth={2.5} />
              </button>
            </div>
          </div>
          {puExpanded && (
            <div className="p-4 sm:p-5 md:p-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                {/* Institution Name */}
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
                    className="w-full px-3 py-2 sm:py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent text-xs sm:text-sm"
                  />
                </div>
                {/* Board Type */}
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
                {/* Subject Stream */}
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
                {/* Year of Passing */}
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5">
                    Year OF Passing
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      name="yearOfPassing"
                      value={puData.yearOfPassing}
                      onChange={handlePuChange}
                      placeholder="Select Year of Passing"
                      className="w-full px-3 py-2 sm:py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent text-xs sm:text-sm pr-8"
                    />
                    <svg
                      className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" strokeWidth="2" />
                      <line x1="16" y1="2" x2="16" y2="6" strokeWidth="2" />
                      <line x1="8" y1="2" x2="8" y2="6" strokeWidth="2" />
                      <line x1="3" y1="10" x2="21" y2="10" strokeWidth="2" />
                    </svg>
                  </div>
                </div>
                {/* Result Format */}
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
                {/* Result */}
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
                    className="w-full px-3 py-2 sm:py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent text-xs sm:text-sm"
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Higher Education (Mandatory) */}
        {higherEducations.map((edu, index) => renderEducationCard(edu, index, false, false))}
        {/* Extra Education Cards */}
        {extraEducations.map((edu, index) => renderEducationCard(edu, index, true, true))}

        {/* Add Education Button */}
        <button
          type="button"
          onClick={addEducation}
          className="flex items-center gap-2 px-4 py-2.5 text-orange-400 hover:text-orange-500 font-medium text-sm transition-colors mb-4 md:mb-5"
        >
          <Plus className="w-4 h-4" />
          Add Education
        </button>

        {/* Action Buttons */}
        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={onBack}
            className="px-6 sm:px-8 py-2.5 sm:py-3 border-2 border-gray-300 hover:border-gray-400 text-gray-700 rounded-xl font-medium text-xs sm:text-sm transition-colors"
          >
            Back
          </button>
          <button
            type="submit"
            className="px-6 sm:px-8 py-2.5 sm:py-3 bg-orange-400 hover:bg-orange-500 text-white rounded-xl font-medium text-xs sm:text-sm transition-colors shadow-sm"
          >
            Proceed to next
          </button>
        </div>
      </div>
    </form>
  );
}
