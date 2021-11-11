import { BulletType } from "../bullets/bulletsData";
import { Weapons } from "../constants";
import Weapon from "./Weapon";

export default class EightWay extends Weapon {
    type = Weapons.EightWay;
    nextShotTimeout = 350;

    handleShot1() {
        this.nextShotTimeout = 500;
        return [
            this.bulletFactory.makeBullet(BulletType.EightWayDown),
            this.bulletFactory.makeBullet(BulletType.EightWayUp),
        ];
    }

    handleShot2() {
        this.nextShotTimeout = 500;
        return [
            this.bulletFactory.makeBullet(BulletType.EightWayDown),
            this.bulletFactory.makeBullet(BulletType.EightWayUp),
            this.bulletFactory.makeBullet(BulletType.EightWayLeft),
            this.bulletFactory.makeBullet(BulletType.EightWayRight),
        ];
    }

    handleShot3() {
        this.nextShotTimeout = 400;
        return [
            this.bulletFactory.makeBullet(BulletType.EightWayDown),
            this.bulletFactory.makeBullet(BulletType.EightWayUp),
            this.bulletFactory.makeBullet(BulletType.EightWayLeft),
            this.bulletFactory.makeBullet(BulletType.EightWayRight),
            this.bulletFactory.makeBullet(BulletType.TearDown),
            this.bulletFactory.makeBullet(BulletType.TearUp),
        ];
    }

    handleShot4() {
        this.nextShotTimeout = 350;
        return [
            this.bulletFactory.makeBullet(BulletType.EightWayDown),
            this.bulletFactory.makeBullet(BulletType.EightWayUp),
            this.bulletFactory.makeBullet(BulletType.EightWayLeft),
            this.bulletFactory.makeBullet(BulletType.EightWayRight),
            this.bulletFactory.makeBullet(BulletType.TearDown),
            this.bulletFactory.makeBullet(BulletType.TearBackDown),
            this.bulletFactory.makeBullet(BulletType.TearUp),
            this.bulletFactory.makeBullet(BulletType.TearBackUp),
        ];
    }
}
