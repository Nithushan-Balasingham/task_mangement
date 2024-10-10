import React from "react";
import { FiInbox } from "react-icons/fi"; // Import the icon from react-icons

const NoData = () => {
  return (
    <div className="flex flex-col items-center justify-center ">
    <div className="bg-white p-6 rounded-lg shadow-lg text-center">
      <h1 className="text-2xl font-semibold text-gray-800">No Data Available</h1>
      <p className="text-gray-600 mt-2">Please try again later or refresh the page.</p>
      <div className="flex items-center justify-center">
      <FiInbox className="text-gray-500 text-6xl mb-4 text-center" />

      </div>
    </div>
  </div>
  );
};

export default NoData;
