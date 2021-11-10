import { BulletType } from "../bullets/bulletsData";
import { Weapons } from "../constants";
import Weapon from "./Weapon";

const TIMEOUTS = [200, 500];

export default class Orbit extends Weapon {
    type = Weapons.Orbit;
    nextShotTimeout = TIMEOUTS[0];
    bulletsInSerie = 2;
    shotIter = 1;
    levelSpeedBonus = 1;

    handleBaseShot() {
        if (this.shotIter >= this.bulletsInSerie) {
            this.shotIter = 0;
            this.nextShotTimeout = TIMEOUTS[1] / this.levelSpeedBonus;
        } else {
            this.nextShotTimeout = TIMEOUTS[0] / this.levelSpeedBonus;
        }
        this.shotIter++;
        return this.makeBaseBullet();
    }

    handleShot1() {
        this.bulletsInSerie = 2;
        this.levelSpeedBonus = 1;
        // change next shot timeout
        return this.handleBaseShot();
    }

    handleShot2() {
        this.bulletsInSerie = 4;
        this.levelSpeedBonus = 1.3;
        // change next shot timeout
        return this.handleBaseShot();
    }

    makeBaseBullet() {
        const bullet = this.bulletFactory.makeBullet(BulletType.Orbit);
        return [bullet];
    }
}
