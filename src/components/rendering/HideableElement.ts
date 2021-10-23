import { Position, Size } from "../interfaces";
import { CanvasElement } from "./interfaces";

export default class HideableElement implements CanvasElement {
  position: Position;
  texture_offset: Position;
  texture = "";
  size: Size;
  flip: boolean;

  baseHeight: number;

  constructor(h: number) {
    this.baseHeight = h;
  }

  hide() {
    this.size.height = 0;
  }

  show() {
    this.size.height = this.baseHeight;
  }
}
