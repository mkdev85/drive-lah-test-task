import { ReactNode } from 'react';

import Header from '../Header';
import HomePage from '../HomePage';

import './MainLayout.scss';

type Props = {
  children: ReactNode;
};

const MainLayout = (props: Props) => {
  return (
    <main className="main-layout">
      <Header />
      <HomePage>{props.children}</HomePage>
    </main>
  );
};

export default MainLayout;
