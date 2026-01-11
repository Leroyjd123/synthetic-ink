import React, { useState, useCallback, useEffect } from 'react';
import { PoemConfig, PoemRecord } from './types';
import { SUGGESTIONS_DATA } from './constants';
import { generatePoem } from './services/geminiService';
import InputGroup from './components/InputGroup';
import PoemCard from './components/PoemCard';
import PoemList from './components/PoemList';

/**
 * Main Application Component
 * Manages global state including poem configuration, generated history, saved poems, and UI themes.
 */
const App: React.FC = () => {
  const [config, setConfig] = useState<PoemConfig>({
    theme: '',
    tone: '',
    style: '',
    length: '',
  });

  const [activeTab, setActiveTab] = useState<'generate' | 'saved' | 'history'>('generate');
  const [currentPoemRecord, setCurrentPoemRecord] = useState<PoemRecord | null>(null);
  const [loading, setLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Toggle Dark Mode
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  // Loading Message Cycle
  useEffect(() => {
    if (loading) {
      const messages = [
        "Listening for words...",
        "Gathering inspiration...",
        "Weaving metaphors...",
        "Finding the rhythm...",
        "Polishing verses...",
        "Composing..."
      ];
      let i = 0;
      setLoadingMessage(messages[0]);

      const interval = setInterval(() => {
        i = (i + 1) % messages.length;
        setLoadingMessage(messages[i]);
      }, 1500);

      return () => clearInterval(interval);
    }
  }, [loading]);

  // Persistent State
  const [history, setHistory] = useState<PoemRecord[]>(() => {
    const saved = localStorage.getItem('poem_history');
    return saved ? JSON.parse(saved) : [];
  });

  const [savedPoems, setSavedPoems] = useState<PoemRecord[]>(() => {
    const saved = localStorage.getItem('poem_saved');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('poem_history', JSON.stringify(history));
  }, [history]);

  useEffect(() => {
    localStorage.setItem('poem_saved', JSON.stringify(savedPoems));
  }, [savedPoems]);

  const handleInputChange = (field: keyof PoemConfig, value: string) => {
    setConfig((prev) => ({ ...prev, [field]: value }));
  };

  const handleRandomize = useCallback(() => {
    const newConfig: PoemConfig = {
      theme: '',
      tone: '',
      style: '',
      length: '',
    };

    SUGGESTIONS_DATA.forEach((category) => {
      const randomIndex = Math.floor(Math.random() * category.suggestions.length);
      newConfig[category.id] = category.suggestions[randomIndex];
    });

    setConfig(newConfig);
  }, []);

  // Run randomizer on initial mount
  useEffect(() => {
    handleRandomize();
  }, [handleRandomize]);

  const handleGenerate = async () => {
    setLoading(true);
    setError(null);
    setActiveTab('generate');
    setCurrentPoemRecord(null);

    try {
      const text = await generatePoem(config);
      const newRecord: PoemRecord = {
        id: crypto.randomUUID(),
        text,
        date: new Date().toISOString(),
        config: { ...config }
      };

      setCurrentPoemRecord(newRecord);
      setHistory((prev) => [newRecord, ...prev].slice(0, 50)); // Keep last 50
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  const toggleSavePoem = (poem: PoemRecord) => {
    const isSaved = savedPoems.some(p => p.id === poem.id);
    if (isSaved) {
      setSavedPoems(prev => prev.filter(p => p.id !== poem.id));
    } else {
      setSavedPoems(prev => [poem, ...prev]);
    }
  };

  const deleteSavedPoem = (id: string) => {
    setSavedPoems(prev => prev.filter(p => p.id !== id));
  };

  const handleSelectPoem = (poem: PoemRecord) => {
    setCurrentPoemRecord(poem);
    setActiveTab('generate');
    setConfig(poem.config);
  };

  const isCurrentSaved = currentPoemRecord ? savedPoems.some(p => p.id === currentPoemRecord.id) : false;

  return (
    <div className="h-screen flex flex-col overflow-hidden bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-slate-950 dark:via-slate-900 dark:to-indigo-950 text-slate-800 dark:text-slate-100 font-sans selection:bg-indigo-100 selection:text-indigo-900 dark:selection:bg-indigo-900 dark:selection:text-indigo-100 transition-colors duration-500">

      {/* Header */}
      <header className="flex-none px-6 py-4 flex items-center justify-between border-b border-slate-200/50 dark:border-slate-800/50 bg-white/30 dark:bg-slate-900/30 backdrop-blur-md">
        <div>
          <h1 className="text-xl md:text-2xl font-serif font-medium text-slate-900 dark:text-white tracking-tight">
            Synthetic Ink <span className="text-[10px] font-sans font-normal align-top bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded ml-1 text-slate-500 dark:text-slate-400">v1.2.0</span>
          </h1>
          <p className="hidden md:block text-xs text-slate-500 dark:text-slate-400 italic">
            “Written by a machine. Felt by you.”
          </p>
        </div>

        <button
          onClick={() => setIsDarkMode(!isDarkMode)}
          className="p-2 rounded-full hover:bg-white/50 dark:hover:bg-slate-800/50 text-slate-600 dark:text-slate-400 transition-colors"
          aria-label="Toggle Dark Mode"
        >
          {isDarkMode ? (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
            </svg>
          )}
        </button>
      </header>

      {/* Main Content - Single Screen */}
      <main className="flex-1 grid grid-cols-1 md:grid-cols-12 min-h-0 divide-y md:divide-y-0 md:divide-x divide-slate-200/50 dark:divide-slate-800/50">

        {/* Controls Section (Scrollable on mobile, Fixed on Desktop) */}
        <div className="md:col-span-5 flex flex-col p-6 overflow-y-auto custom-scrollbar md:h-full">
          <div className="flex-1 flex flex-col justify-center max-w-md mx-auto w-full space-y-6">
            <div className="space-y-5">
              {SUGGESTIONS_DATA.map((category) => (
                <InputGroup
                  key={category.id}
                  id={category.id}
                  label={category.label}
                  value={config[category.id]}
                  placeholder={category.placeholder}
                  suggestions={category.suggestions}
                  onChange={(val) => handleInputChange(category.id, val)}
                />
              ))}
            </div>

            <div className="flex gap-3 pt-2">
              <button
                onClick={handleRandomize}
                disabled={loading}
                className="flex-1 px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-600 text-slate-600 dark:text-slate-300 font-medium text-sm hover:bg-slate-50 dark:hover:bg-slate-800 hover:border-slate-400 dark:hover:border-slate-500 active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Randomize
              </button>
              <button
                onClick={handleGenerate}
                disabled={loading}
                className="flex-1 px-4 py-3 rounded-xl bg-slate-900 dark:bg-indigo-600 text-white font-medium text-sm hover:bg-slate-800 dark:hover:bg-indigo-500 shadow-lg shadow-slate-900/10 dark:shadow-indigo-900/20 active:scale-[0.98] transition-all disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center"
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  </span>
                ) : (
                  'Generate'
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Display Section */}
        <div className="md:col-span-7 flex flex-col bg-white/20 dark:bg-slate-900/20 md:h-full overflow-hidden relative">

          {/* Tabs */}
          <div className="flex-none px-6 pt-4 border-b border-slate-200/50 dark:border-slate-800/50 flex space-x-6">
            {['generate', 'saved', 'history'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab as any)}
                className={`pb-3 text-xs font-semibold uppercase tracking-widest transition-all ${activeTab === tab
                  ? 'text-indigo-600 dark:text-indigo-400 border-b-2 border-indigo-600 dark:border-indigo-400'
                  : 'text-slate-400 dark:text-slate-600 hover:text-slate-600 dark:hover:text-slate-400'
                  }`}
              >
                {tab === 'generate' ? 'Canvas' : tab}
              </button>
            ))}
          </div>

          {/* Tab Content Area - Scrollable */}
          <div className="flex-1 overflow-y-auto p-6 custom-scrollbar relative">
            {activeTab === 'generate' && (
              <div className="min-h-full flex flex-col justify-center py-6">
                {error && (
                  <div className="w-full max-w-md mx-auto p-4 mb-6 text-sm text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-900/20 border border-rose-100 dark:border-rose-900/30 rounded-xl animate-fade-in text-center">
                    {error}
                  </div>
                )}

                {loading && !currentPoemRecord && (
                  <div className="flex flex-col items-center justify-center h-full animate-fade-in">
                    <div className="w-10 h-10 border-2 border-indigo-200 dark:border-indigo-900 border-t-indigo-600 dark:border-t-indigo-400 rounded-full animate-spin mb-6"></div>
                    <p className="text-lg font-serif italic text-slate-500 dark:text-slate-400 animate-pulse tracking-wide">
                      {loadingMessage}
                    </p>
                  </div>
                )}

                {!loading && !currentPoemRecord && !error && (
                  <div className="flex flex-col items-center justify-center text-slate-300 dark:text-slate-700 h-full">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={0.8} stroke="currentColor" className="w-16 h-16 mb-4 opacity-50">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                    </svg>
                    <p className="text-sm font-medium tracking-wide">Awaiting your inspiration</p>
                  </div>
                )}

                {currentPoemRecord && !loading && (
                  <PoemCard
                    content={currentPoemRecord.text}
                    isSaved={isCurrentSaved}
                    onSave={() => toggleSavePoem(currentPoemRecord)}
                  />
                )}
              </div>
            )}

            {activeTab === 'saved' && (
              <PoemList
                poems={savedPoems}
                type="saved"
                onSelect={handleSelectPoem}
                onDelete={deleteSavedPoem}
              />
            )}

            {activeTab === 'history' && (
              <PoemList
                poems={history}
                type="history"
                onSelect={handleSelectPoem}
              />
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;