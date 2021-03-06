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
    description: "Vienna Gambit lines from Levy Rozman's YouTube Tutorial",
    cards: cardsFromPgnLines(
      [
        `1. e4 e5 2. Nc3 Nf6 3. f4 exf4 4. e5 Ng8 5. Nf3 d6 6. d4 dxe5 7. Qe2 Bb4 8. Qxe5+ Qe7 9. Bxf4 *`,
        `1. e4 e5 2. Nc3 Nf6 3. f4 Nc6 4. fxe5 Nxe5 5. d4 Ng6 6. e5 Ng8 7. Nf3 d6 8. Bc4 dxe5 9. O-O exd4 (9... exd4 10. Ng5 {+5.33} 10... dxc3 11. Bxf7+ {+M5}) *`,
        `1. e4 e5 2. Nc3 Nf6 3. f4 d6 4. Nf3 Nc6 5. Bb5 Bd7 6. d3 *`,
        `1. e4 e5 2. Nc3 Nf6 3. f4 d5 4. fxe5 Nxe4 5. Qf3 Nxc3 6. bxc3 *`,
        `1. e4 e5 2. Nc3 Nf6 3. f4 d5 4. fxe5 Nxe4 5. Qf3 Nxc3 6. bxc3 c5 7. Qg3 *`,
        `1. e4 e5 2. Nc3 Nf6 3. f4 d5 4. fxe5 Nxe4 5. Qf3 Nc6 6. Bb5 Nxc3 7. dxc3 Qh4+ 8. g3 Qe4+ 9. Be3 Qxc2 10. Ne2 Qxb2 11. O-O Qxb5 12. Qxf7+ Kd8 13. Nd4 Nxd4 14. Bg5+ Be7 15. Qxe7# 1-0`,
        `1. e4 e5 2. Nc3 Nf6 3. f4 d5 4. fxe5 Nxe4 5. Qf3 f5 6. d3 Nxc3 7. bxc3 d4 8. Qg3 dxc3 9. Be2 a6 10. Bh5+ g6 11. Bxg6+ hxg6 12. Qxg6+ Kd7 13. e6+ *`,
        `1. e4 e5 2. Nc3 Nc6 3. Bc4 Bc5 4. Qg4 Qf6 5. Nd5 Qxf2+ 6. Kd1 g6 7. Nh3 Qd4 8. d3 *`,
        `1. e4 e5 2. Nc3 Nc6 3. Bc4 Bc5 4. Qg4 g6 5. Qf3 Nf6 6. Nge2 *`,
        `1. e4 e5 2. Nc3 Nc6 3. Bc4 Bc5 4. Qg4 Kf8 5. Qf3 *`,
        `1. e4 e5 2. Nc3 Nc6 3. Bc4 Nf6 4. d3 Bc5 5. f4 d6 6. Nf3 Ng4 7. Ng5 Nf2 8. Qh5 g6 9. Bxf7+ Kd7 10. Be6+ Ke8 11. Qh6 *`,
        `1. e4 e5 2. Nc3 Nc6 3. Bc4 Nf6 4. d3 Bc5 5. f4 Ng4 (5... d6 6. Nf3 Ng4 7. Ng5 O-O 8. f5 Nf2 9. Qh5) *`,
        `1. e4 e5 2. Nc3 Nc6 3. Bc4 Nf6 4. d3 Bc5 5. f4 d6 6. Nf3 Bg4 7. Na4 Nd4 8. Nxc5 dxc5 9. c3 Nxf3+ 10. gxf3 *`,
      ],
      { orientation: 'white' },
    ),
    sources: [
      {
        name: 'WIN WITH 1. E4 | The Vienna Gambit | Levy Rozman',
        url: 'https://www.youtube.com/watch?v=JVxENCPcCjU',
      },
    ],
  },
  {
    id: 2,
    title: 'Stafford Gambit',
    preview: {
      orientation: 'black',
      fen: 'r1bqkb1r/ppp2ppp/2p2n2/8/4P3/8/PPPP1PPP/RNBQKB1R w KQkq - 0 5',
    },
    description: 'Stafford Gambit lines from Eric Rosen on YouTube',
    cards: cardsFromPgnLines(
      [
        `1. e4 e5 2. Nf3 Nf6 3. Nxe5 Nc6 4. Nxc6 dxc6 5. d3 Bc5 6. Bg5 Nxe4 7. Bxd8 Bxf2+ 8. Ke2 Bg4#`,
        `1. e4 e5 2. Nf3 Nf6 3. Nxe5 Nc6 4. Nxc6 dxc6 5. d3 Bc5 6. Bg5 Nxe4 7. dxe4 Bxf2+ 8. Kxf2 Qxd1`,
        `1. e4 e5 2. Nf3 Nf6 3. Nxe5 Nc6 4. Nxc6 dxc6 5. d3 Bc5 6. Bg5 Nxe4 7. Be3 Bxe3 8. fxe3 Qh4+ 9. g3 Nxg3`,
        `1. e4 e5 2. Nf3 Nf6 3. Nxe5 Nc6 4. Nxc6 dxc6 5. f3 Nh5 6. Nc3 Qh4+ 7. g3 Nxg3`,
        `1. e4 e5 2. Nf3 Nf6 3. Nxe5 Nc6 4. Nxc6 dxc6 5. d3 Bc5 6. Nc3 Ng4 7. Qf3 Nxf2`,
        `1. e4 e5 2. Nf3 Nf6 3. Nxe5 Nc6 4. Nxc6 dxc6 5. d3 Bc5 6. Nc3 Ng4 7. Be3 Nxe3 8. fxe3 Bxe3 9. Qf3 Qg5`,
        `1. e4 e5 2. Nf3 Nf6 3. Nxe5 Nc6 4. Nxc6 dxc6 5. Nc3 Bc5 6. Bc4 Ng4 7. O-O Qh4 8. h3 Nxf2 9. Qf3 Nxh3+ 10. Kh1 Nf2+ 11. Kg1 Qh1#`,
        `1. e4 e5 2. Nf3 Nf6 3. Nxe5 Nc6 4. Nxc6 dxc6 5. Nc3 Bc5 6. h3 h5 7. Be2 Qd4 8. O-O Ng4 9. hxg4 hxg4 10. d3 Qe5 11. g3 Qxg3#`,
        `1. e4 e5 2. Nf3 Nf6 3. Nxe5 Nc6 4. Nxc6 dxc6 5. e5 Ne4 6. d3 Bc5 7. dxe4 Bxf2+`,
        `1. e4 e5 2. Nf3 Nf6 3. Nxe5 Nc6 4. Nxc6 dxc6 5. e5 Ne4 6. d4 Qh4 7. g3 Nxg3 8. fxg3 Qe4+`,
      ],
      { orientation: 'black' },
    ),
    sources: [
      {
        name: 'A Beginner Lesson in the Stafford Gambit | Eric Rosen',
        url: 'https://www.youtube.com/watch?v=XkB4IVNaZWw',
      },
    ],
  },
];

const decksById = keyBy(decks, 'id');

export const getDeckById = (id: number) => decksById[id];
export const getAllDecks = () => decks;
