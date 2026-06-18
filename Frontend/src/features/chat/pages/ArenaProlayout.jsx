import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { Header } from '../components/Header';
import { InputCommand } from '../components/InputCommand'
import { ModelCard } from '../components/ModelCard';
import { JudgeAnalysis } from '../components/JudgeAnalysis';
import { DecisionReasoning } from '../components/DecisionReasoning';
import useResponse from '../hooks/useReponse';

export const ArenaProLayout = () => {
  const [input, setInput] = useState('');
  const { handleSendMessage, loading, error, battleState} = useResponse();

  const handleCommandSubmit = async (input) => {
    try {
      const res = await handleSendMessage(input);
      console.log('Submitted command:', input, res);
    } catch (err) {
      console.error(err);
    }
  };

  const modelCardData = [
    {
      name: battleState?.solution_1?.model ? battleState.solution_1.model.toUpperCase() : 'MODEL ALPHA-4',
      latency: battleState?.solution_1?.score ? `${battleState.solution_1.score}/10` : 'PENDING',
      bgColor: 'bg-red-500',
      borderColor: 'border-red-500',
      badgeColor: 'bg-black',
      content: battleState?.solution_1?.message || 'Waiting for Solution 1 output from the API...',
      systemNote: battleState?.solution_1?.message ? `Model score ${battleState.solution_1.score}` : null,
    },
    {
      name: battleState?.solution_2?.model ? battleState.solution_2.model.toUpperCase() : 'MODEL SIGMA-TURBO',
      latency: battleState?.solution_2?.score ? `${battleState.solution_2.score}/10` : 'PENDING',
      bgColor: 'bg-blue-500',
      borderColor: 'border-blue-500',
      badgeColor: 'bg-yellow-300',
      content: battleState?.solution_2?.message || 'Waiting for Solution 2 output from the API...',
      systemNote: battleState?.solution_2?.message ? `Model score ${battleState.solution_2.score}` : null,
    }
  ];

  const winnerLabel = battleState?.judge_recommendation?.winner === 'solution_1'
    ? (battleState?.solution_1?.model || 'TBD').toUpperCase()
    : (battleState?.solution_2?.model || 'TBD').toUpperCase();

  const winnerScore = battleState?.judge_recommendation?.winner === 'solution_1'
    ? battleState?.judge_recommendation?.solution_1_score
    : battleState?.judge_recommendation?.solution_2_score;

  const metricsData = [
    { label: 'SOLUTION 1', value: battleState?.solution_1?.score ? `${battleState.solution_1.score}/10` : '—' },
    { label: 'SOLUTION 2', value: battleState?.solution_2?.score ? `${battleState.solution_2.score}/10` : '—' },
    { label: 'JUDGE SCORE', value: battleState?.final_output?.score ? `${battleState.final_output.score}/10` : '—' }
  ];

  const reasoningText = battleState?.judge_recommendation?.reasoning ||
    'Judge reasoning will appear here after the API response completes.';

  const finalMessage = battleState?.final_output?.message || 'Final model output will appear here once the battle finishes.';

  return (
    <div className="flex h-screen w-full bg-gray-100">
      <div className="flex-1 flex flex-col overflow-hidden w-full">
        <Header />

        <div className="flex-1 overflow-auto bg-gray-50">
          <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 py-4 sm:py-6 space-y-4 sm:space-y-6">
            {loading && (
              <div className="rounded-xl bg-yellow-100 border border-yellow-200 p-3 sm:p-4 text-xs sm:text-sm text-yellow-900">
                Generating battle results...
              </div>
            )}

            {error && (
              <div className="rounded-xl bg-red-100 border border-red-200 p-3 sm:p-4 text-xs sm:text-sm text-red-900">
                Error: {error}
              </div>
            )}

            <div className="flex flex-col gap-4 sm:gap-6 mb-4 sm:mb-6 lg:flex-row">
              <ModelCard
                name={modelCardData[0].name}
                latency={modelCardData[0].latency}
                bgColor={modelCardData[0].bgColor}
                borderColor={modelCardData[0].borderColor}
                badgeColor={modelCardData[0].badgeColor}
                content={modelCardData[0].content}
                systemNote={modelCardData[0].systemNote}
              />
              <ModelCard
                name={modelCardData[1].name}
                latency={modelCardData[1].latency}
                bgColor={modelCardData[1].bgColor}
                borderColor={modelCardData[1].borderColor}
                badgeColor={modelCardData[1].badgeColor}
                content={modelCardData[1].content}
                systemNote={modelCardData[1].systemNote}
              />
            </div>

            <JudgeAnalysis
              score={battleState?.final_output?.score || 0}
              winner={winnerLabel || 'TBD'}
              confidenceLevel={winnerScore ? winnerScore * 10 : 0}
            />

            <DecisionReasoning
              reasoning={reasoningText}
              metrics={metricsData}
            />

            <div className="bg-white border-4 border-black rounded-lg p-4 sm:p-6 [box-shadow:8px_10px_0_0_rgba(0,0,0,1)]">
              <h3 className="font-bold text-xs sm:text-sm text-red-600 mb-2 sm:mb-3 tracking-wider">
                FINAL OUTPUT
              </h3>
              <div className="text-xs sm:text-sm leading-relaxed prose prose-sm max-w-none">
                <ReactMarkdown>{finalMessage}</ReactMarkdown>
              </div>
            </div>

            <InputCommand input={input} setInput={setInput} onSubmit={handleCommandSubmit} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArenaProLayout;
