export const GOOGLE_MAPS_API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

export const mapStyles = [
  {
    featureType: "all",
    elementType: "geometry",
    stylers: [{ color: "#f5f5f5" }],
  },
  {
    featureType: "water",
    elementType: "geometry",
    stylers: [{ color: "#e9e9e9" }],
  },
  {
    featureType: "water",
    elementType: "labels.text.fill",
    stylers: [{ color: "#9e9e9e" }],
  },
  {
    featureType: "poi.business",
    stylers: [{ visibility: "on" }],
  },
  {
    featureType: "poi.medical",
    stylers: [{ visibility: "on" }],
  },
];

export const defaultMapConfig = {
  zoom: 14,
  center: { lat: 0, lng: 0 },
  options: {
    styles: mapStyles,
    zoomControl: true,
    mapTypeControl: false,
    scaleControl: true,
    streetViewControl: false,
    rotateControl: false,
    fullscreenControl: true,
    gestureHandling: "cooperative",
  },
};
