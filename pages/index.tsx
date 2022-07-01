import type { NextPage } from 'next';
import DeckPreview from '../components/DeckPreview';
import Layout from '../components/Layout';
import { getAllDecks } from '../data/database';

const Home: NextPage = () => {
  return (
    <Layout>
      <div className="grid grid-flow-col auto-cols-max">
        {getAllDecks().map(deck => (
          <div className="mx-2" key={deck.id}>
            <DeckPreview deck={deck} />
          </div>
        ))}
      </div>
    </Layout>
  );
};

export default Home;
