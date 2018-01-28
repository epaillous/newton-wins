import MapTypeStyle = google.maps.MapTypeStyle;

export const lowLevelStyles: MapTypeStyle[] = [
  {
    stylers: [
      {
        hue: '#bbff00'
      },
      {
        weight: 0.5
      },
      {
        gamma: 0.5
      }
    ]
  },
  {
    elementType: 'labels',
    stylers: [
      {
        visibility: 'off'
      }
    ]
  },
  {
    featureType: 'landscape.natural',
    stylers: [
      {
        color: '#a4cc48'
      }
    ]
  },
  {
    elementType: 'geometry',
    featureType: 'road',
    stylers: [
      {
        color: '#ffffff'
      },
      {
        visibility: 'on'
      },
      {
        weight: 1
      }
    ]
  },
  {
    elementType: 'labels',
    featureType: 'administrative',
    stylers: [
      {
        visibility: 'on'
      }
    ]
  },
  {
    elementType: 'labels',
    featureType: 'road.highway',
    stylers: [
      {
        visibility: 'simplified'
      },
      {
        gamma: 1.14
      },
      {
        saturation: -18
      }
    ]
  },
  {
    elementType: 'labels',
    featureType: 'road.highway.controlled_access',
    stylers: [
      {
        saturation: 30
      },
      {
        gamma: 0.76
      }
    ]
  },
  {
    featureType: 'road.local',
    stylers: [
      {
        visibility: 'simplified'
      },
      {
        weight: 0.4
      },
      {
        lightness: -8
      }
    ]
  },
  {
    featureType: 'water',
    stylers: [
      {
        color: '#4aaecc'
      }
    ]
  },
  {
    featureType: 'landscape.man_made',
    stylers: [
      {
        color: '#718e32'
      }
    ]
  },
  {
    featureType: 'poi.business',
    stylers: [
      {
        saturation: 68
      },
      {
        lightness: -61
      }
    ]
  },
  {
    elementType: 'labels.text.stroke',
    featureType: 'administrative.locality',
    stylers: [
      {
        weight: 2.7
      },
      {
        color: '#f4f9e8'
      }
    ]
  },
  {
    elementType: 'geometry.stroke',
    featureType: 'road.highway.controlled_access',
    stylers: [
      {
        weight: 1.5
      },
      {
        color: '#e53013'
      },
      {
        saturation: -42
      },
      {
        lightness: 28
      }
    ]
  }
];
