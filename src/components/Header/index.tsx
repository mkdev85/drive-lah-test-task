import './HeaderStyle.scss';
import { NavLink } from 'react-router-dom';

export default function Header() {
  return (
    <header className="header-section">
      <div className="header-wrap">
        <NavLink to="/" className="brand-logo">
          <img src="/assets/images/brand-logo/brand-logo.png" alt="Brand Logo" />
        </NavLink>

        <div className="nav-link-box">
          <NavLink to="/learn-more" className="nav-link-item">
            Learn more
          </NavLink>
          <NavLink to="/list-your-car" className="nav-link-item">
            List your car
          </NavLink>
          <NavLink to="/inbox" className="nav-link-item">
            Inbox
          </NavLink>
          <NavLink to="/profile" className="profile-btn">
            <img src="/assets/images/stock-images/avatar.png" alt="Profile Img" />
          </NavLink>
        </div>
      </div>
    </header>
  );
}
