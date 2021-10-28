import { Position } from "../../../../interfaces";
import { CanvasElement } from "../../../../rendering/interfaces";
import { AnimationName } from "../animationNames";
import FrameAnimation from "../FrameAnimation";

export default class CoinIddleAnimation extends FrameAnimation {
  active = false;
  name = AnimationName.CoinIddle;

  tickIntervalTime = 200;
  interval: NodeJS.Timer;

  element: CanvasElement;
  baseTexture: Position;

  textures: Position[] = Array(8)
    .fill(null)
    .map((e, i) => ({ x: 75 * i, y: 700 }));
  actualTextureIdx = 0;

  constructor(element: CanvasElement) {
    super();
    this.element = element;
  }

  start() {
    this.baseTexture = this.element.texture_offset;
    this.actualTextureIdx = 0;
  }

  end() {
    this.element.texture_offset = this.baseTexture;
  }

  tick() {
    if (this.actualTextureIdx >= this.textures.length) {
      this.actualTextureIdx = 0;
    }
    const tex = this.textures[this.actualTextureIdx];
    this.element.texture_offset = tex;
    this.actualTextureIdx++;
  }
}
