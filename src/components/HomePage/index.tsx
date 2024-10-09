import { ReactNode, useMemo } from 'react';
import Sidenavbar from '../Sidenavbar';
import './Home.scss';
import CustomSelectField from '../../ui-kit/CustomSelectField/CustomSelectField';
import { routeConfig } from '../../routes';
import { useNavigate } from 'react-router-dom';
import { ProgressStepName } from '../../services/carListingProgressStatus/types';

export default function HomePage(props: { children: ReactNode }) {
  const navigate = useNavigate();

  const navigationOptions = useMemo(() => routeConfig.map(route => route.name), []);

  const handleChange = (newSelected: string[]) => {
    const selectedRoute = routeConfig.find(route => route.name === newSelected?.[0]);
    if (selectedRoute && selectedRoute.path) {
      navigate(selectedRoute.path);
    }
  };

  return (
    <div className="home-page-wrapper">
      <Sidenavbar />
      <CustomSelectField
        id="custom-select"
        options={navigationOptions}
        isMultiple={false}
        selectedOptions={[routeConfig.find(route => route.path === location.pathname)?.name || ProgressStepName.Subscription]}
        onChange={handleChange}
      />
      <div className="content-container">{props.children}</div>
    </div>
  );
}
