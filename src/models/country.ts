export interface CountryInterface {
  id: number;
  name: string;
}

export class Country {
  id: number;
  name: string;

  constructor(jsonCountry: CountryInterface) {
    this.id = jsonCountry.id;
    this.name = jsonCountry.name;
  }

}