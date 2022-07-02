import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import useDimensions from 'react-cool-dimensions';
import { ExternalLinkIcon } from '@heroicons/react/outline';
import Layout from '../../../components/Layout';
import NonSSRWrapper from '../../../components/NonSSRWrapper';
import Studier from '../../../components/Studier/Studier';
import { getAllDecks, getDeckById } from '../../../data/database';
import Deck from '../../../models/Deck';

export const getStaticPaths: GetStaticPaths = () => {
  const decks = getAllDecks();
  return {
    paths: decks.map(deck => ({
      params: { id: `${deck.id}` },
    })),
    fallback: false,
  };
};

interface StudyDeckProps {
  deck: Deck;
}

export const getStaticProps: GetStaticProps<StudyDeckProps> = context => {
  if (!context.params?.id || Array.isArray(context.params.id)) {
    return { notFound: true };
  }
  const id = parseInt(context.params.id);

  const deck = getDeckById(id);
  if (!deck) return { notFound: true };
  return { props: { deck } };
};

const StudyDeck: NextPage<StudyDeckProps> = ({ deck }) => {
  const { observe, width } = useDimensions();
  return (
    <Layout>
      <h1 className="text-xl">
        <span className="text-gray-400">Study</span> {deck.title}
      </h1>
      <div style={{ maxWidth: '500px' }} ref={observe}>
        <p className="text-gray-600 mt-1 mb-2 text-sm">
          {deck.description}
          <span className="ml-1">
            {deck.sources.map((source, i) => (
              <a
                href={source.url}
                className="text-blue-600 text-xs ml-1"
                key={i}
                target="_blank"
              >
                {i + 1}
                <ExternalLinkIcon className="inline h-3 w-3 relative bottom-[2px]" />
              </a>
            ))}
          </span>
        </p>
        <div>
          <NonSSRWrapper>
            <Studier decks={[deck]} width={width} />
          </NonSSRWrapper>
        </div>
      </div>
    </Layout>
  );
};

export default StudyDeck;
