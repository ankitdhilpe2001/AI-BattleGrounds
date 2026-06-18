import React from 'react';
import ReactMarkdown from 'react-markdown';
import { MetricScorecard } from './MetricScorecard';

export const DecisionReasoning = ({ reasoning, metrics }) => {
  return (
    <div className="bg-white border-4 border-black rounded-lg p-4 sm:p-6 [box-shadow:8px_10px_0_0_rgba(0,0,0,1)]">
      <h3 className="font-bold text-xs sm:text-sm text-red-600 mb-3 sm:mb-4 tracking-wider">
        DECISION REASONING
      </h3>

      <div className="flex flex-col lg:flex-row gap-4 sm:gap-6">
        {/* Reasoning Text */}
        <div className="flex-1 min-w-0">
          <div className="text-gray-800 text-xs sm:text-sm leading-relaxed prose prose-sm max-w-none overflow-x-auto">
            <ReactMarkdown>{reasoning}</ReactMarkdown>
          </div>
        </div>

        {/* Metric Scorecard */}
        <div className="w-full lg:w-56 flex-shrink-0">
          <MetricScorecard metrics={metrics} />
        </div>
      </div>
    </div>
  );
};