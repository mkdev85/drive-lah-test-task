import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useLocation } from 'react-router-dom';

import CheckCircleSolidIcon from '../../assets/icons/Check-Circle-Solid';
import { AppDispatch, RootState } from '../../redux';
import { getCarListingProgressStatusStart } from '../../redux/slices/carListingProgressStatus';
import { routeConfig } from '../../routes';
import Loader from '../Loader';

import './Sidenavbar.scss';

export default function Sidenavbar() {
  console.log('sidebar rerenders');

  const location = useLocation();

  const dispatch = useDispatch<AppDispatch>();
  const { isLoading, carListingProgressStatusList } = useSelector(
    (state: RootState) => state.carListingProgressStatus,
  );

  useEffect(() => {
    dispatch(getCarListingProgressStatusStart());
  }, [dispatch]);

  const progressStatusListWithRoutes = useMemo(() => {
    if (carListingProgressStatusList) {
      return carListingProgressStatusList.map(progressStep => {
        const route = routeConfig.find(route => progressStep.name === route.name);
        return {
          ...progressStep,
          path: route?.path || '',
        };
      });
    }
  }, [carListingProgressStatusList]);

  const validPaths = routeConfig.map(route => route.path);

  const isValidRoute = validPaths.some(path => location.pathname === path);

  if (!isValidRoute) {
    return null;
  }

  if (isLoading) {
    return <Loader />;
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
}
