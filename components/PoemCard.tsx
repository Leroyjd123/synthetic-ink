import React, { useState } from 'react';

interface PoemCardProps {
  content: string;
  isSaved: boolean;
  onSave: () => void;
  onFeedback: (type: 'good' | 'bad') => void;
}

const PoemCard: React.FC<PoemCardProps> = ({ content, isSaved, onSave, onFeedback }) => {
  const [copied, setCopied] = useState(false);
  const [feedbackState, setFeedbackState] = useState<'good' | 'bad' | null>(null);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy!', err);
    }
  };

  const handleFeedback = (type: 'good' | 'bad') => {
    setFeedbackState(type);
    onFeedback(type);
  };

  return (
    <div className="w-full max-w-lg mx-auto p-6 md:p-8 bg-white dark:bg-slate-800 rounded-xl shadow-xl shadow-indigo-100/50 dark:shadow-none animate-fade-in border border-slate-50 dark:border-slate-700 flex flex-col min-h-[320px]">
      
      {/* Header Actions */}
      <div className="flex justify-end gap-3 mb-2">
        <button
          onClick={onSave}
          className={`group flex items-center gap-1.5 px-3 py-1.5 rounded-full transition-all duration-300 ${isSaved ? 'bg-rose-50 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400' : 'text-slate-400 dark:text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-700 hover:text-rose-500 dark:hover:text-rose-400'}`}
          aria-label={isSaved ? "Unsave poem" : "Save poem"}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill={isSaved ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" className="w-4 h-4 transition-transform group-active:scale-90">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
          </svg>
          <span className="text-xs font-medium uppercase tracking-wide">{isSaved ? 'Saved' : 'Save'}</span>
        </button>

        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-slate-400 dark:text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-700 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all duration-300"
          aria-label="Copy poem"
        >
          {copied ? (
            <span className="text-teal-600 dark:text-teal-400 text-xs font-medium uppercase tracking-wide">Copied</span>
          ) : (
            <span className="text-xs font-medium uppercase tracking-wide">Copy</span>
          )}
        </button>
      </div>
      
      {/* Poem Content */}
      <div className="flex-grow flex items-center justify-center py-6">
        <div className="prose prose-slate dark:prose-invert prose-lg mx-auto text-center w-full">
          <div className="whitespace-pre-wrap font-serif text-slate-800 dark:text-slate-200 leading-relaxed text-lg md:text-xl italic">
            {content}
          </div>
        </div>
      </div>

      {/* Footer / Feedback */}
      <div className="mt-4 flex flex-col items-center gap-4">
        <div className="h-1 w-12 bg-gradient-to-r from-indigo-200 to-pink-200 dark:from-indigo-800 dark:to-pink-800 rounded-full opacity-60"></div>
        
        <div className="flex items-center gap-3">
           <button
             onClick={() => handleFeedback('good')}
             className={`p-1.5 rounded-full transition-all duration-200 ${feedbackState === 'good' ? 'text-teal-600 dark:text-teal-400 bg-teal-50 dark:bg-teal-900/30 ring-1 ring-teal-200 dark:ring-teal-800' : 'text-slate-300 dark:text-slate-600 hover:text-teal-500 hover:bg-slate-50 dark:hover:bg-slate-700'}`}
             title="Good Poem"
           >
             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
               <path strokeLinecap="round" strokeLinejoin="round" d="M6.633 10.5c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a2.25 2.25 0 012.25 2.25V7.38a2.25 2.25 0 114.5 0v1.5a2.25 2.25 0 01-2.25 2.25H18.75A2.25 2.25 0 0116.5 13.38v1.5a2.25 2.25 0 012.25 2.25v1.5a2.25 2.25 0 01-2.25 2.25H15A9 9 0 006 21.75V10.5z" />
             </svg>
           </button>
           <button
             onClick={() => handleFeedback('bad')}
             className={`p-1.5 rounded-full transition-all duration-200 ${feedbackState === 'bad' ? 'text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-900/30 ring-1 ring-rose-200 dark:ring-rose-800' : 'text-slate-300 dark:text-slate-600 hover:text-rose-500 hover:bg-slate-50 dark:hover:bg-slate-700'}`}
             title="Bad Poem"
           >
             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
               <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 15h2.25a2.25 2.25 0 102.25-2.25V11.25a2.25 2.25 0 00-2.25-2.25H7.5A9 9 0 006 20.25V9a9 9 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3" />
               <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 15V3.75A2.25 2.25 0 019.75 1.5H15a9 9 0 016 9v11.25" />
             </svg>
           </button>
        </div>
      </div>
    </div>
  );
};

export default PoemCard;