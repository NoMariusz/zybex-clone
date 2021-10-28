import { Collidable, Position, Renderable, Size } from "../../../interfaces";
import { CanvasElement } from "../../../rendering/interfaces";
import Renderer from "../../../rendering/Renderer";
import { BASE_ENEMY_HP } from "../constants";
import { translateToCanvasPos } from "../utils";
import Bullet from "../bullets/Bullet";
import BulletFactory from "../bullets/BulletFactory";
import Animator from "../animations/Animator";
import { AnimationName } from "../animations/animationNames";

export default abstract class EnemySection implements Renderable, Collidable {
  /* Describe one part of enemy or enemy group  */

  shotTimer: NodeJS.Timer;
  abstract shotTimerMs: number;

  animator: Animator;

  element: CanvasElement;
  private hp: number;
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

  initAnimator() {
    this.animator = new Animator(this.element);
  }

  render() {
    Renderer.render(this.element);
  }

  shot() {
    if (!this.live) return;
    const bullet = this.bulletFactory.makeBullet(this);
    bullet.position = {
      ...this.position,
      y: this.position.y + this.size.height / 2 - bullet.size.height / 2,
    };
    this.bullets.push(bullet);
  }

  abstract move(): void;

  startShotTimer() {
    this.shot();
    this.shotTimer = setInterval(() => {
      this.shot();
    }, this.shotTimerMs);
  }

  takeDamage(count: number) {
    this.hp -= count;
    if (this.hp <= 0) this.die();
  }

  die() {
    this.live = false;
    this.clear();
  }

  clear() {
    clearInterval(this.shotTimer);
    this.animator.clearAnims();
    this.canBeCleared = true;
  }
}
