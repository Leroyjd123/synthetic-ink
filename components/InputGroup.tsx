import React from 'react';

interface InputGroupProps {
  id: string;
  label: string;
  value: string;
  placeholder: string;
  suggestions: string[];
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
  return (
    <div className="flex flex-col space-y-2 animate-fade-in">
      <label htmlFor={id} className="text-sm font-medium text-slate-500 uppercase tracking-wider">
        {label}
      </label>
      <input
        type="text"
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full p-3 rounded-xl border border-slate-200 bg-white/50 backdrop-blur-sm focus:bg-white focus:ring-2 focus:ring-indigo-200 focus:border-indigo-300 outline-none transition-all duration-300 text-slate-800 placeholder:text-slate-400 font-sans"
      />
      <div className="flex flex-wrap gap-2 pt-1">
        {suggestions.map((suggestion) => (
          <button
            key={suggestion}
            type="button"
            onClick={() => onChange(suggestion)}
            className="px-3 py-1 text-xs font-medium text-slate-600 bg-slate-100/80 hover:bg-indigo-100 hover:text-indigo-700 rounded-full transition-colors duration-200 cursor-pointer"
          >
            {suggestion}
          </button>
        ))}
      </div>
    </div>
  );
};

export default InputGroup;
