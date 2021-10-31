import { Collidable, Position, Renderable, Size } from "../../../interfaces";
import { CanvasElement } from "../../../rendering/interfaces";
import Renderer from "../../../rendering/Renderer";
import { BOARD_SCROLL_SPEED } from "../constants";
import { translateToCanvasPos } from "../utils";
import PickupElement from "./PickupElement";
import { Pickups, PICKUP_DATA } from "./pickupsData";

export default class PickUp implements Renderable, Collidable {
  element: PickupElement;
  private _position: Position;
  size: Size;
  type: Pickups;

  get position() {
    return this._position;
  }

  set position(val: Position) {
    this._position = val;
    this.element.position = translateToCanvasPos(this._position);
  }

  constructor(type: Pickups, position: Position) {
    this.type = type;
    this.element = new PickupElement();
    this.initStaticData();
    this.position = position;
  }

  render() {
    Renderer.render(this.element);
    this.move();
  }

  initStaticData() {
    const data = PICKUP_DATA[this.type];
    this.element.texture_offset = data.texture_offset;
    this.size = data.size;
    this.element.size = data.size;
  }

  move() {
    this.position = {
      ...this.position,
      x: this.position.x - BOARD_SCROLL_SPEED,
    };
  }
}
