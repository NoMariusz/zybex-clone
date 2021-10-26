import { Collidable, Position, Renderable, Size } from "../../../interfaces";
import { CanvasElement } from "../../../rendering/interfaces";
import Renderer from "../../../rendering/Renderer";
import { BASE_ENEMY_HP } from "../constants";
import { translateToCanvasPos } from "../utils";

export default abstract class EnemySection implements Renderable, Collidable {
  /* Describe one part of enemy or enemy group  */

  element: CanvasElement;
  private hp: number;
  live: boolean;
  canClear: boolean;
  private _position: Position;
  size: Size;

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
  }

  render() {
    Renderer.render(this.element);
  }

  abstract move(): void;
}
