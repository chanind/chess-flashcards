import {
  GetStaticPaths,
  GetStaticProps,
  InferGetStaticPropsType,
  NextPage,
} from 'next';
import Layout from '../../../components/Layout';
import NonSSRWrapper from '../../../components/NonSSRWrapper';
import Studier from '../../../components/Studier/Studier';
import { getAllDecks, getDeckById } from '../../../data/database';

export const getStaticPaths: GetStaticPaths = () => {
  const decks = getAllDecks();
  return {
    paths: decks.map(deck => ({
      params: { id: `${deck.id}` },
    })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = context => {
  if (!context.params?.id || Array.isArray(context.params.id)) {
    return { notFound: true };
  }
  const id = parseInt(context.params.id);

  const deck = getDeckById(id);
  if (!deck) return { notFound: true };
  return { props: { deck } };
};

const StudyDeck: NextPage = ({
  deck,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <Layout>
      <h1 className="text-xl">
        <span className="text-gray-400">Study</span> {deck.title}
      </h1>
      <div>
        <NonSSRWrapper>
          <Studier decks={[deck]} />
        </NonSSRWrapper>
      </div>
    </Layout>
  );
};

export default StudyDeck;
