import BulletFactory from "../bullets/BulletFactory";
import { Weapons } from "../constants";

export default class Weapon {
  type: Weapons;
  level: number;
  bulletFactory: BulletFactory;

  constructor(type: Weapons) {
    this.type = type;
    this.level = 1;
    this.bulletFactory = new BulletFactory();
  }

  shot() {
    const bullet = this.bulletFactory.makeBullet(this);
    return bullet;
  }
}
