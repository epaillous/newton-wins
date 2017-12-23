import { Point, PointInterface } from './point';

export interface MenuItemInterface {
  name: string;
  picto_url: string;
  point: PointInterface;
}

export class MenuItem {
  name: string;
  pictoUrl: string;
  point: Point;

  constructor(jsonMenuItem: MenuItemInterface) {
    this.name = jsonMenuItem.name;
    this.pictoUrl = jsonMenuItem.picto_url;
    this.point = new Point(jsonMenuItem.point);
  }

}