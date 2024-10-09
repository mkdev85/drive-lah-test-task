import { ReactNode } from 'react';

import BottomButtonBar from '../BottomButtonBar';
import Sidenavbar from '../Sidenavbar';

import './Home.scss';

export default function HomePage(props: { children: ReactNode }) {
  return (
    <div className="home-page-wrapper">
      <div className="main-content">
        <Sidenavbar />
        {props.children}
      </div>
      <BottomButtonBar />
    </div>
  );
}
