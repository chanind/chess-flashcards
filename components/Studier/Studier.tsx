import { Chess } from 'chess.js';
import { FC, useEffect, useRef, useState } from 'react';
import { Chessboard } from 'react-chessboard';
import { Transition } from 'react-transition-group';
import { ENTERING, TransitionStatus } from 'react-transition-group/Transition';
import { CheckIcon, XIcon } from '@heroicons/react/solid';
import Deck from '../../models/Deck';
import Flashcard from '../../models/Flashcard';
import {
  getCurrentRound,
  getInitialStudyState,
  getRemainingCardIdentifiersInRound,
  getTotalCardsInCurrentRound,
  getTotalMistakes,
  intermediatePause,
  isStudyingComplete,
  recordStudyResult,
  studyAgain,
  studyMistakes,
  StudyState,
} from './studyState';
import StudyComplete from './StudyComplete';
import ProgressBar from './ProgressBar';
import Pill from '../Pill';
import StudyChessBoard from './StudyChessBoard';

export interface StudierProps {
  decks: Deck[];
  width: number;
}

interface CardsMap {
  [identifier: string]: {
    card: Flashcard;
    deck: Deck;
  };
}

const buildCardsMap = (decks: Deck[]): CardsMap => {
  const cardsMap: CardsMap = {};
  for (const deck of decks) {
    for (const card of deck.cards) {
      const identifier = `${deck.id}-${card.previousMoves.join('.')}-${
        card.correctMove
      }`;
      cardsMap[identifier] = { card, deck };
    }
  }
  return cardsMap;
};

const Studier: FC<StudierProps> = ({ decks, width }) => {
  // this gets rid of an error about transitionGroups
  // https://stackoverflow.com/questions/60903335/warning-finddomnode-is-deprecated-in-strictmode-finddomnode-was-passed-an-inst
  const nodeRef = useRef(null);
  const timer = useRef();
  const cardsMap = buildCardsMap(decks);
  useEffect(() => {
    clearTimeout(timer.current);
  }, []);
  const [studyState, setStudyState] = useState<StudyState>(
    getInitialStudyState(Object.keys(cardsMap)),
  );
  const roundNum = getCurrentRound(studyState);
  const totalCardsInRound = getTotalCardsInCurrentRound(studyState);
  const totalMistakes = getTotalMistakes(studyState);
  const remainingCardIdentifiersInRound =
    getRemainingCardIdentifiersInRound(studyState);

  const isComplete = isStudyingComplete(studyState);
  if (isComplete) {
    return (
      <div className="pt-6">
        <StudyComplete
          totalMistakes={totalMistakes}
          totalRounds={roundNum + 1}
          onStudyAgain={() => setStudyState(studyAgain(studyState))}
          onStudyMistakes={() => setStudyState(studyMistakes(studyState))}
        />
      </div>
    );
  }

  const { card, deck } = cardsMap[studyState.studyingCardIdentifier];
  const chess = new Chess();
  const setupMoves = card.previousMoves.slice(0, -1);
  const teaserMove = card.previousMoves[card.previousMoves.length - 1];
  for (const move of setupMoves) {
    chess.move(move);
  }
  const previewFen = chess.fen();
  if (teaserMove) chess.move(teaserMove);
  const startFen = chess.fen();
  const correctMove = chess
    .moves({ verbose: true })
    .find(move => move.san === card.correctMove)!;
  const orientation = chess.turn() === 'b' ? 'black' : 'white';
  chess.move(card.correctMove);
  const endFen = chess.fen();

  const getPosition = (state: TransitionStatus): string => {
    if (studyState.intermediateState?.isCorrect) {
      return endFen;
    }
    return state === ENTERING ? previewFen : startFen;
  };

  const cardNum = totalCardsInRound - remainingCardIdentifiersInRound.length;
  const isPausingOnMistake = studyState.intermediateState?.isCorrect === false;
  return (
    <div className="my-2" style={{ width: `${width}px` }}>
      <div>
        <ProgressBar
          percent={(100 * cardNum) / totalCardsInRound}
          label={`${cardNum} / ${totalCardsInRound}`}
          title={`Round ${roundNum + 1}`}
          totalWrong={totalMistakes}
        />
        <div className="relative">
          <Transition
            in
            timeout={200}
            appear
            exit={false}
            nodeRef={nodeRef}
            key={studyState.studyingCardIdentifier}
          >
            {state => (
              <div ref={nodeRef}>
                <StudyChessBoard
                  position={getPosition(state)}
                  orientation={orientation}
                  width={width}
                  customArrows={
                    isPausingOnMistake
                      ? [[correctMove.from, correctMove.to]]
                      : []
                  }
                  onMove={(source, target) => {
                    const isCorrect =
                      correctMove?.from === source && correctMove.to === target;
                    // delay showing the next card briefly to give feedback to the user
                    setStudyState(intermediatePause(studyState, isCorrect));
                    setTimeout(
                      () => {
                        setStudyState(recordStudyResult(studyState, isCorrect));
                      },
                      isCorrect ? 300 : 2000,
                    );
                    return isCorrect;
                  }}
                />
              </div>
            )}
          </Transition>
          {studyState.intermediateState && (
            <div
              className="absolute left-0 top-0 flex z-10 justify-center items-center"
              style={{ width: `${width}px`, height: `${width}px` }}
            >
              {studyState.intermediateState?.isCorrect ? (
                <CheckIcon className="h-40 w-40 text-green-500 drop-shadow-lg" />
              ) : (
                <XIcon className="h-40 w-40 text-red-500 drop-shadow-lg" />
              )}
            </div>
          )}
        </div>
        <div className="mt-2 flex justify-between">
          <h2 className="text-xl">
            {deck.title}{' '}
            <span className="text-gray-400">
              Move {card.previousMoves.length + 1}
            </span>
          </h2>
          <div className="text-xs font-semibold">
            <span className="hidden sm:inline">Move as</span>{' '}
            <Pill color={orientation}>{orientation}</Pill>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Studier;
