import { memo, useState } from 'react';
import { Offer } from '../../types/offer';
import { authSelectors } from '../../slices/auth/auth';
import { AppRoutes, AuthorizationStatus } from '../../constants';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/use-app';
import { postFavoriteAction } from '../../store/api-actions';
import { FavoriteData } from '../../types/favorite-data';
type FavoriteButtonProps = {
  offer: Offer;
  type: string;
  width: number;
  height: number;
}

const FavoriteButton = ({offer, type, width, height}: FavoriteButtonProps) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [isFavorite, setIsFavorite] = useState(offer.isFavorite);
  const authStatus = useAppSelector(authSelectors.getAuthorizationStatus);
  const handleToggle = () => {
    if(authStatus !== AuthorizationStatus.Auth){
      navigate(AppRoutes.Login);
    }
    const data : FavoriteData = {
      offer: offer,
      newBool:!isFavorite
    };
    dispatch(postFavoriteAction(data));
    setIsFavorite(!isFavorite);

  };

  return(
    <button className={`${type}__bookmark-button
      ${isFavorite && `${type}__bookmark-button--active`} button`}
    type="button"
    onClick={handleToggle}
    >
      <svg className={`${type}__bookmark-icon`} width={width} height={height}>
        <use xlinkHref="#icon-bookmark"></use>
      </svg>
      <span className="visually-hidden">To bookmarks</span>
    </button>
  );
};

const MemorizedFavoriteButton = memo(FavoriteButton);
export default MemorizedFavoriteButton;
