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
    placeholder: 'e.g., Reflective...',
    suggestions: [
      'Reflective', 'Tender', 'Joyful', 'Romantic', 'Serene',
      'Melancholic', 'Longing', 'Intimate', 'Dramatic', 'Reverent',
      'Playful', 'Whimsical', 'Humorous', 'Satirical', 'Ironic',
      'Somber', 'Tragic', 'Haunting'
    ],
  },
  {
    id: 'style',
    label: 'Style',
    placeholder: 'e.g., Free Verse...',
    suggestions: [
      'Free Verse', 'Haiku', 'Sonnet', 'Ode', 'Narrative Poem', 'Elegy',
      'Villanelle', 'Ballad', 'Limerick', 'Prose Poem', 'Ekphrastic',
      'Lyric', 'Experimental'
    ],
  },
  {
    id: 'length',
    label: 'Length',
    placeholder: 'e.g., Short (4 lines)...',
    suggestions: [
      'One Line',
      'Haiku (3 lines)',
      'Short (4 lines)',
      'Brief (5–6 lines)',
      'Medium (8 lines)',
      'Sonnet (14 lines)',
      'Extended (16–20 lines)'
    ],
  },
];

export const DEFAULT_CONFIG = {
  theme: 'Nature',
  tone: 'Reflective',
  style: 'Free Verse',
  length: 'Short (4 lines)',
};