import type { NextPage } from 'next';
import DeckPreview from '../components/DeckPreview';
import Layout from '../components/Layout';
import { getAllDecks } from '../data/database';

const Home: NextPage = () => {
  return (
    <Layout>
      <div className="flex flex-wrap">
        {getAllDecks().map(deck => (
          <div className="mx-2 mb-4" key={deck.id}>
            <DeckPreview deck={deck} />
          </div>
        ))}
      </div>
    </Layout>
  );
};

export default Home;
