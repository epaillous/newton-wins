export interface PointInterface {
  latitude: string;
  longitude: string;
  id: number;
}

export class Point {
    latitude: number;
    longitude: number;
    id: number;

  constructor(json: PointInterface) {
    this.latitude = +json.latitude;
    this.longitude = +json.longitude;
    this.id = json.id;
  }

  get googleMapPoint() {
    return {'lat': this.latitude, 'lng': this.longitude};
  }
}