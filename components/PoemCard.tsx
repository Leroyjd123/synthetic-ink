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
    <div className="relative w-full max-w-lg mx-auto mt-4 p-8 md:p-12 bg-white rounded-2xl shadow-xl shadow-indigo-100/50 animate-fade-in border border-slate-50 flex flex-col min-h-[400px]">
      <div className="absolute top-4 right-4 flex gap-3">
        <button
          onClick={onSave}
          className={`group flex items-center gap-1.5 px-3 py-1.5 rounded-full transition-all duration-300 ${isSaved ? 'bg-rose-50 text-rose-600' : 'text-slate-400 hover:bg-slate-50 hover:text-rose-500'}`}
          aria-label={isSaved ? "Unsave poem" : "Save poem"}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill={isSaved ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" className="w-4 h-4 transition-transform group-active:scale-90">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
          </svg>
          <span className="text-xs font-medium uppercase tracking-wide">{isSaved ? 'Saved' : 'Save'}</span>
        </button>

        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-slate-400 hover:bg-slate-50 hover:text-indigo-600 transition-all duration-300"
          aria-label="Copy poem"
        >
          {copied ? (
            <span className="text-teal-600 text-xs font-medium uppercase tracking-wide">Copied</span>
          ) : (
            <span className="text-xs font-medium uppercase tracking-wide">Copy</span>
          )}
        </button>
      </div>
      
      <div className="flex-grow flex items-center justify-center">
        <div className="prose prose-slate prose-lg mx-auto text-center">
          <div className="whitespace-pre-wrap font-serif text-slate-800 leading-relaxed text-xl md:text-2xl italic">
            {content}
          </div>
        </div>
      </div>

      <div className="mt-8 flex flex-col items-center gap-6">
        <div className="h-1 w-16 bg-gradient-to-r from-indigo-200 to-pink-200 rounded-full opacity-60"></div>
        
        {/* Feedback Section */}
        <div className="flex items-center gap-4">
           <button
             onClick={() => handleFeedback('good')}
             className={`p-2 rounded-full transition-all duration-200 ${feedbackState === 'good' ? 'text-teal-600 bg-teal-50 ring-1 ring-teal-200' : 'text-slate-300 hover:text-teal-500 hover:bg-slate-50'}`}
             title="Good Poem"
           >
             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
               <path strokeLinecap="round" strokeLinejoin="round" d="M6.633 10.5c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a2.25 2.25 0 012.25 2.25V7.38a2.25 2.25 0 114.5 0v1.5a2.25 2.25 0 01-2.25 2.25H18.75A2.25 2.25 0 0116.5 13.38v1.5a2.25 2.25 0 012.25 2.25v1.5a2.25 2.25 0 01-2.25 2.25H15A9 9 0 006 21.75V10.5z" />
             </svg>
           </button>
           <button
             onClick={() => handleFeedback('bad')}
             className={`p-2 rounded-full transition-all duration-200 ${feedbackState === 'bad' ? 'text-rose-600 bg-rose-50 ring-1 ring-rose-200' : 'text-slate-300 hover:text-rose-500 hover:bg-slate-50'}`}
             title="Bad Poem"
           >
             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
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
