import { BulletType } from "../bullets/bulletsData";
import { Weapons } from "../constants";
import Weapon from "./Weapon";

export default class EightWay extends Weapon {
    type = Weapons.EightWay;
    nextShotTimeout = 350;

    handleShot1() {
        this.nextShotTimeout = 500;
        return this.makeHalfBullets();
    }

    handleShot2() {
        this.nextShotTimeout = 500;
        return this.makeFullBullets();
    }

    handleShot3() {
        this.nextShotTimeout = 350;
        return this.makeFullBullets();
    }

    makeHalfBullets() {
        return [
            this.bulletFactory.makeBullet(BulletType.EightWayDown),
            this.bulletFactory.makeBullet(BulletType.EightWayUp),
        ];
    }

    makeFullBullets() {
        return [
            this.bulletFactory.makeBullet(BulletType.EightWayDown),
            this.bulletFactory.makeBullet(BulletType.EightWayUp),
            this.bulletFactory.makeBullet(BulletType.EightWayLeft),
            this.bulletFactory.makeBullet(BulletType.EightWayRight),
        ];
    }
}
