import { Navigate, useParams } from 'react-router-dom';
import { AppRoutes } from '../../constants';
type CitiesWrapperProps = {
    cities: string[];
    children?: React.ReactNode;
}
export const CitiesWrapper = ({ cities, children }: CitiesWrapperProps) => {
  const { city } = useParams();

  const isValid = city && cities.includes(city);

  return isValid ? children : <Navigate to={AppRoutes.NotFound} />;
};
