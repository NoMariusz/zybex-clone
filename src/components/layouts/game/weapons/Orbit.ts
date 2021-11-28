import { Sound } from "../../../sounds/constants";
import SoundPlayer from "../../../sounds/SoundPlayer";
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
        return [this.makeBullet(BulletType.Orbit)];
    }

    handleShot1() {
        this.bulletsInSerie = 2;
        this.levelSpeedBonus = 1;
        return this.handleBaseShot();
    }

    handleShot2() {
        this.bulletsInSerie = 3;
        this.levelSpeedBonus = 1.3;
        return this.handleBaseShot();
    }

    handleShot3() {
        this.bulletsInSerie = 4;
        this.levelSpeedBonus = 1.5;

        return [
            ...this.handleBaseShot(),
            this.makeBullet(BulletType.OrbitRotate),
        ];
    }

    handleShot4() {
        this.bulletsInSerie = 6;
        this.levelSpeedBonus = 2;

        return [
            ...this.handleBaseShot(),
            this.makeBullet(BulletType.OrbitRotate),
        ];
    }

    makeBullet(type: BulletType) {
        return this.bulletFactory.makeBullet(type);
    }

    playShotSound() {
        SoundPlayer.play(Sound.OrbitShot);
    }
}
