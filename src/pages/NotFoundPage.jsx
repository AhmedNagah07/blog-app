import React from "react";
import { Zap } from "lucide-react";
export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4 font-sans text-white">
      <div
        id="custom-alert-modal"
        className=" fixed inset-0 z-50 hidden items-start justify-center pt-20"
      >
        <div className="bg-orange-500 text-white font-bold px-6 py-3 rounded-lg shadow-2xl transition-all duration-300 transform scale-100 animate-pulse">
          <p id="custom-alert-text"></p>
        </div>
      </div>

      <div className="bg-gray-800 p-8 sm:p-12 rounded-2xl shadow-2xl max-w-lg w-full text-center border border-gray-700 transform hover:shadow-orange-500/50 transition duration-300">
        <Zap className="w-16 h-16 sm:w-20 sm:h-20 text-orange-500 mx-auto mb-6 animate-pulse" />

        <h1 className="text-8xl sm:text-9xl font-extrabold text-orange-500 mb-4">
          404
        </h1>

        <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-gray-100">
          Oops! Not Found Page.
        </h2>

        <p className="text-lg text-gray-400 mb-8">
          It looks like the blog post you were looking for has either moved,
          been archived, or never existed. We couldn't find this page in our
          archives.
        </p>
      </div>
    </div>
  );
}
