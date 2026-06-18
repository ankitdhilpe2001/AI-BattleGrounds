import React from 'react';

export const MetricScorecard = ({ metrics }) => {
  return (
    <div className="bg-yellow-300 border-4 border-yellow-400 rounded-lg p-3 sm:p-4">
      <h4 className="font-bold text-xs sm:text-sm text-black mb-2 sm:mb-3 border-b border-yellow-500 pb-2">
        METRIC SCORECARD
      </h4>
      
      <div className="space-y-2">
        {metrics.map((metric, idx) => (
          <div key={idx} className="flex items-center justify-between gap-2">
            <span className="font-bold text-xs text-black uppercase">{metric.label}</span>
            <div className="bg-black text-yellow-300 px-2 sm:px-3 py-1 rounded font-bold text-xs shrink-0">
              {metric.value}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};