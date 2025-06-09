import React from 'react';
const LoadingSpinner = ({ message = "Loading...", subtitle }) => (
  <div className="min-h-screen bg-gray-50 flex items-center justify-center">
    <div className="text-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
      <p className="mt-4 text-lg font-medium text-gray-700">{message}</p>
      {subtitle && <p className="mt-1 text-sm text-gray-500">{subtitle}</p>}
    </div>
  </div>
);

export default LoadingSpinner;