import React from 'react'

export default function Spinner() {
  return (
    <div className="flex flex-col items-center justify-center p-6 space-y-3">
      <div
        className={`
          $w-100 h-100 border-6
          border-t-orange-500 border-r-orange-500 border-b-gray-700 border-l-gray-700 
          rounded-full 
          animate-spin 
          shadow-lg
        `}
      ></div>
    </div>
  );
}

