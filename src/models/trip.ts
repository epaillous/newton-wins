import { Point, PointInterface } from './point';
import * as moment from 'moment';

export enum TypeTrip {
  car = 'car',
  plane = 'plane',
  bus = 'bus',
  train = 'train',
  cycling = 'cycling',
  hiking = 'hiking',
  boat = 'boat',
  'hitchHiking' = 'hitch_hiking',
  'motorbike' = 'motorbike',
}

export interface TripInterface {
  departure: PointInterface;
  arrival: PointInterface;
  id: number;
  date: string;
  transport_mode: TypeTrip;
}

export class Trip {
  departure: Point;
  arrival: Point;
  id: number;
  date: moment.Moment;
  mode: TypeTrip;

  constructor(json: TripInterface) {
    this.departure = new Point(json.departure);
    this.arrival = new Point(json.arrival);
    this.id = json.id;
    this.date = moment(json.date);
    this.mode = json.transport_mode;
  }

}
