import { NavLink, useLocation } from 'react-router-dom';

import CheckCircleSolidIcon from '../../assets/icons/Check-Circle-Solid';
import { routeConfig } from '../../routes';
import { ProgressStatus, ProgressStepName } from '../../services/carListingProgressStatus/types';

import './Sidenavbar.scss';

interface progressStatusListItemWithRoutes {
  path: string;
  name: ProgressStepName;
  status: ProgressStatus;
}

interface SidenavbarProps {
  progressStatusListWithRoutes: progressStatusListItemWithRoutes[];
}

const Sidenavbar: React.FC<SidenavbarProps> = ({ progressStatusListWithRoutes }) => {
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
          {progressStatusListWithRoutes?.map(route => (
            <li className="sidenav-list-item" key={route.name}>
              <NavLink
                to={route.path}
                className={({ isActive }) =>
                  `nav-item ${isActive ? 'active' : ''} ${route.status === 'completed' ? 'completed' : ''}`
                }
              >
                <span className="text">{route.name}</span>
                {route.status === 'completed' && <CheckCircleSolidIcon className="check-icon" />}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
};

export default Sidenavbar;
