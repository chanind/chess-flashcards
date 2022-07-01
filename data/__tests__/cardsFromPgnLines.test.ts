import cardsFromPgnLines from '../cardsFromPgnLines';

describe('cardsFromPgnLines', () => {
  it('turns PGN lines into flashcards', () => {
    const lines = [
      `1. e4 e5 2. Nc3 Nf6 3. f4 exf4 4. e5 Ng8 5. Nf3 d6 6. d4 dxe5 7. Qe2 Bb4 8. Qxe5+ Qe7 9. Bxf4 *`,
    ];
    const cards = cardsFromPgnLines(lines, { orientation: 'white' });
    expect(cards).toHaveLength(9);
    expect(cards).toMatchSnapshot();
  });

  it('dedupes identical cards from multiple lines', () => {
    const lines = [`1. e4 e5 2. Nc3 Nf6`, `1. e4 e5 2. Nf3 Nf6`];
    const cards = cardsFromPgnLines(lines, { orientation: 'white' });
    expect(cards).toHaveLength(3);
  });
});
