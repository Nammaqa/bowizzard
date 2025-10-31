
interface BankDetailsProps {
  formData: any;
  setFormData: (data: any) => void;
  onNext: () => void;
  onPrevious: () => void;
}

const BankDetails = ({
  formData,
  setFormData,
  onNext,
  onPrevious,
}: BankDetailsProps) => {
  return (
    <div className="bg-white rounded-md p-6">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-[#3A3A3A] mb-2">
            Account Holder Name
          </label>
          <input
            type="text"
            value={formData.accountHolderName || ""}
            onChange={(e) =>
              setFormData({ ...formData, accountHolderName: e.target.value })
            }
            placeholder="Enter Account Holder Name"
            className="w-full px-4 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF8351] focus:border-transparent"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-[#3A3A3A] mb-2">
              Bank Name
            </label>
            <select
              value={formData.bankName || ""}
              onChange={(e) =>
                setFormData({ ...formData, bankName: e.target.value })
              }
              className="w-full px-4 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF8351] focus:border-transparent"
            >
              <option value="">Select Bank Name</option>
              <option value="sbi">State Bank of India</option>
              <option value="hdfc">HDFC Bank</option>
              <option value="icici">ICICI Bank</option>
              <option value="axis">Axis Bank</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-[#3A3A3A] mb-2">
              Branch Name
            </label>
            <input
              type="text"
              value={formData.branchName || ""}
              onChange={(e) =>
                setFormData({ ...formData, branchName: e.target.value })
              }
              placeholder="Enter Branch Name"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF8351] focus:border-transparent"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-[#3A3A3A] mb-2">
              Account Number
            </label>
            <input
              type="text"
              value={formData.accountNumber || ""}
              onChange={(e) =>
                setFormData({ ...formData, accountNumber: e.target.value })
              }
              placeholder="Enter Bank Account Number"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF8351] focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#3A3A3A] mb-2">
              Confirm Account Number
            </label>
            <input
              type="text"
              value={formData.confirmAccountNumber || ""}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  confirmAccountNumber: e.target.value,
                })
              }
              placeholder="Confirm Bank Account Number"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF8351] focus:border-transparent"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-[#3A3A3A] mb-2">
              IFSC Code
            </label>
            <input
              type="text"
              value={formData.ifscCode || ""}
              onChange={(e) =>
                setFormData({ ...formData, ifscCode: e.target.value })
              }
              placeholder="Enter Bank IFSC Code"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF8351] focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#3A3A3A] mb-2">
              Account Type
            </label>
            <select
              value={formData.accountType || ""}
              onChange={(e) =>
                setFormData({ ...formData, accountType: e.target.value })
              }
              className="w-full px-4 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF8351] focus:border-transparent"
            >
              <option value="">Select Account Type</option>
              <option value="savings">Savings Account</option>
              <option value="current">Current Account</option>
            </select>
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-end mt-6 space-x-4">
          <button
            onClick={onPrevious}
            className="px-6 py-2.5 rounded-md border-2 border-[#FF8351] text-[#FF8351] font-semibold hover:bg-[#FFF5F0] transition-colors"
          >
            Previous
          </button>
          <button
            onClick={onNext}
            className="px-6 py-2.5 rounded-md text-white font-semibold transition-transform hover:scale-105"
            style={{
              background: "linear-gradient(180deg, #FF9D48 0%, #FF8251 100%)",
            }}
          >
            Confirm Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default BankDetails;