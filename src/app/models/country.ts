export class Country {
  code: string;
  name: string;
  flag: string;
  continent: string;
  constructor(code: string, name: string, flag: string, continent: string) {
    this.code = code;
    this.name = name;
    this.flag = flag;
    this.continent = continent;
  }
}
