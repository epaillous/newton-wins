import MapTypeStyle = google.maps.MapTypeStyle;

export const styles: MapTypeStyle[] = [
  {
    stylers: [
      {
        hue: '#bbff00',
      },
      {
        gamma: 0.5,
      },
      {
        weight: 0.5,
      },
    ],
  },
  {
    elementType: 'labels',
    stylers: [
      {
        visibility: 'off',
      },
    ],
  },
  {
    featureType: 'administrative',
    elementType: 'labels',
    stylers: [
      {
        visibility: 'on',
      },
    ],
  },
  {
    featureType: 'administrative.locality',
    elementType: 'labels.text.stroke',
    stylers: [
      {
        color: '#f4f9e8',
      },
      {
        weight: 2.7,
      },
    ],
  },
  {
    featureType: 'administrative.province',
    stylers: [
      {
        visibility: 'off',
      },
    ],
  },
  {
    featureType: 'landscape.man_made',
    stylers: [
      {
        color: '#718e32',
      },
    ],
  },
  {
    featureType: 'landscape.natural',
    stylers: [
      {
        color: '#a4cc48',
      },
    ],
  },
  {
    featureType: 'poi',
    stylers: [
      {
        visibility: 'off',
      },
    ],
  },
  {
    featureType: 'road',
    stylers: [
      {
        visibility: 'off',
      },
    ],
  },
  {
    featureType: 'water',
    stylers: [
      {
        color: '#4aaecc',
      },
    ],
  },
];
