import Link from 'next/link';
import { Chessboard } from 'react-chessboard';
import { ArrowRightIcon } from '@heroicons/react/solid';
import Deck from '../models/Deck';

interface DeckPreviewProps {
  deck: Deck;
}

const DeckPreview = ({ deck }: DeckPreviewProps) => (
  <Link href={`/decks/${deck.id}/study`}>
    <article
      className="overflow-hidden rounded-lg shadow-lg cursor-pointer hover:shadow-xl transition-all"
      style={{ width: '200px' }}
    >
      <div className="relative">
        <Chessboard
          boardWidth={200}
          boardOrientation={deck.preview.orientation}
          areArrowsAllowed={false}
          arePiecesDraggable={false}
          arePremovesAllowed={false}
          position={deck.preview.fen}
        />
        <div className="absolute z-10 top-0 left-0 right-0 bottom-0" />
      </div>
      <div className="p-2">
        <header className="flex items-center justify-between leading-tight my-2">
          <h1 className="text-lg text-black">{deck.title}</h1>
        </header>
        <p className="text-sm text-gray-600">{deck.description}</p>
        <button
          type="button"
          className="text-white bg-blue-600 font-medium rounded-md text-sm px-5 py-2.5 text-center inline-flex items-center mt-4"
        >
          Study <ArrowRightIcon className="h-5 w-5 ml-2" />
        </button>
      </div>
    </article>
  </Link>
);

export default DeckPreview;
