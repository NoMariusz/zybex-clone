import { Weapons } from "../constants";

export default class Weapon {
  type: Weapons;
  level: number;

  constructor(type: Weapons) {
    this.type = type;
    this.level = 1;
  }
}
