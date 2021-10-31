import { Collidable, Position, Renderable, Size } from "../../../interfaces";
import { BOARD_SCROLL_SPEED } from "../constants";
import { translateToCanvasPos } from "../utils";
import BulletElement from "./BulletElement";
import Renderer from "../../../rendering/Renderer";

export default class Bullet implements Collidable, Renderable {
  destroyable: boolean = true;
  element: BulletElement;
  private _size: Size;
  velocity: Position = {
    x: 1,
    y: 0,
  };

  speed = BOARD_SCROLL_SPEED * 4;
  damage: number = 35;

  active = true;
  canClear = false;

  private _position: Position;

  get position() {
    return this._position;
  }

  set position(val: Position) {
    this._position = val;
    this.element.position = translateToCanvasPos(this._position);
  }

  get size() {
    return this._size;
  }

  set size(val: Size) {
    this._size = val;
    this.element.size = val;
  }

  constructor() {
    this.element = new BulletElement();
  }

  render() {
    this.move();
    Renderer.render(this.element);
  }

  move() {
    this.position = {
      y: this.position.y + this.velocity.y * this.speed,
      x: this.position.x + this.velocity.x * this.speed,
    };
  }

  destroy() {
    if (!this.destroyable) return;
    this.active = false;
  }
}
