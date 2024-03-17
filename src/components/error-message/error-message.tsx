
import { useAppSelector } from '../../hooks/use-app';
import { globalSelectors} from '../../slices/global';

function ErrorMessage(): JSX.Element | null {
  const error = useAppSelector(globalSelectors.error);

  return (error)
    ? <div className='error-message'>{error}</div>
    : null;

}

export default ErrorMessage;
