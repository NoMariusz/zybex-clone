import { BulletType } from "../bullets/bulletsData";
import { Weapons } from "../constants";
import Weapon from "./Weapon";

export default class RGun extends Weapon {
    type = Weapons.RGun;
    nextShotTimeout = 1500;
    shotIter: number = 0;

    handleShot1() {
        this.nextShotTimeout = 1500;
        return [this.bulletFactory.makeBullet(BulletType.RGun1)];
    }

    handleShot2() {
        this.nextShotTimeout = 1500;
        return [this.bulletFactory.makeBullet(BulletType.RGun2)];
    }

    handleShot3() {
        this.nextShotTimeout = 1500;
        return [this.bulletFactory.makeBullet(BulletType.RGun3)];
    }

    handleShot4() {
        if (this.shotIter % 4 == 3) {
            this.nextShotTimeout = 1500;
        } else {
            this.nextShotTimeout = 10;
        }
        this.shotIter++;

        return [this.bulletFactory.makeBullet(BulletType.RGun2)];
    }
}
