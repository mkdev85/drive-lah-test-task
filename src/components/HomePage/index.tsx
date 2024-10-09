import { ReactNode, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { AppDispatch, RootState } from '../../redux';
import { getCarListingProgressStatusStart } from '../../redux/slices/carListingProgressStatus';
import { routeConfig } from '../../routes';
import { ProgressStepName } from '../../services/carListingProgressStatus/types';
import CustomSelectField from '../../ui-kit/CustomSelectField/CustomSelectField';
import Loader from '../Loader';
import Sidenavbar from '../Sidenavbar';

import './Home.scss';

export default function HomePage(props: { children: ReactNode }) {
  const navigate = useNavigate();

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

  const navigationOptions = useMemo(
    () => progressStatusListWithRoutes?.map(route => route.name),
    [progressStatusListWithRoutes],
  );

  const handleChange = (newSelected: string[]) => {
    const selectedRoute = progressStatusListWithRoutes?.find(
      route => route.name === newSelected?.[0],
    );
    if (selectedRoute && selectedRoute.path) {
      navigate(selectedRoute.path);
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="home-page-wrapper">
      <Sidenavbar progressStatusListWithRoutes={progressStatusListWithRoutes || []} />
      <CustomSelectField
        id="custom-select"
        options={navigationOptions || []}
        isMultiple={false}
        selectedOptions={[
          routeConfig.find(route => route.path === location.pathname)?.name ||
            ProgressStepName.Subscription,
        ]}
        onChange={handleChange}
      />
      <div className="content-container">{props.children}</div>
    </div>
  );
}
