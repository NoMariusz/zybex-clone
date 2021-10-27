import Weapon from "../weapons/Weapon";
import EnemySection from "../enemy/EnemySection";
import Bullet from "./Bullet";
import bulletData, { BulletsCreators } from "./bulletsData";
import { Weapons } from "../constants";

export default class BulletFactory {
  makeBullet(creator: Weapon | EnemySection) {
    // make bullet for enemy
    if (creator instanceof EnemySection)
      return this.buildBullet(BulletsCreators.Enemy);
    // make bullet for weapon, appropriate for weapon type
    else if (creator instanceof Weapon) {
      switch (creator.type) {
        case Weapons.Orbit:
          return this.buildBullet(BulletsCreators.Orbit);
        default:
          throw new Error("Try to make bullet for not known weapon");
      }
    }
    throw new Error("Try to make bullet for not known creator");
  }

  buildBullet(creator: BulletsCreators) {
    const bullet = new Bullet();

    const data = bulletData[creator];
    bullet.element.texture_offset = data.texture_offset;
    bullet.size = data.size;

    if (creator == BulletsCreators.Enemy) bullet.velocity = -1;

    return bullet;
  }
}
