import { ReactNode } from 'react';
import './HomeStyle.scss';
import Sidenavbar from '../Sidenavbar';
import BottomButtonBar from '../BottomButtonBar';

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
