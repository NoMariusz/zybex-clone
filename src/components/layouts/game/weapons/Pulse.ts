import { BulletType } from "../bullets/bulletsData";
import { Weapons } from "../constants";
import Weapon from "./Weapon";

export default class Pulse extends Weapon {
    type = Weapons.Pulse;
    nextShotTimeout = 1000;
    shotIter: number = 0;

    handleShot1() {
        this.nextShotTimeout = 1000;
        const bullet = this.bulletFactory.makeBullet(BulletType.Pulse1);
        return [bullet];
    }

    handleShot2() {
        this.nextShotTimeout = 1000;
        const bullet = this.bulletFactory.makeBullet(BulletType.Pulse2);
        return [bullet];
    }

    handleShot3() {
        this.nextShotTimeout = 300;

        const bullets = [];

        if (this.shotIter % 3 >= 1)
            bullets.push(
                this.bulletFactory.makeBullet(BulletType.PulseBallDown)
            );
        if (this.shotIter % 3 >= 2)
            bullets.push(this.bulletFactory.makeBullet(BulletType.Pulse2));
        bullets.push(this.bulletFactory.makeBullet(BulletType.PulseBallUp));

        this.shotIter++;
        return bullets;
    }
}
