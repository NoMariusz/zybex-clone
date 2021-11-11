import Bullet from "./Bullet";
import bulletData, { BulletType } from "./bulletsData";

export default class BulletFactory {
    makeBullet(bulletType: BulletType) {
        const bullet = new Bullet(bulletType);

        const data = bulletData[bulletType];
        bullet.element.texture_offset = data.texture_offset;
        bullet.size = data.size;
        bullet.damage = data.damage;

        this.loadFeatures(bullet, bulletType);

        return bullet;
    }

    loadFeatures(bullet: Bullet, type: BulletType) {
        switch (type) {
            case BulletType.EightWayLeft:
            case BulletType.Enemy:
                bullet.velocity.x = -1;
                break;
            case BulletType.EnemyDown:
                bullet.velocity.x = 0;
                bullet.velocity.y = 0.5;
                break;
            case BulletType.EnemyUp:
                bullet.velocity.x = 0;
                bullet.velocity.y = -0.5;
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
            case BulletType.RGun1:
            case BulletType.RGun2:
            case BulletType.RGun3:
                bullet.destroyable = false;
                break;
            case BulletType.OrbitRotate:
                bullet.moveProgress = 0;
                break;
            case BulletType.PulseBallDown:
                bullet.velocity = {
                    x: 0.7071,
                    y: 0.7071,
                };
                break;
            case BulletType.PulseBallUp:
                bullet.velocity = {
                    x: 0.7071,
                    y: -0.7071,
                };
                break;
            case BulletType.TearDown:
                bullet.velocity = {
                    x: 0.866,
                    y: 0.5,
                };
                break;
            case BulletType.TearUp:
                bullet.velocity = {
                    x: 0.866,
                    y: -0.5,
                };
                break;
            case BulletType.TearBackDown:
                bullet.velocity = {
                    x: -0.866,
                    y: 0.5,
                };
                break;
            case BulletType.TearBackUp:
                bullet.velocity = {
                    x: -0.866,
                    y: -0.5,
                };
                break;
            default:
                break;
        }
    }
}
