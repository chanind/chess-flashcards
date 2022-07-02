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
  onMove,
}) => {
  const [moveFrom, setMoveFrom] = useState<Square | null>(null);
  const game = new Chess(position);

  const highlightSquares: { [key: string]: { [prop: string]: string } } = {};
  let validMoves: Move[] = [];

  if (moveFrom) {
    validMoves = game.moves({
      square: moveFrom,
      verbose: true,
    });
    validMoves.map(move => {
      highlightSquares[move.to] = {
        background:
          'radial-gradient(circle, rgba(0,0,0,.1) 85%, transparent 85%)',
        borderRadius: '50%',
      };
      return move;
    });
    highlightSquares[moveFrom] = {
      boxShadow: 'inset 0px 0px 5px rgba(0, 0, 0, 0.3)',
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
      onMove(moveFrom, square);
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
      isDraggablePiece={({ piece }) => piece[0] === orientation[0]}
      onSquareClick={onSquareClick}
      onPieceDrop={(from, to) => {
        onMove(from, to);
        return true;
      }}
      customSquareStyles={{
        ...highlightSquares,
      }}
    />
  );
};

export default StudyChessBoard;
