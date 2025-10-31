import React from "react";

interface ProgressStepperProps {
  currentStep: number;
}

const ProgressStepper = ({ currentStep }: ProgressStepperProps) => {
  const steps = [
    { label: "Personal", step: 1 },
    { label: "Education", step: 2 },
    { label: "Work", step: 3 },
    { label: "Bank", step: 4 },
  ];

  const lineMargins = ["-ml-5 -mr-6", "-ml-6 -mr-2", "-ml-2 -mr-2"];

  return (
    <div className="relative px-4 mb-8">
      <div className="flex items-center justify-between w-full">
        {steps.map((stepItem, index) => (
          <React.Fragment key={stepItem.step}>
            {/* Step */}
            <div className="flex flex-col items-center relative z-10">
              <span className="text-sm mb-2 text-center font-medium text-gray-900">
                {stepItem.label}
              </span>
              <div
                className={`w-4 h-4 rounded-full border-2 ${
                  currentStep >= stepItem.step
                    ? "border-[#FF8351]"
                    : "border-[#FFE6D5]"
                }`}
              ></div>
            </div>

            {/* Connecting Line */}
            {index < steps.length - 1 && (
              <div className="flex-1 relative" style={{ marginTop: "26px" }}>
                <div
                  className={`absolute left-0 right-0 top-1/2 transform -translate-y-1/2 h-0.5 ${
                    currentStep >= stepItem.step + 1
                      ? "bg-[#FF8351]"
                      : "bg-[#FFE6D5]"
                  } ${lineMargins[index]}`}
                ></div>
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default ProgressStepper;
