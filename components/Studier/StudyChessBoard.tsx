import { Chess, Move, Square } from 'chess.js';
import { FC, useRef, useState } from 'react';
import { Chessboard, ChessBoardProps } from 'react-chessboard';
import { Orientation } from '../../data/types';

export interface StudyChessBoardProps {
  position: string;
  width: number;
  onMove: (from: string, to: string) => void;
  customArrows?: ChessBoardProps['customArrows'];
  orientation: Orientation;
}

const StudyChessBoard: FC<StudyChessBoardProps> = ({
  position,
  width,
  orientation,
  customArrows,
  onMove,
}) => {
  const [moveFrom, setMoveFrom] = useState<Square | null>(null);
  const game = new Chess(position);

  const highlightSquares: { [key: string]: { [prop: string]: string } } = {};
  let validMoves: Move[] = [];

  const moveIfValid = (from: Square, to: Square): boolean => {
    const isValid = !!game
      .moves({ square: from, verbose: true })
      .find(move => move.to === to);
    if (isValid) {
      onMove(from, to);
    }
    return isValid;
  };

  if (moveFrom) {
    validMoves = game.moves({
      square: moveFrom,
      verbose: true,
    });
    validMoves.map(move => {
      const moveToPiece = game.get(move.to);
      highlightSquares[move.to] = {
        background:
          moveToPiece && moveToPiece.color !== game.get(moveFrom)?.color
            ? 'radial-gradient(circle, rgba(0,0,0,.1) 85%, transparent 85%)'
            : 'radial-gradient(circle, rgba(0,0,0,.1) 25%, transparent 25%)',
        borderRadius: '50%',
      };
      return move;
    });
    highlightSquares[moveFrom] = {
      background: 'rgba(37, 99, 235, 0.4)',
    };
  }

  const onSquareClick = (square: Square) => {
    // from square
    if (!moveFrom) {
      const pieceOnSquare = game.get(square);
      if (pieceOnSquare && pieceOnSquare.color === orientation[0]) {
        setMoveFrom(square);
      }
      return;
    }

    if (square !== moveFrom) {
      moveIfValid(moveFrom, square);
    }
    setMoveFrom(null);
  };

  return (
    <Chessboard
      boardOrientation={orientation}
      animationDuration={200}
      arePiecesDraggable={true}
      areArrowsAllowed={false}
      boardWidth={width}
      position={position}
      customArrows={customArrows}
      isDraggablePiece={({ piece }) => piece[0] === orientation[0]}
      onSquareClick={onSquareClick}
      onPieceDrop={moveIfValid}
      customSquareStyles={{
        ...highlightSquares,
      }}
    />
  );
};

export default StudyChessBoard;
