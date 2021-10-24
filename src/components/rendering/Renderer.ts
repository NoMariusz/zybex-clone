import { CANVAS_HEIGHT, CANVAS_WIDTH } from "../../constants";
import { CanvasElement } from "./interfaces";
import RendererImage from "./RendererImage";

import menuSprite from "../../../static/gfx/menu.png";
import screensSprite from "../../../static/gfx/screens_sprite.png";
import gameSprite from "../../../static/gfx/game_sprite.png";
import levelSprite from "../../../static/gfx/level_sprite.png";

const images: RendererImage[] = [
  new RendererImage("menu_sprite", menuSprite),
  new RendererImage("screens_sprite", screensSprite),
  new RendererImage("game_sprite", gameSprite),
  new RendererImage("level_sprite", levelSprite),
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
    if ("texture_size" in target) {
      this.drawWithScale(target);
    } else {
      this.draw(target);
    }

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
      target.size.width,
      target.size.height,
      target.position.x,
      target.position.y,
      target.size.width,
      target.size.height
    );
  }

  drawWithScale(target: CanvasElement) {
    const image = images.find((i) => i.name == target.texture);

    this.context.drawImage(
      image.image,
      target.texture_offset.x,
      target.texture_offset.y,
      target.texture_size.width,
      target.texture_size.height,
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
