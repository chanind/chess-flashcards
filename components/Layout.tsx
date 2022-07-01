import Head from 'next/head';
import { FC, ReactNode } from 'react';
import HeaderNav from '../components/HeaderNav';

interface LayoutProps {
  children: ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <div>
      <Head>
        <title>Chess Flashcards</title>
        <meta
          name="description"
          content="Chess Flashcards - practice chess openings"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <HeaderNav />
      <main className="container mt-4 mx-auto">{children}</main>
    </div>
  );
};

export default Layout;
