import React from 'react';

export const JudgeAnalysis = ({ score, winner, confidenceLevel }) => {
  return (
    <div className="bg-white border-4 border-black rounded-lg p-4 sm:p-6 mb-4 sm:mb-6 [box-shadow:8px_10px_0_0_rgba(0,0,0,1)]">
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
        {/* Score Display */}
        <div className="flex flex-col items-center gap-2">
          <div className="bg-black border-4 border-red-500 rounded-lg w-20 h-20 sm:w-24 sm:h-24 flex items-center justify-center shrink-0">
            <span className="text-white font-bold text-2xl sm:text-4xl">{score}</span>
          </div>
        </div>

        {/* Analysis Content */}
        <div className="flex-1 w-full">
          <h3 className="font-bold text-base sm:text-lg mb-3 sm:mb-4">JUDGE ANALYSIS</h3>
          
          {/* Winner Badge */}
          <div className="flex items-center gap-3 mb-4 sm:mb-6">
            <div className="bg-red-500 w-5 h-5 flex items-center justify-center rounded shrink-0">
              <span className="text-white text-xs font-bold">✓</span>
            </div>
            <p className="font-bold text-xs sm:text-sm text-black wrap-break-word">WINNER: {winner}</p>
          </div>

          {/* Confidence Level */}
          <div>
            <p className="text-xs font-bold text-gray-600 mb-2">CONFIDENCE LEVEL</p>
            <div className="flex items-center gap-2 sm:gap-4">
              <div className="flex-1 bg-gray-200 rounded-full h-3 overflow-hidden">
                <div
                  className="bg-blue-500 h-full rounded-full"
                  style={{ width: `${confidenceLevel}%` }}
                ></div>
              </div>
              <span className="font-bold text-xs sm:text-sm text-black min-w-fit">{confidenceLevel}%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};