export interface PoemConfig {
  theme: string;
  tone: string;
  style: string;
  length: string;
}

export interface SuggestionCategory {
  id: keyof PoemConfig;
  label: string;
  placeholder: string;
  suggestions: string[];
}

export interface PoemRecord {
  id: string;
  text: string;
  date: string;
  config: PoemConfig;
  feedback?: 'good' | 'bad' | null;
}
