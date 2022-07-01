import {
  getCurrentRound,
  getInitialStudyState,
  getTotalCardsInCurrentRound,
} from '../studyState';

describe('getCurrentRound', () => {
  it('returns 0 if the state is empty', () => {
    expect(getCurrentRound(getInitialStudyState(['1']))).toBe(0);
  });

  it('returns final round number if all cards are answered correctly', () => {
    expect(
      getCurrentRound({
        studyingCardIdentifier: '1',
        cardHistories: {
          1: { history: [true] },
          2: { history: [false, true] },
        },
      }),
    ).toBe(1);
  });

  it('returns the in-progress round number if the round is in progress', () => {
    expect(
      getCurrentRound({
        studyingCardIdentifier: '1',
        cardHistories: {
          1: { history: [false, false] },
          2: { history: [false, false, true] },
        },
      }),
    ).toBe(2);
  });

  it('returns the next round if the current round is over and there are still items remaining', () => {
    expect(
      getCurrentRound({
        studyingCardIdentifier: '1',
        cardHistories: {
          1: { history: [false, false, false] },
          2: { history: [false, false, true] },
        },
      }),
    ).toBe(3);
  });
});

describe('getTotalCardsInCurrentRound', () => {
  it("returns the number of cards that are hadn't been answered correctly by the start of the current round", () => {
    expect(
      getTotalCardsInCurrentRound({
        studyingCardIdentifier: '1',
        cardHistories: {
          1: { history: [false, false, false] },
          2: { history: [false, false, true] },
        },
      }),
    ).toBe(1);

    expect(
      getTotalCardsInCurrentRound({
        studyingCardIdentifier: '1',
        cardHistories: {
          1: { history: [false, false] },
          2: { history: [false, false, true] },
        },
      }),
    ).toBe(2);
  });
});
