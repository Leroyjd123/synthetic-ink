import React from 'react';
import { PoemRecord } from '../types';

interface PoemListProps {
  poems: PoemRecord[];
  type: 'history' | 'saved';
  onSelect: (poem: PoemRecord) => void;
  onDelete?: (id: string) => void;
}

const PoemList: React.FC<PoemListProps> = ({ poems, type, onSelect, onDelete }) => {
  if (poems.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-slate-400 animate-fade-in">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 mb-3 opacity-30">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
        </svg>
        <p className="text-sm font-medium">No {type === 'saved' ? 'saved poems' : 'history'} yet.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar animate-fade-in">
      {poems.map((poem) => (
        <div 
          key={poem.id} 
          className="group relative bg-white/60 hover:bg-white p-4 rounded-xl border border-slate-100 hover:shadow-md transition-all duration-200 cursor-pointer"
          onClick={() => onSelect(poem)}
        >
          <div className="flex justify-between items-start mb-2">
             <div className="flex flex-wrap gap-2 text-[10px] uppercase tracking-wider font-semibold text-slate-400">
               <span className="bg-slate-100 px-2 py-0.5 rounded">{poem.config.theme || 'Untitled'}</span>
               <span>•</span>
               <span>{poem.config.style || 'Free Verse'}</span>
             </div>
             <span className="text-[10px] text-slate-300 font-mono">{new Date(poem.date).toLocaleDateString()}</span>
          </div>
          
          <p className="font-serif text-slate-700 text-sm line-clamp-3 italic leading-relaxed">
            {poem.text}
          </p>
          
          {onDelete && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDelete(poem.id);
              }}
              className="absolute top-3 right-3 p-1.5 text-slate-300 hover:text-rose-500 hover:bg-rose-50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
              title="Remove"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
              </svg>
            </button>
          )}
        </div>
      ))}
    </div>
  );
};

export default PoemList;
