import PolylineOptions = google.maps.PolylineOptions;
import { Trip, TypeTrip } from '../../models/trip';

export class PolylineViewModel {
  public path: any[];
  public options: PolylineOptions;

  private static computeIcons(trip: Trip) {
    const lineSymbol = {
      path: 'M 0,-1 0,1',
      scale: 4,
      strokeOpacity: 1,
    };
    return [{
      icon: lineSymbol,
      offset: '0',
      repeat: '20px',
    }];
  }

  constructor(trip: Trip) {
    this.path = [trip.departure.googleMapPoint, trip.arrival.googleMapPoint];
    const options: PolylineOptions = {};
    if (trip.mode === TypeTrip.plane) {
      options.icons = PolylineViewModel.computeIcons(trip);
      options.geodesic = true;
      options.strokeOpacity = 0;
      options.strokeWeight = 2;
    } else {
      options.strokeWeight = 1;
    }
    this.options = options;
  }

}
