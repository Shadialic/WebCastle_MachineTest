import useApi from "@/hooks/useApi";
import React, { useState } from "react";
import toast from "react-hot-toast";
const PhoneSetup = ({
  phoneNumber: initialPhone,
  isPhoneSet: initialIsPhoneSet,
  session,
  setIsPhoneSet,
}) => {
  const api = useApi(session);
  const [phoneNumber, setPhoneNumber] = useState(initialPhone);
  const [loading, setLoading] = useState(false);

  const handlePhoneSubmit = async () => {
    if (!phoneNumber.trim()) {
      toast.error("Please enter a valid phone number");
      return;
    }

    const phoneRegex = /^\+?[1-9]\d{1,14}$/;
    if (!phoneRegex.test(phoneNumber.replace(/\s+/g, ""))) {
      toast.error("Please enter a valid phone number with country code");
      return;
    }

    setLoading(true);

    try {
      const { data } = await api.post("/user/phone", { phoneNumber });
      if (data.success) {
        setIsPhoneSet(true);
        toast.success("Phone number saved successfully!");
      } else {
        toast.error(data.message || "Error saving phone number");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Error saving phone number");
    }

    setLoading(false);
  };

  const handleChangePhoneNumber = () => {
    setIsPhoneSet(false);
    setPhoneNumber("");
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Phone Setup</h2>

      {!initialIsPhoneSet ? (
        <div>
          <div className="mb-4">
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Phone Number
            </label>
            <input
              type="tel"
              id="phone"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="+1234567890"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
            <p className="mt-1 text-xs text-gray-500">
              Include country code (e.g., +1 for US)
            </p>
          </div>
          <button
            onClick={handlePhoneSubmit}
            disabled={loading || !phoneNumber.trim()}
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {loading ? "Saving..." : "Save Phone Number"}
          </button>
        </div>
      ) : (
        <div className="text-center">
          <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
            <svg
              className="w-6 h-6 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <p className="text-sm font-medium text-gray-900 mb-1">
            Phone Number Set
          </p>
          <p className="text-sm text-gray-500 mb-4">{initialPhone}</p>
          <button
            onClick={handleChangePhoneNumber}
            className="text-sm text-indigo-600 hover:text-indigo-500 transition-colors"
          >
            Change Number
          </button>
        </div>
      )}
    </div>
  );
};

export default PhoneSetup;
