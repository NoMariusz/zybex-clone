import { BulletType } from "../bullets/bulletsData";
import { Weapons } from "../constants";
import Weapon from "./Weapon";

export default class RGun extends Weapon {
    type = Weapons.RGun;
    nextShotTimeout = 1500;

    handleShot1() {
        return [this.bulletFactory.makeBullet(BulletType.RGun1)];
    }

    handleShot2() {
        return [this.bulletFactory.makeBullet(BulletType.RGun2)];
    }

    handleShot3() {
        return [this.bulletFactory.makeBullet(BulletType.RGun3)];
    }
}
