import { CANVAS_HEIGHT, CANVAS_WIDTH, TEXTURE_SCALE } from "../../constants";
import { CanvasElement } from "./interfaces";
import RendererImage from "./RendererImage";

import menuSprite from "../../../static/gfx/menu.png";
import screensSprite from "../../../static/gfx/screens_sprite.png";

const images: RendererImage[] = [
  new RendererImage("menu_sprite", menuSprite),
  new RendererImage("screens_sprite", screensSprite),
];

class Renderer {
  /* Handle all rendering images at canvas */

  canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D;

  constructor() {
    this.canvas = document.querySelector("#root");
    this.context = this.canvas.getContext("2d");
  }

  render(target: CanvasElement) {
    // save basic context so we can restore it after transforms
    this.context.save();

    // made effects
    if (target.flip) {
      this.flip(target);
    }

    // draw
    this.draw(target);

    if (target.flip) {
      // restore context to base configuration
      this.context.restore();
    }
  }

  clear() {
    this.context.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  }

  draw(target: CanvasElement) {
    const image = images.find((i) => i.name == target.texture);

    this.context.drawImage(
      image.image,
      target.texture_offset.x,
      target.texture_offset.y,
      target.size.width / TEXTURE_SCALE,
      target.size.height / TEXTURE_SCALE,
      target.position.x,
      target.position.y,
      target.size.width,
      target.size.height
    );
  }

  flip(target: CanvasElement) {
    // move context to right, so after scale target be in apropriate pos
    const translateAxis = (target.position.x + target.size.width / 2) * 2;
    this.context.translate(translateAxis, 0);

    // scale to have mirror effect
    this.context.scale(-1, 1);
  }
}

export default new Renderer();
