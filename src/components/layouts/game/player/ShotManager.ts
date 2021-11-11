import { Position, Renderable } from "../../../interfaces";
import BulletClearer from "../bullets/BulletClearer";
import Bullet from "../bullets/Bullet";
import Weapon from "../weapons/Weapon";
import {
    MIN_WEAPON_SHOT_TIMEOUT,
    ROTATE_BULLET_DISTANCE,
    Weapons,
} from "../constants";
import { BulletType } from "../bullets/bulletsData";

export default class ShotManager extends BulletClearer implements Renderable {
    weapon: Weapon;
    position: Position;

    shotTimeout: NodeJS.Timeout;
    shotSpeedMultiplier = 1;
    // token restricting shot loops to work only when they started with actual token
    private loopToken = 0;

    bullets: Bullet[] = [];

    get shotTimeoutMs() {
        return (
            Math.max(
                MIN_WEAPON_SHOT_TIMEOUT,
                this.weapon.nextShotTimeout / this.shotSpeedMultiplier
            ) ?? 500
        );
    }

    get rotateBullet() {
        return this.bullets.find((b) => b.type == BulletType.OrbitRotate);
    }

    constructor(position: Position) {
        super();
        this.position = position;
    }

    render() {
        for (const bullet of this.bullets) {
            bullet.render();
        }
        this.renderRotateBullet();
        this.checkBullets();
    }

    startShot() {
        this.shotLoop(this.loopToken);
    }

    shotLoop(token: number) {
        /**
         * @param token: number - token describing loop token when loop start working
         * if token is not equal to actual loop token, break that loop
         */
        if (this.loopToken != token) return;

        this.shotTimeout = setTimeout(() => {
            this.shot();
            this.shotLoop(token);
        }, this.shotTimeoutMs);
    }

    shot() {
        const bullets = this.weapon.shot();
        for (const bullet of bullets) {
            if (bullet.type == BulletType.OrbitRotate) {
                this.addRotateBullet(bullet);
                continue;
            }
            this.bullets.push(bullet);
        }
        bullets.forEach(
            (b) =>
                (b.position = {
                    ...this.position,
                    y: this.position.y + 25,
                })
        );
    }

    stopShot() {
        this.loopToken++;
    }

    // rotate bullet

    addRotateBullet(bullet: Bullet) {
        if (this.rotateBullet) return;

        this.bullets.push(bullet);
    }

    renderRotateBullet() {
        const rBullet = this.rotateBullet;
        if (rBullet == undefined) return;

        // check if should clear eBullet
        if (this.weapon.type != Weapons.Orbit || this.weapon.level < 3) {
            rBullet.canClear = true;
        }

        rBullet.moveProgress += (Math.PI / 360) * rBullet.speed;
        rBullet.position = {
            x:
                Math.sin(rBullet.moveProgress) * ROTATE_BULLET_DISTANCE +
                this.position.x,
            y:
                Math.cos(rBullet.moveProgress) * ROTATE_BULLET_DISTANCE +
                this.position.y,
        };
    }
}
