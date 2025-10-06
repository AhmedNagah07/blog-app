import React from 'react'

export default function Spinner() {
  return (
    <div className="flex flex-col items-center justify-center p-6 space-y-3">
      <div
        className={`
          w-100 h-100 border-8 
          border-transparent 
          border-x-blue-600 
          rounded-full 
          animate-spin 
          shadow-md
        `}
      ></div>
    </div>
  );
}

