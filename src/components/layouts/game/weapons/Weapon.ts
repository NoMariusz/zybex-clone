import Bullet from "../bullets/Bullet";
import BulletFactory from "../bullets/BulletFactory";
import { Weapons } from "../constants";

export default abstract class Weapon {
    abstract readonly type: Weapons;
    abstract nextShotTimeout: number;
    level: number;
    bulletFactory: BulletFactory;

    constructor() {
        this.level = 1;
        this.bulletFactory = new BulletFactory();
    }

    shot() {
        switch (this.level) {
            case 1:
                return this.handleShot1();
            case 2:
                return this.handleShot2();
            case 3:
                return this.handleShot3();

            default:
                break;
        }
        return [];
    }

    abstract handleShot1(): Bullet[];
    abstract handleShot2(): Bullet[];
    abstract handleShot3(): Bullet[];
}
