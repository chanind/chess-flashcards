import { Orientation } from '../data/types';
import Flashcard from './Flashcard';

interface Deck {
  id: number;
  title: string;
  preview: {
    orientation: Orientation;
    fen: string;
  };
  description: string;
  cards: Flashcard[];
  sources: {
    name: string;
    url: string;
  }[];
}

export default Deck;
