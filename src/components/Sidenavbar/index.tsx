import './Sidenavbar.scss';
import CheckCircleSolidIcon from '../../assets/icons/Check-Circle-Solid';
import { NavLink, useLocation } from 'react-router-dom';
import { routeConfig } from '../../routes';

export default function Sidenavbar() {
  const location = useLocation();
  const validPaths = routeConfig.map(route => route.path);

  const isValidRoute = validPaths.some(path => location.pathname === path);

  if (!isValidRoute) {
    return null;
  }
  return (
    <aside className="sidenavbar-section">
      <div className="sidenavbar-wrap">
        <ul className="sidenav-list-box">
          {routeConfig
            .filter(route => route.path.includes('/'))
            .map(route => (
              <li className="sidenav-list-item" key={route.name}>
                <NavLink
                  to={route.path}
                  className={({ isActive }) => `nav-item ${isActive ? 'active' : 'completed'}`}
                >
                  <span className="text">{route.name}</span>
                  <CheckCircleSolidIcon className="check-icon" />
                </NavLink>
              </li>
            ))}
        </ul>
      </div>
    </aside>
  );
}
