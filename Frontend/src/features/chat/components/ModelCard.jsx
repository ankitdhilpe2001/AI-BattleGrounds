import ReactMarkdown from 'react-markdown';

export const ModelCard = ({
  name,
  bgColor,
  borderColor,
  content,
  systemNote
}) => {
  return (
    <div className={`flex-1 border-4 ${borderColor} rounded-lg overflow-hidden shadow-xl`}>
      {/* Header */}
      <div className={`${bgColor} text-white px-3 sm:px-4 py-2 sm:py-3 flex items-center justify-between`}>
        <div>
          <h3 className="font-bold text-xs sm:text-sm">{name}</h3>
        </div>
      
      </div>

      {/* Content */}
      <div className="bg-white p-3 sm:p-4">
        <div className="text-gray-800 text-xs sm:text-sm leading-relaxed mb-3 sm:mb-4 prose prose-sm max-w-none overflow-x-auto">
          <ReactMarkdown>{content}</ReactMarkdown>
        </div>

        {/* System Note */}
        {systemNote && (
          <div className="bg-yellow-300 border-2 border-yellow-400 px-2 sm:px-3 py-1 sm:py-2 rounded">
            <p className="text-black text-xs font-bold">{systemNote}</p>
          </div>
        )}
      </div>
    </div>
  );
};