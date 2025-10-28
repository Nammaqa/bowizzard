
const VerificationSubmitted = () => {
  return (
    <div className="bg-white rounded-md p-12 flex flex-col items-center justify-center min-h-[500px]">
      <div className="w-32 h-32 rounded-full bg-green-100 flex items-center justify-center mb-6">
        <svg
          className="w-16 h-16 text-green-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={3}
            d="M5 13l4 4L19 7"
          />
        </svg>
      </div>

      <h2 className="text-2xl font-semibold text-[#3A3A3A] mb-3">
        Your Profile is sent for Verification
      </h2>
      <p className="text-gray-600 text-center">
        You will be sent a notification when your profile is verified.
      </p>
    </div>
  );
};

export default VerificationSubmitted;