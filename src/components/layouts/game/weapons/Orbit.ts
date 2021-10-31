import { BulletType } from "../bullets/bulletsData";
import { Weapons } from "../constants";
import Weapon from "./Weapon";

export default class Orbit extends Weapon {
  type = Weapons.Orbit;
  nextShotTimeout = 500;

  handleShot1() {
    // change next shot timeout
    this.nextShotTimeout = this.nextShotTimeout == 500 ? 200 : 500;

    return this.makeBaseBullet();
  }

  handleShot2() {
    // change next shot timeout
    this.nextShotTimeout = 300;

    return this.makeBaseBullet();
  }

  makeBaseBullet() {
    const bullet = this.bulletFactory.makeBullet(BulletType.Orbit);
    return [bullet];
  }
}
