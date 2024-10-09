import { NavLink } from 'react-router-dom';

import './HeaderStyle.scss';
import { useState } from 'react';
import ArrowLeftIcon from '../../assets/icons/Arrow-Left';
import MenuBarsIcon from '../../assets/icons/Menu-Bars';

export default function Header() {
  const [isActive, setIsActive] = useState(false);

  const handleClick = () => {
    setIsActive(!isActive);
  };

  return (
    <header className="header-section">
      <div className="header-wrap">
        <button className="header-menu-btn" onClick={handleClick}>
          {isActive ? <ArrowLeftIcon /> : <MenuBarsIcon />}
        </button>

        <NavLink to="/" className="brand-logo">
          <img src="/assets/images/brand-logo/brand-logo.png" alt="Brand Logo" />
        </NavLink>

        <div className="nav-link-box">
          <div className={`nav-link-collapse ${isActive ? 'nav-link-collapse-active' : ''}`}>
            <NavLink to="/learn-more" className="nav-link-item">
              Learn more
            </NavLink>
            <NavLink to="/list-your-car" className="nav-link-item">
              List your car
            </NavLink>
            <NavLink to="/inbox" className="nav-link-item">
              Inbox
            </NavLink>
          </div>
          <NavLink to="/profile" className="profile-btn">
            <img src="/assets/images/stock-images/avatar.png" alt="Profile Img" />
          </NavLink>
        </div>
      </div>
    </header>
  );
}
