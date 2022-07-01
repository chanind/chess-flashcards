import Flashcard from '../models/Flashcard';
import { Orientation } from './types';
import { Chess } from 'chess.js';

interface CardsFromPgnLinesOptions {
  orientation?: Orientation;
}

class PGNParseError extends Error {}

const hashCard = (card: Flashcard): string => JSON.stringify(card);

/**
 * Helper to turn a list of PGN strings into cards for openings
 * @param pgnLines array of PGN strings
 * @param options object containing optional `orientation`, default 'white'
 * @returns array of Flashcard objects
 */
const cardsFromPgnLines = (
  pgnLines: string[],
  options: CardsFromPgnLinesOptions = {},
): Flashcard[] => {
  const seenCards: Set<string> = new Set();
  const orientation: Orientation = options.orientation ?? 'white';
  const cards: Flashcard[] = [];
  for (const line of pgnLines) {
    const chess = new Chess();
    if (!chess.load_pgn(line)) {
      throw new PGNParseError(`Unable to parse PGN lines: ${line}`);
    }
    const gameReplay = new Chess();
    const previousMoves: string[] = [];
    for (const move of chess.history()) {
      const isPlayerMove = gameReplay.turn() === orientation[0];
      if (isPlayerMove) {
        const card: Flashcard = {
          previousMoves: [...previousMoves],
          correctMove: move,
        };
        const cardHash = hashCard(card);
        // make sure the card hasn't already been added from another line
        if (!seenCards.has(cardHash)) cards.push(card);
        seenCards.add(cardHash);
      }
      previousMoves.push(move);
      gameReplay.move(move);
    }
  }

  return cards;
};

export default cardsFromPgnLines;
