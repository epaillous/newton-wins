export interface CountryInterface {
  id: number;
  name: string;
  code: string;
}

export class Country {
  id: number;
  name: string;
  code: string;

  constructor(jsonCountry: CountryInterface) {
    this.id = jsonCountry.id;
    this.name = jsonCountry.name;
    this.code = jsonCountry.code;
  }

}