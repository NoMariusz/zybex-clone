import Weapon from "../weapons/Weapon";
import EnemySection from "../enemy/EnemySection";
import Bullet from "./Bullet";
import bulletData, { BulletType } from "./bulletsData";
import { Weapons } from "../constants";

export default class BulletFactory {
  makeBullet(bulletType: BulletType) {
    const bullet = new Bullet();

    const data = bulletData[bulletType];
    bullet.element.texture_offset = data.texture_offset;
    bullet.size = data.size;
    bullet.damage = data.damage;

    if (bulletType == BulletType.Enemy) bullet.velocity = -1;

    return bullet;
  }
}
