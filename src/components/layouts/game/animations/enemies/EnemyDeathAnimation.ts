import { Position } from "../../../../interfaces";
import { CanvasElement } from "../../../../rendering/interfaces";
import { AnimationName } from "../animationNames";
import FrameAnimation from "../FrameAnimation";

export default class EnemyDeathAnimation extends FrameAnimation {
  active = false;
  name = AnimationName.EnemyDeath;

  tickIntervalTime = 150;
  interval: NodeJS.Timer;

  element: CanvasElement;
  baseTexture: Position;

  textures: Position[] = Array(5)
    .fill(null)
    .map((e, i) => ({ x: 75 * i, y: 800 }));
  actualTextureIdx = 0;

  constructor(element: CanvasElement) {
    super();
    this.element = element;
  }

  tick() {
    if (this.actualTextureIdx >= this.textures.length) {
      this.actualTextureIdx = 0;
      return;
    }
    const tex = this.textures[this.actualTextureIdx];
    this.element.texture_offset = tex;
    this.actualTextureIdx++;
  }

  end() {
    this.element.texture_offset = { x: -100, y: -100 };
  }
}
