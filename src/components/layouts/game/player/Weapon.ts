import { Weapons } from "../constants";

export default class Weapon {
  type: Weapons;
  level = 1;

  constructor(type: Weapons) {
    this.type = type;
  }
}
