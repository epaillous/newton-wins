import { Country, CountryInterface } from './country';

export interface CityInterface {
  id: number;
  name: string;
  country: CountryInterface;
}

export class City {
  id: number;
  name: string;
  country: Country;

  constructor(jsonCity: CityInterface) {
    this.id = jsonCity.id;
    this.name = jsonCity.name;
    this.country = new Country(jsonCity.country);
  }

}