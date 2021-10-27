import { Collidable, Position, Renderable, Size } from "../../../interfaces";
import { CanvasElement } from "../../../rendering/interfaces";
import Renderer from "../../../rendering/Renderer";
import { BASE_ENEMY_HP } from "../constants";
import { translateToCanvasPos } from "../utils";
import Bullet from "../bullets/Bullet";
import BulletFactory from "../bullets/BulletFactory";

export default abstract class EnemySection implements Renderable, Collidable {
  /* Describe one part of enemy or enemy group  */

  shotTimer: NodeJS.Timer;
  abstract shotTimerMs: number;

  element: CanvasElement;
  private hp: number;
  live: boolean;
  canClear: boolean;
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
    this.canClear = false;
    this.bulletFactory = new BulletFactory();
    this.bullets = [];
  }

  render() {
    Renderer.render(this.element);
    for (const b of this.bullets) {
      b.render();
    }
  }

  shot() {
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
}
