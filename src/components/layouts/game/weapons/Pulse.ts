import { BulletType } from "../bullets/bulletsData";
import { Weapons } from "../constants";
import Weapon from "./Weapon";

export default class Pulse extends Weapon {
  type = Weapons.Pulse;
  nextShotTimeout = 1000;

  handleShot1() {
    const bullet = this.bulletFactory.makeBullet(BulletType.Pulse1);
    return [bullet];
  }

  handleShot2() {
    const bullet = this.bulletFactory.makeBullet(BulletType.Pulse2);
    return [bullet];
  }
}
