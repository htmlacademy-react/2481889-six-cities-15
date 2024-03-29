
import {useRef, useEffect, memo} from 'react';
import {Icon, Marker, layerGroup} from 'leaflet';
import useMap from '../../hooks/use-map';
import {City} from '../../types/city';
import {URL_MARKER_DEFAULT, URL_MARKER_CURRENT} from '../../constants';
import 'leaflet/dist/leaflet.css';
import { Offer, Offers } from '../../types/offer';
import { Nullable } from '../../types/nullable';

type MapProps = {
  city: City;
  offers: Offers;
  selectedOffer: Nullable<Offer>;
  className: string;
};

const defaultCustomIcon = new Icon({
  iconUrl: URL_MARKER_DEFAULT,
  iconSize: [40, 40],
  iconAnchor: [20, 40]
});

const currentCustomIcon = new Icon({
  iconUrl: URL_MARKER_CURRENT,
  iconSize: [40, 40],
  iconAnchor: [20, 40]
});

function Map(props: MapProps): JSX.Element {
  const {city, offers, selectedOffer} = props;

  const mapRef = useRef(null);
  const map = useMap(mapRef, city);

  useEffect(() => {
    if (map) {
      const markerLayer = layerGroup().addTo(map);
      offers.forEach((offer) => {
        const marker = new Marker({
          lat: offer.location.latitude,
          lng: offer.location.longitude,
        });

        marker
          .setIcon(
            selectedOffer !== null && offer.id === selectedOffer.id
              ? currentCustomIcon
              : defaultCustomIcon
          )
          .addTo(markerLayer);
      });

      return () => {
        map.removeLayer(markerLayer);
      };
    }
  }, [map, offers, selectedOffer]);

  useEffect(() => {
    map?.setView([city.location.latitude, city.location.longitude], city.location.zoom);
  }, [map, city]);

  return <section style={{height: '500px'}} className={`${props.className}  map`} ref={mapRef}></section>;
}

const MemorizedMap = memo(Map);
export default MemorizedMap;
