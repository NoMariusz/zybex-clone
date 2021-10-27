import Weapon from "../weapons/Weapon";
import EnemySection from "../enemy/EnemySection";
import Bullet from "./Bullet";
import bulletData from "./bulletsData";

export default class BulletFactory {
  makeBullet(creator: Weapon | EnemySection) {
    // make bullet for enemy
    if (creator instanceof EnemySection) return this.makeEnemyBullet();
    // make bullet for weapon, appropriate for weapon type
    else if (creator instanceof Weapon) {
      switch (creator.type) {
        default:
          throw new Error("Try to make bullet for not known weapon");
      }
    }
    throw new Error("Try to make bullet for not known creator");
  }

  makeEnemyBullet() {
    const bullet = new Bullet();

    const data = bulletData.enemy;
    bullet.element.texture_offset = data.texture_offset;
    bullet.size = data.size;

    return bullet;
  }
}
