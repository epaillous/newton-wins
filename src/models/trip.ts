import { Point, PointInterface } from './point';
import * as moment from 'moment';

export interface TripInterface {
  departure: PointInterface;
  arrival: PointInterface;
  id: number;
  date: string;
}

export class Trip {
    departure: Point;
    arrival: Point;
    id: number;
    date: moment.Moment;

  constructor(json: TripInterface) {
    this.departure = new Point(json.departure);
    this.arrival = new Point(json.arrival);
    this.id = json.id;
    this.date = moment(json.date);
  }

  get path() {
    return [
      this.departure.googleMapPoint, this.arrival.googleMapPoint
      ];
    }
}
