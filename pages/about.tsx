import type { NextPage } from 'next';
import Layout from '../components/Layout';

const About: NextPage = () => {
  return (
    <Layout>
      <h1 className="text-xl">About</h1>
      <div className="mt-4">
        <p>Practice chess lines to improve your play!</p>
      </div>
    </Layout>
  );
};

export default About;
