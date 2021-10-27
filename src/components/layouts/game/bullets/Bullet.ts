import { Collidable, Position, Renderable, Size } from "../../../interfaces";
import { BOARD_SCROLL_SPEED } from "../constants";
import { translateToCanvasPos } from "../utils";
import BulletElement from "./BulletElement";
import Renderer from "../../../rendering/Renderer";

export default class Bullet implements Collidable, Renderable {
  element: BulletElement;
  private _size: Size;
  velocity: number = 1;

  speed = BOARD_SCROLL_SPEED * 2;

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
      ...this.position,
      x: this.position.x + this.velocity * this.speed * 2,
    };
  }
}
