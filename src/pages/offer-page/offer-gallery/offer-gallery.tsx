
import { memo } from 'react';

type OfferGalleryProps = {photos:string[]}
function OfferGallery({photos}:OfferGalleryProps){
  return(
    <div className="offer__gallery-container container">
      <div className="offer__gallery">
        {photos.slice(0,6).map((i) =>
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
const MemorizedOfferGallery = memo(OfferGallery);
export default MemorizedOfferGallery;
