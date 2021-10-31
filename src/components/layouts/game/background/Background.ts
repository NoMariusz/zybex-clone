import { Position, Renderable } from "../../../interfaces";
import Renderer from "../../../rendering/Renderer";
import { BOARD_HEIGHT, BOARD_Y, BOTTOM_UI_POS_Y } from "../constants";
import BackgroundElement from "./BackgroundElement";

export default class Background implements Renderable {
  /* render blank black area to hide all elements from board which are outside board area */
  element: BackgroundElement;

  constructor() {
    this.element = new BackgroundElement();
  }

  render() {
    this.element.position.y = 0;
    Renderer.render(this.element);
    this.element.position.y = BOARD_Y + BOARD_HEIGHT;
    Renderer.render(this.element);
  }
}
