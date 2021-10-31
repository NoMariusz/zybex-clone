import { BulletType } from "../bullets/bulletsData";
import { Weapons } from "../constants";
import Weapon from "./Weapon";

export default class EightWay extends Weapon {
  type = Weapons.EightWay;
  nextShotTimeout = 350;

  handleShot1() {
    this.nextShotTimeout = 350;
    return this.makeBullets();
  }

  handleShot2() {
    this.nextShotTimeout = 250;
    return this.makeBullets();
  }

  makeBullets() {
    return [
      this.bulletFactory.makeBullet(BulletType.EightWayDown),
      this.bulletFactory.makeBullet(BulletType.EightWayUp),
    ];
  }
}
