import React, { useState, useRef } from 'react';
import { ChevronDown, X } from 'lucide-react';

interface PersonalDetailsFormProps {
  onNext: (data: any) => void;
  onBack?: () => void;
  initialData?: any;
}

export default function PersonalDetailsForm({ onNext, onBack, initialData = {} }: PersonalDetailsFormProps) {
  const [formData, setFormData] = useState({
    firstName: initialData.firstName || '',
    middleName: initialData.middleName || '',
    lastName: initialData.lastName || '',
    email: initialData.email || '',
    mobileNumber: initialData.mobileNumber || '',
    dateOfBirth: initialData.dateOfBirth || '',
    gender: initialData.gender || 'Male',
    languages: initialData.languages || ['Kannada', 'Hindi', 'English'],
    address: initialData.address || '',
    country: initialData.country || '',
    state: initialData.state || '',
    city: initialData.city || '',
    pincode: initialData.pincode || '',
    nationality: initialData.nationality || '',
    passportNumber: initialData.passportNumber || '',
    profilePhoto: initialData.profilePhoto || null
  });

  const [newLanguage, setNewLanguage] = useState('');
  const [personalDetailsExpanded, setPersonalDetailsExpanded] = useState(true);
  const [currentLocationExpanded, setCurrentLocationExpanded] = useState(true);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, profilePhoto: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePhotoClick = () => {
    fileInputRef.current?.click();
  };

  const handleAddLanguage = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && newLanguage.trim()) {
      e.preventDefault();
      if (!formData.languages.includes(newLanguage.trim())) {
        setFormData(prev => ({
          ...prev,
          languages: [...prev.languages, newLanguage.trim()]
        }));
      }
      setNewLanguage('');
    }
  };

  const handleRemoveLanguage = (languageToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      languages: prev.languages.filter(lang => lang !== languageToRemove)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="px-3 sm:px-4 md:px-6 lg:px-8 py-4 md:py-6">
      <div className="max-w-6xl mx-auto">
        
        {/* Step Header */}
        <div className="mb-4 md:mb-6">
          <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-900 mb-1">
            Step 1: Personal Details
          </h2>
          <p className="text-xs sm:text-sm text-gray-600">
            Add your educational background (SSLC and PUC details are not mandatory but included)
          </p>
        </div>

        {/* Personal Details Section */}
        <div className="bg-white border border-gray-200 rounded-xl mb-4 md:mb-5 overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between px-4 sm:px-5 md:px-6 py-3 md:py-4 border-b border-gray-200">
            <h3 className="text-sm sm:text-base md:text-lg font-semibold text-gray-900">Personal Details</h3>
            <div className="flex gap-2 items-center">
              <button 
                type="button" 
                onClick={() => setPersonalDetailsExpanded(!personalDetailsExpanded)}
                className="w-5 h-5 flex items-center justify-center rounded-full border-2 border-gray-600 hover:bg-gray-100 transition-colors"
              >
                {personalDetailsExpanded ? (
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

          {/* Content */}
          {personalDetailsExpanded && (
            <div className="p-4 sm:p-5 md:p-6">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-5">
                {/* Profile Photo */}
                <div className="md:col-span-3 flex justify-center md:justify-start">
                  <div className="flex flex-col items-center">
                    <div 
                      onClick={handlePhotoClick}
                      className="relative w-28 h-28 sm:w-32 sm:h-32 md:w-36 md:h-36 lg:w-40 lg:h-40 bg-gray-100 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center overflow-hidden cursor-pointer hover:border-orange-400 transition-colors group"
                    >
                      {formData.profilePhoto ? (
                        <>
                          <img src={formData.profilePhoto} alt="Profile" className="w-full h-full object-cover" />
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setFormData(prev => ({ ...prev, profilePhoto: null }));
                            }}
                            className="absolute top-2 right-2 p-1 bg-white rounded-full shadow-md hover:bg-red-50 z-10"
                          >
                            <X className="w-3.5 h-3.5 text-red-500" />
                          </button>
                        </>
                      ) : (
                        <svg className="w-12 h-12 sm:w-14 sm:h-14 text-gray-400 group-hover:text-orange-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                      )}
                    </div>
                    <button
                      type="button"
                      onClick={handlePhotoClick}
                      className="mt-2 text-xs sm:text-sm text-gray-700 hover:text-orange-400 font-medium transition-colors"
                    >
                      Upload Profile Photo
                    </button>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handlePhotoUpload}
                      className="hidden"
                    />
                  </div>
                </div>

                {/* Form Fields */}
                <div className="md:col-span-9 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                  {/* First Name */}
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5">
                      First Name
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      placeholder="Aarav"
                      className="w-full px-3 py-2 sm:py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent text-xs sm:text-sm"
                    />
                  </div>

                  {/* Middle Name */}
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5">
                      Middle Name
                    </label>
                    <input
                      type="text"
                      name="middleName"
                      value={formData.middleName}
                      onChange={handleInputChange}
                      placeholder="Enter Middle Name"
                      className="w-full px-3 py-2 sm:py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent text-xs sm:text-sm"
                    />
                  </div>

                  {/* Last Name */}
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5">
                      Last Name
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      placeholder="Mehta"
                      className="w-full px-3 py-2 sm:py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent text-xs sm:text-sm"
                    />
                  </div>

                  {/* Email */}
                  <div className="sm:col-span-2">
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="aarav@gmail.com"
                      className="w-full px-3 py-2 sm:py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent text-xs sm:text-sm"
                    />
                  </div>

                  {/* Mobile Number */}
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5">
                      Mobile Number
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value="+91"
                        disabled
                        className="w-12 sm:w-14 px-2 py-2 sm:py-2.5 border border-gray-300 rounded-lg bg-gray-50 text-xs sm:text-sm text-center"
                      />
                      <input
                        type="tel"
                        name="mobileNumber"
                        value={formData.mobileNumber}
                        onChange={handleInputChange}
                        placeholder="8 8 8 8 8  8 8 8 8 8"
                        maxLength={10}
                        className="flex-1 px-3 py-2 sm:py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent text-xs sm:text-sm tracking-wider"
                      />
                    </div>
                  </div>

                  {/* Date of Birth */}
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5">
                      Date of Birth
                    </label>
                    <input
                      type="date"
                      name="dateOfBirth"
                      value={formData.dateOfBirth}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 sm:py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent text-xs sm:text-sm"
                    />
                  </div>

                  {/* Gender */}
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5">
                      Gender
                    </label>
                    <div className="relative">
                      <select
                        name="gender"
                        value={formData.gender}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 sm:py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent text-xs sm:text-sm appearance-none bg-white pr-8"
                      >
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                    </div>
                  </div>

                  {/* Languages Known */}
                  <div className="sm:col-span-2 lg:col-span-3">
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5">
                      Language Known
                    </label>
                    <div className="w-full px-3 py-2 sm:py-2.5 border border-gray-300 rounded-lg focus-within:ring-2 focus-within:ring-orange-400 focus-within:border-transparent min-h-[38px] sm:min-h-[42px]">
                      <div className="flex flex-wrap gap-2 items-center">
                        {formData.languages.map((lang, index) => (
                          <span
                            key={index}
                            className="inline-flex items-center gap-1 px-2 sm:px-2.5 py-0.5 sm:py-1 bg-gray-100 text-gray-700 rounded-md text-xs sm:text-sm"
                          >
                            {lang}
                            <button
                              type="button"
                              onClick={() => handleRemoveLanguage(lang)}
                              className="hover:text-red-500 transition-colors"
                            >
                              <X className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                            </button>
                          </span>
                        ))}
                        <input
                          type="text"
                          value={newLanguage}
                          onChange={(e) => setNewLanguage(e.target.value)}
                          onKeyDown={handleAddLanguage}
                          placeholder="Add Language known to you..."
                          className="flex-1 min-w-[150px] sm:min-w-[200px] outline-none text-xs sm:text-sm"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Current Location Section */}
        <div className="bg-white border border-gray-200 rounded-xl mb-4 md:mb-5 overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between px-4 sm:px-5 md:px-6 py-3 md:py-4 border-b border-gray-200">
            <h3 className="text-sm sm:text-base md:text-lg font-semibold text-gray-900">Current Location</h3>
            <div className="flex gap-2 items-center">
              <button 
                type="button"
                onClick={() => setCurrentLocationExpanded(!currentLocationExpanded)}
                className="w-5 h-5 flex items-center justify-center rounded-full border-2 border-gray-600 hover:bg-gray-100 transition-colors"
              >
                {currentLocationExpanded ? (
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

          {/* Content */}
          {currentLocationExpanded && (
            <div className="p-4 sm:p-5 md:p-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                {/* Address */}
                <div className="sm:col-span-2 lg:col-span-3">
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5">
                    Address
                  </label>
                  <textarea
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    placeholder="Enter your address"
                    rows={3}
                    className="w-full px-3 py-2 sm:py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent text-xs sm:text-sm resize-none"
                  />
                </div>

                {/* Country */}
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5">
                    Country
                  </label>
                  <div className="relative">
                    <select
                      name="country"
                      value={formData.country}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 sm:py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent text-xs sm:text-sm appearance-none bg-white pr-8"
                    >
                      <option value="">Select Country</option>
                      <option value="India">India</option>
                      <option value="USA">USA</option>
                      <option value="UK">UK</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                  </div>
                </div>

                {/* State */}
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5">
                    State
                  </label>
                  <div className="relative">
                    <select
                      name="state"
                      value={formData.state}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 sm:py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent text-xs sm:text-sm appearance-none bg-white pr-8"
                    >
                      <option value="">Select State</option>
                      <option value="Karnataka">Karnataka</option>
                      <option value="Maharashtra">Maharashtra</option>
                      <option value="Delhi">Delhi</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                  </div>
                </div>

                {/* City */}
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5">
                    City
                  </label>
                  <div className="relative">
                    <select
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 sm:py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent text-xs sm:text-sm appearance-none bg-white pr-8"
                    >
                      <option value="">Select City</option>
                      <option value="Bangalore">Bangalore</option>
                      <option value="Mumbai">Mumbai</option>
                      <option value="Delhi">Delhi</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                  </div>
                </div>

                {/* Pincode */}
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5">
                    Pincode
                  </label>
                  <input
                    type="text"
                    name="pincode"
                    value={formData.pincode}
                    onChange={handleInputChange}
                    placeholder="Enter Pin code"
                    className="w-full px-3 py-2 sm:py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent text-xs sm:text-sm"
                  />
                </div>

                {/* Nationality */}
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5">
                    Nationality
                  </label>
                  <div className="relative">
                    <select
                      name="nationality"
                      value={formData.nationality}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 sm:py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent text-xs sm:text-sm appearance-none bg-white pr-8"
                    >
                      <option value="">Select Nationality</option>
                      <option value="Indian">Indian</option>
                      <option value="American">American</option>
                      <option value="British">British</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                  </div>
                </div>

                {/* Passport Number */}
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5">
                    Passport Number
                  </label>
                  <input
                    type="text"
                    name="passportNumber"
                    value={formData.passportNumber}
                    onChange={handleInputChange}
                    placeholder="Enter Passport Number"
                    className="w-full px-3 py-2 sm:py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent text-xs sm:text-sm"
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end">
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