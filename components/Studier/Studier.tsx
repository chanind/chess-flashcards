import { Chess } from 'chess.js';
import { FC, useEffect, useRef, useState } from 'react';
import { Chessboard } from 'react-chessboard';
import classNames from 'classnames';
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
  StudyState,
} from './studyState';
import StudyComplete from './StudyComplete';
import ProgressBar from './ProgressBar';

export interface StudierProps {
  decks: Deck[];
}

interface CardsMap {
  [identifier: string]: {
    card: Flashcard;
    deck: Deck;
  };
}

const BOARD_SIZE = 500;

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

const Studier: FC<StudierProps> = ({ decks }) => {
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
    .find(move => move.san === card.correctMove);
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
  return (
    <div className="my-2" style={{ width: `${BOARD_SIZE}px` }}>
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
                <Chessboard
                  position={getPosition(state)}
                  boardOrientation={orientation}
                  boardWidth={BOARD_SIZE}
                  arePiecesDraggable={true}
                  areArrowsAllowed={false}
                  isDraggablePiece={({ piece }) => piece[0] === orientation[0]}
                  onPieceDrop={(source, target) => {
                    const isCorrect =
                      correctMove?.from === source && correctMove.to === target;
                    // delay showing the next card briefly to give feedback to the user
                    setStudyState(intermediatePause(studyState, isCorrect));
                    setTimeout(
                      () => {
                        setStudyState(recordStudyResult(studyState, isCorrect));
                      },
                      isCorrect ? 300 : 1000,
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
              style={{ width: `${BOARD_SIZE}px`, height: `${BOARD_SIZE}px` }}
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
            Move as{' '}
            <span
              className={classNames(
                'text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full',
                {
                  'bg-gray-200': orientation === 'white',
                  'text-gray-800': orientation === 'white',
                  'bg-gray-800': orientation === 'black',
                  'text-gray-400': orientation === 'black',
                },
              )}
            >
              {orientation}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Studier;
