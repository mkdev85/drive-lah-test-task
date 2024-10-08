import { ReactNode } from 'react';
import './MainLayout.scss';
import Header from '../Header';
import HomePage from '../HomePage';
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
