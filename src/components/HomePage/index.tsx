import { ReactNode } from 'react';

import Sidenavbar from '../Sidenavbar';

import './Home.scss';

export default function HomePage(props: { children: ReactNode }) {
  return (
    <div className="home-page-wrapper">
      <Sidenavbar />
      <div className="content-container">{props.children}</div>
    </div>
  );
}
