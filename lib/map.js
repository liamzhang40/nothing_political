import mapStyle from './map_style';

const initMap = () => {
  const mapEl = document.getElementById('map');
  const mapOptions = {
      center: { lat: 37.09024, lng: -95.712891 },
      zoom: 5,
      styles: mapStyle,
      mapTypeControl: false,
      fullscreenControl: false,
      streetViewControl: false
  };

  const map = new google.maps.Map(mapEl, mapOptions);

  return map;
};

export default initMap;
