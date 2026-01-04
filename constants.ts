import { SuggestionCategory } from './types';

export const SUGGESTIONS_DATA: SuggestionCategory[] = [
  {
    id: 'theme',
    label: 'Theme',
    placeholder: 'e.g., The ocean at night...',
    suggestions: [
      'Autumn Rain', 'Lost Love', 'A Coffee Shop', 'Starry Night', 'Hope',
      'Nature', 'Technology', 'Love', 'Mystery', 'Fantasy',
      'Urban Life', 'The Cosmos', 'Time Travel', 'Friendship', 'Solitude'
    ],
  },
  {
    id: 'tone',
    label: 'Tone',
    placeholder: 'e.g., Melancholy...',
    suggestions: [
      'Whimsical', 'Melancholic', 'Optimistic', 'Mysterious', 'Romantic',
      'Happy', 'Sad', 'Humorous', 'Formal', 'Dark',
      'Nostalgic', 'Hopeful', 'Sarcastic', 'Serene', 'Dramatic'
    ],
  },
  {
    id: 'style',
    label: 'Style',
    placeholder: 'e.g., Haiku...',
    suggestions: [
      'Haiku', 'Free Verse', 'Sonnet', 'Limerick', 'Acrostic',
      'Ballad', 'Ode', 'Elegy', 'Narrative', 'Villanelle',
      'Couplet', 'Epigram', 'Tanka', 'Blank Verse', 'Lyric'
    ],
  },
  {
    id: 'length',
    label: 'Length',
    placeholder: 'e.g., Short...',
    suggestions: ['Short (4 lines)', 'Medium (8 lines)', 'Brief', 'Haiku length', 'Single Stanza'],
  },
];

export const DEFAULT_CONFIG = {
  theme: 'Nature',
  tone: 'Peaceful',
  style: 'Free Verse',
  length: 'Short',
};
