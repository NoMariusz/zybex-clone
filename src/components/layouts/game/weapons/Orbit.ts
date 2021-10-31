import { Weapons } from "../constants";
import Weapon from "./Weapon";

export default class Orbit extends Weapon {
  type = Weapons.Orbit;
  nextShotTimeout = 500;

  handleShot1() {
    this.changeTimeout();
    const bullet = this.bulletFactory.makeBullet(this);
    return [bullet];
  }

  changeTimeout() {
    this.nextShotTimeout = this.nextShotTimeout == 500 ? 50 : 500;
  }
}
