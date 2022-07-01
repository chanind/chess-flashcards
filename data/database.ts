import Deck from '../models/Deck';
import keyBy from 'lodash.keyby';
import cardsFromPgnLines from './cardsFromPgnLines';

const decks: Deck[] = [
  {
    id: 1,
    title: 'Vienna Gambit',
    preview: {
      orientation: 'white',
      fen: 'rnbqkb1r/pppp1ppp/5n2/4p3/4PP2/2N5/PPPP2PP/R1BQKBNR b KQkq f3 0 3',
    },
    description: "Vienna Gambit lines from Levy Rosman's YouTube Tutorial",
    cards: cardsFromPgnLines(
      [
        `1. e4 e5 2. Nc3 Nf6 3. f4 exf4 4. e5 Ng8 5. Nf3 d6 6. d4 dxe5 7. Qe2 Bb4 8. Qxe5+ Qe7 9. Bxf4 *`,
      ],
      { orientation: 'white' },
    ),
  },
  {
    id: 2,
    title: 'Stafford Gambit',
    preview: {
      orientation: 'black',
      fen: 'r1bqkb1r/ppp2ppp/2p2n2/8/4P3/8/PPPP1PPP/RNBQKB1R w KQkq - 0 5',
    },
    description: 'Stafford Gambit lines from Eric Rosen on YouTube',
    cards: [],
  },
];

const decksById = keyBy(decks, 'id');

export const getDeckById = (id: number) => decksById[id];
export const getAllDecks = () => decks;
