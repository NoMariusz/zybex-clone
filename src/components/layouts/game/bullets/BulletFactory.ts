import Bullet from "./Bullet";
import bulletData, { BulletType } from "./bulletsData";

export default class BulletFactory {
  makeBullet(bulletType: BulletType) {
    const bullet = new Bullet();

    const data = bulletData[bulletType];
    bullet.element.texture_offset = data.texture_offset;
    bullet.size = data.size;
    bullet.damage = data.damage;

    this.loadVelocity(bullet, bulletType);

    return bullet;
  }

  loadVelocity(bullet: Bullet, type: BulletType) {
    switch (type) {
      case BulletType.Enemy:
        bullet.velocity.x = -1;
        break;
      case BulletType.EightWayDown:
        bullet.velocity = {
          x: 0,
          y: 1,
        };
        break;
      case BulletType.EightWayUp:
        bullet.velocity = {
          x: 0,
          y: -1,
        };
        break;

      default:
        break;
    }
  }
}
