import { Position } from "../../../../interfaces";
import { CanvasElement } from "../../../../rendering/interfaces";
import { AVATAR_COLORS } from "../../../../../constants";
import Animation from "../Animation";
import { AnimationName } from "../animationNames";

export default class ImmortalityAnimation implements Animation {
  active = false;
  name = AnimationName.Immortality;

  tickIntervalTime = 100;
  interval: NodeJS.Timer;

  element: CanvasElement;
  baseTexture: Position;

  colorQueue = [AVATAR_COLORS.red, AVATAR_COLORS.green, AVATAR_COLORS.blue];
  actualColorIdx = 0;

  constructor(element: CanvasElement) {
    this.element = element;
  }

  start() {
    this.baseTexture = this.element.texture_offset;
    this.actualColorIdx = 0;
  }

  end() {
    this.element.texture_offset = this.baseTexture;
  }

  tick() {
    const color = this.colorQueue[this.actualColorIdx];
    this.element.texture_offset.y = color;
    this.actualColorIdx++;
    if (this.actualColorIdx >= this.colorQueue.length) {
      this.actualColorIdx = 0;
    }
  }
}
