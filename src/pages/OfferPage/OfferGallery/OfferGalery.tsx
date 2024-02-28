/* eslint-disable react/jsx-closing-tag-location */
type OfferGalleryProps = {photos?:string[]}
export function OfferGallery(props:OfferGalleryProps){
  return(
    <div className="offer__gallery-container container">
      <div className="offer__gallery">
        {typeof props.photos !== 'undefined' ? props.photos.map((i) =>
          (<div key={i} className="offer__image-wrapper">
            <img
              className="offer__image"
              src={i}
              alt="Photo studio"
            />
          </div>))
          : null}

      </div>
    </div>

  );
}
