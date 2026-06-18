import { Send } from 'lucide-react';

export const InputCommand = ({ input, setInput, onSubmit }) => {
  const handleSubmit = () => {
    if (onSubmit) {
      onSubmit(input);
    }
    setInput('');
  };

  return (
    <div className="bg-white border-4 border-black rounded-lg p-4 sm:p-6 mb-4 sm:mb-6 [box-shadow:8px_10px_0_0_rgba(0,0,0,1)]">
      <div className="flex items-start gap-2 sm:gap-4">
        <div className="bg-black text-white p-2 rounded shrink-0">
          <span className="text-base sm:text-lg">⌨️</span>
        </div>
        
        <div className="flex-1">
          <p className="text-red-600 font-bold text-xs tracking-wider mb-2">
            INPUT QUERY
          </p>
        </div>
      </div>

      {/* Command Input Field */}
      <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 mt-4 sm:mt-6 sm:ml-12">
        <input
          type="text"
          value={input} 
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
          placeholder="Input your Query"
          className="flex-1 bg-gray-100 border border-gray-300 px-3 sm:px-4 py-2 sm:py-3 rounded text-xs sm:text-sm text-gray-600 placeholder-gray-400 focus:outline-none focus:border-black"
        />
        <button
          onClick={handleSubmit}
          className="bg-black text-white p-2 sm:p-3 rounded hover:bg-gray-900 shrink-0"
        >
          <Send size={18} className="sm:w-5 sm:h-5" />
        </button>
      </div>
    </div>
  );
};