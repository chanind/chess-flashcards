import type { NextPage } from 'next';
import Layout from '../components/Layout';

const About: NextPage = () => {
  return (
    <Layout>
      <h1 className="text-xl">About</h1>
      <div className="mt-4">
        <p className="mt-4 text-base leading-relaxed text-gray-800">
          This is a free and open-source prototype of a flashcards system for
          Chess. I find that I'll often watch a YouTube video about a new cool
          opening or concept, but then immediately forget everything I learned
          in the video when I try to play. This is an attempt to address that by
          turning openings and concepts into studyable flashcards.
        </p>
        <p className="mt-4 text-base leading-relaxed text-gray-800">
          I'll add more openings and content on here as I learn them. If there's
          an opening or content you'd like to add, feel free to open a pull
          request on Github to create a new deck! If this becomes popular it
          might make sense to turn this into a database-backed web application
          where anyone can upload their own chess flashcard decks.
        </p>
        <p className="mt-4 text-base leading-relaxed text-gray-800">
          If you have any ideas for improvements, find any bugs, or have any
          other comments, feel free to open a{' '}
          <a
            href="https://github.com/chanind/chess-flashcards/issues"
            className="text-blue-600 hover:underline"
          >
            Github issue
          </a>
          .
        </p>
      </div>
    </Layout>
  );
};

export default About;
