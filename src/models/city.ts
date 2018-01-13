import { Country, CountryInterface } from './country';

export interface CityInterface {
  id: number;
  name: string;
  country: CountryInterface;
}

export class City {
  public id: number;
  public name: string;
  public country: Country;

  constructor(jsonCity: CityInterface) {
    this.id = jsonCity.id;
    this.name = jsonCity.name;
    this.country = new Country(jsonCity.country);
  }

}
