import React from 'react';
import { Check } from 'lucide-react';

interface ProfileStepperProps {
  steps: string[];
  currentStep: number;
  onStepClick: (stepIndex: number) => void;
}

export default function ProfileStepper({ steps, currentStep, onStepClick }: ProfileStepperProps) {
  return (
    <div className="w-full">
      {/* Desktop/Tablet View */}
      <div className="hidden sm:flex items-start">
        {steps.map((step, index) => (
          <React.Fragment key={index}>
            {/* Step Item */}
            <div className="flex flex-col items-center flex-1">
              <span
                className={`text-xs md:text-[13px] font-medium text-center leading-tight mb-2 px-1 ${
                  index === currentStep
                    ? 'text-gray-900'
                    : index < currentStep
                    ? 'text-gray-700'
                    : 'text-gray-500'
                }`}
              >
                {step}
              </span>
              <div className="w-full flex items-center">
                {/* Left Line Half */}
                {index > 0 && (
                  <div className="flex-1 h-[2px] bg-gray-200 relative">
                    <div
                      className={`absolute top-0 left-0 h-full transition-all duration-500 ${
                        index <= currentStep ? 'bg-orange-400' : 'bg-gray-200'
                      }`}
                      style={{
                        width: index < currentStep ? '100%' : index === currentStep ? '100%' : '0%'
                      }}
                    />
                  </div>
                )}
                
                {/* Circle */}
                <button
                  onClick={() => onStepClick(index)}
                  className="flex-shrink-0 cursor-pointer transition-all group relative"
                >
                  <div
                    className={`w-3 h-3 rounded-full flex items-center justify-center transition-all border-2 ${
                      index === currentStep
                        ? 'bg-orange-400 border-orange-400 text-white'
                        : index < currentStep
                        ? 'bg-white border-orange-400 text-orange-400'
                        : 'bg-white border-gray-300 text-gray-400'
                    }`}
                  >
                    {index < currentStep && (
                      <Check className="w-2 h-2" strokeWidth={3} />
                    )}
                  </div>
                </button>

                {/* Right Line Half */}
                {index < steps.length - 1 && (
                  <div className="flex-1 h-[2px] bg-gray-200 relative">
                    <div
                      className={`absolute top-0 left-0 h-full transition-all duration-500 ${
                        index < currentStep ? 'bg-orange-400' : 'bg-gray-200'
                      }`}
                      style={{
                        width: index < currentStep ? '100%' : '0%'
                      }}
                    />
                  </div>
                )}
              </div>
            </div>
          </React.Fragment>
        ))}
      </div>

      {/* Mobile View */}
      <div className="sm:hidden">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-medium text-gray-700">
            Step {currentStep + 1} of {steps.length}
          </span>
          <span className="text-xs font-semibold text-orange-400">
            {steps[currentStep]}
          </span>
        </div>
        
        {/* Progress Bar */}
        <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-orange-400 transition-all duration-300 rounded-full"
            style={{
              width: `${((currentStep + 1) / steps.length) * 100}%`
            }}
          />
        </div>

        {/* Step Dots */}
        <div className="flex items-center justify-center gap-1.5 mt-3">
          {steps.map((_, index) => (
            <button
              key={index}
              onClick={() => onStepClick(index)}
              className={`h-1.5 rounded-full transition-all ${
                index === currentStep
                  ? 'bg-orange-400 w-6'
                  : index < currentStep
                  ? 'bg-orange-200 w-1.5'
                  : 'bg-gray-300 w-1.5'
              }`}
              aria-label={`Go to step ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}