import React, { useState, useEffect } from 'react';

interface InputGroupProps {
  /** Unique ID for the input element */
  id: string;
  /** Label text for the group */
  label: string;
  /** Current value of the input */
  value: string;
  /** Placeholder text */
  placeholder: string;
  /** List of clickable suggestion pills */
  suggestions: string[];
  /** Callback when value changes (via typing or clicking suggestion) */
  onChange: (value: string) => void;
}

const InputGroup: React.FC<InputGroupProps> = ({
  id,
  label,
  value,
  placeholder,
  suggestions,
  onChange,
}) => {
  const [shuffledSuggestions, setShuffledSuggestions] = useState<string[]>([]);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    // Fisher-Yates shuffle to randomize suggestions on mount
    const array = [...suggestions];
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    setShuffledSuggestions(array);
  }, [suggestions]);

  // Show 4 items by default
  const VISIBLE_COUNT = 4;

  const displayedSuggestions = isExpanded
    ? shuffledSuggestions
    : shuffledSuggestions.slice(0, VISIBLE_COUNT);

  const hasMore = shuffledSuggestions.length > VISIBLE_COUNT;

  return (
    <div className="flex flex-col space-y-2 animate-fade-in">
      <label htmlFor={id} className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
        {label}
      </label>
      <input
        type="text"
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full p-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm focus:bg-white dark:focus:bg-slate-800 focus:ring-2 focus:ring-indigo-200 dark:focus:ring-indigo-900 focus:border-indigo-300 dark:focus:border-indigo-700 outline-none transition-all duration-300 text-slate-800 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 font-sans text-sm"
      />
      <div className="flex flex-wrap gap-1.5 pt-0.5">
        {displayedSuggestions.map((suggestion) => (
          <button
            key={suggestion}
            type="button"
            onClick={() => onChange(suggestion)}
            className="px-2.5 py-1 text-[10px] sm:text-xs font-medium text-slate-600 dark:text-slate-400 bg-slate-100/80 dark:bg-slate-700/50 hover:bg-indigo-100 dark:hover:bg-indigo-900/40 hover:text-indigo-700 dark:hover:text-indigo-300 rounded-md transition-colors duration-200 cursor-pointer border border-transparent hover:border-indigo-200 dark:hover:border-indigo-800"
          >
            {suggestion}
          </button>
        ))}

        {hasMore && (
          <button
            type="button"
            onClick={() => setIsExpanded(!isExpanded)}
            className="px-2 py-1 flex items-center justify-center text-[10px] sm:text-xs font-medium text-slate-400 dark:text-slate-500 bg-slate-50 dark:bg-slate-800/30 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-md transition-colors duration-200 cursor-pointer border border-transparent hover:border-slate-300 dark:hover:border-slate-600"
            title={isExpanded ? "Show less" : "Show more"}
            aria-label={isExpanded ? "Show less suggestions" : "Show more suggestions"}
          >
            {isExpanded ? (
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3.5 h-3.5">
                <path fillRule="evenodd" d="M4 10a.75.75 0 01.75-.75h10.5a.75.75 0 010 1.5H4.75A.75.75 0 014 10z" clipRule="evenodd" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3.5 h-3.5">
                <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
              </svg>
            )}
          </button>
        )}
      </div>
    </div>
  );
};

export default InputGroup;