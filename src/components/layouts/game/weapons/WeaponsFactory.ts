import { Weapons } from "../constants";
import Orbit from "./Orbit";
import Pulse from "./Pulse";
import EightWay from "./EightWay";

export default class WeaponsFactory {
  create(weaponType: Weapons) {
    switch (weaponType) {
      case Weapons.Orbit:
        return new Orbit();
      case Weapons.Pulse:
        return new Pulse();
      case Weapons.EightWay:
        return new EightWay();
      default:
        break;
    }
    throw new Error("Try to make not known type weapon");
  }
}
