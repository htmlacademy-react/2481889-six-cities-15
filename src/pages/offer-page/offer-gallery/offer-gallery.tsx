/* eslint-disable react-refresh/only-export-components */
import { memo } from 'react';

type OfferGalleryProps = {photos:string[]}
function OfferGallery(props:OfferGalleryProps){
  return(
    <div className="offer__gallery-container container">
      <div className="offer__gallery">
        {props.photos.map((i) =>
          (
            <div key={i} className="offer__image-wrapper">
              <img
                className="offer__image"
                src={i}
              />
            </div>))}
      </div>
    </div>

  );
}

export default memo(OfferGallery);
