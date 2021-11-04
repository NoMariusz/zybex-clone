import { Collidable, Position, Renderable, Size } from "../../../interfaces";
import { CanvasElement } from "../../../rendering/interfaces";
import Renderer from "../../../rendering/Renderer";
import { BASE_ENEMY_HP } from "../constants";
import { translateToCanvasPos } from "../utils";
import Bullet from "../bullets/Bullet";
import BulletFactory from "../bullets/BulletFactory";
import Animator from "../animations/Animator";
import { AnimationName } from "../animations/animationNames";
import { BulletType } from "../bullets/bulletsData";

export default abstract class EnemySection implements Renderable, Collidable {
    /* Describe one part of enemy or enemy group  */

    shotTimer: NodeJS.Timer;
    abstract shotTimerMs: number;

    animator: Animator;

    element: CanvasElement;
    protected hp: number;
    live: boolean;
    canBeCleared: boolean;
    private _position: Position;
    size: Size;

    bullets: Bullet[];
    bulletFactory: BulletFactory;

    get position() {
        return this._position;
    }

    set position(val: Position) {
        this._position = val;
        this.element.position = translateToCanvasPos(this._position);
    }

    constructor() {
        this.hp = BASE_ENEMY_HP;
        this.live = true;
        this.canBeCleared = false;
        this.bulletFactory = new BulletFactory();
    }

    // lifecycle stuff

    render() {
        Renderer.render(this.element);
    }

    clear() {
        clearInterval(this.shotTimer);
        this.animator.clearAnims();
        this.canBeCleared = true;
    }

    abstract move(): void;

    // init stuff

    initAfterElementPresent() {
        if (this.element == undefined)
            throw new Error(
                "This functioncan't work correctly when this.element is undefined"
            );

        this.size = this.element.size;
        this.initAnimator();
    }

    initAnimator() {
        this.animator = new Animator(this.element);
    }

    // shoting

    shot() {
        if (!this.live) return;
        const bullet = this.makeBullet();
        bullet.position = {
            ...this.position,
            y: this.position.y + this.size.height / 2 - bullet.size.height / 2,
        };
        this.bullets.push(bullet);
    }

    makeBullet() {
        /* created mainly to override for child if they need other bullet type */
        return this.bulletFactory.makeBullet(BulletType.Enemy);
    }

    startShotTimer() {
        this.shot();
        this.shotTimer = setInterval(() => {
            this.shot();
        }, this.shotTimerMs);
    }

    // receiving damage

    takeDamage(count: number) {
        this.hp -= count;
        if (this.hp <= 0) this.die();
    }

    die() {
        this.live = false;
        const time = this.animator.startAnim(AnimationName.EnemyDeath);
        setTimeout(() => {
            this.clear();
        }, time);
    }
}
