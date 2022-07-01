import { DeepReadonly } from 'ts-essentials';
import sample from 'lodash.sample';

// TODO: should this use a real state management solution like Redux?

export type StudyState = DeepReadonly<{
  cardHistories: {
    [cardIdentifier: string]: {
      history: boolean[]; // history of if the user has gotten this card right/wrong
    };
  };
  studyingCardIdentifier: string;
  intermediateState?: {
    isCorrect: boolean;
  };
}>;

export const getInitialStudyState = (
  allCardIdentifiers: string[],
): StudyState => {
  const cardHistories: {
    [cardIdentifier: string]: {
      history: boolean[];
    };
  } = {};
  for (const identifier of allCardIdentifiers) {
    cardHistories[identifier] = { history: [] };
  }

  return {
    cardHistories,
    studyingCardIdentifier: sample(allCardIdentifiers)!,
  };
};

// --- action reducers ---

export const intermediatePause = (
  state: StudyState,
  isCorrect: boolean,
): StudyState => ({
  ...state,
  intermediateState: { isCorrect },
});

export const recordStudyResult = (
  state: StudyState,
  isCorrect: boolean,
): StudyState => {
  const remainingIdentifiers = getRemainingCardIdentifiers(state).filter(
    identifier => !isCorrect || identifier !== state.studyingCardIdentifier,
  );
  const remainingIdentifiersInRound = getRemainingCardIdentifiersInRound(
    state,
  ).filter(identifier => identifier !== state.studyingCardIdentifier);

  return {
    // pick the next card to study, or just leave it as-is if we're done
    studyingCardIdentifier:
      sample(remainingIdentifiersInRound) ??
      sample(remainingIdentifiers) ??
      state.studyingCardIdentifier,
    cardHistories: {
      ...state.cardHistories,
      [state.studyingCardIdentifier]: {
        history: [
          ...state.cardHistories[state.studyingCardIdentifier].history,
          isCorrect,
        ],
      },
    },
  };
};

export const studyAgain = (state: StudyState): StudyState =>
  getInitialStudyState(Object.keys(state.cardHistories));

// --- selectors ---

export const getCurrentRound = (state: StudyState): number => {
  const allCardIdentifiers = Object.keys(state.cardHistories);
  const remainingIdentifiers = getRemainingCardIdentifiers(state);

  const identifiersToConsider =
    remainingIdentifiers.length > 0 ? remainingIdentifiers : allCardIdentifiers;

  const historyLengths = identifiersToConsider.map(
    identifier => (state.cardHistories[identifier]?.history ?? []).length,
  );
  if (remainingIdentifiers.length === 0) return Math.max(...historyLengths) - 1;
  return Math.min(...historyLengths);
};

export const isCardRemaining = (
  state: StudyState,
  cardIdentifier: string,
): boolean => {
  const cardHistory = state.cardHistories[cardIdentifier].history;
  return !cardHistory.includes(true);
};

const getHistoryForCard = (
  state: StudyState,
  cardIdentifier: string,
): readonly boolean[] => state.cardHistories[cardIdentifier].history;

export const isStudyingComplete = (state: StudyState): boolean =>
  getRemainingCardIdentifiers(state).length === 0;

export const getRemainingCardIdentifiers = (state: StudyState): string[] =>
  Object.keys(state.cardHistories).filter(identifier =>
    isCardRemaining(state, identifier),
  );

export const getTotalCardsInCurrentRound = (state: StudyState): number => {
  const roundNum = getCurrentRound(state);
  return Object.keys(state.cardHistories).filter(identifier => {
    const history = getHistoryForCard(state, identifier);
    return !history.slice(0, roundNum).includes(true);
  }).length;
};

// get a list of all identifiers that haven't been answered correctly yet in the current round
export const getRemainingCardIdentifiersInRound = (
  state: StudyState,
): string[] => {
  const remainingIdentifiers = getRemainingCardIdentifiers(state);
  const roundNum = getCurrentRound(state);
  const remainingIdentifiersInRound: string[] = [];
  for (const identifier of remainingIdentifiers) {
    if (getHistoryForCard(state, identifier).length === roundNum) {
      remainingIdentifiersInRound.push(identifier);
    }
  }
  return remainingIdentifiersInRound;
};

export const getTotalMistakes = (state: StudyState): number =>
  Object.values(state.cardHistories)
    .map(({ history }) => history.filter(res => res === false).length)
    .reduce((acc, numErrors) => acc + numErrors, 0);
