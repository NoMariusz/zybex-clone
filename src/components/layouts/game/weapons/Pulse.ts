import { Weapons } from "../constants";
import Weapon from "./Weapon";

export default class Pulse extends Weapon {
  type = Weapons.Pulse;
  nextShotTimeout = 400;

  handleShot1() {
    const bullet = this.bulletFactory.makeBullet(this);
    return [bullet];
  }
}
