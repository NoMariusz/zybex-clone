import { Position } from "../../../../interfaces";
import { CanvasElement } from "../../../../rendering/interfaces";
import { AnimationName } from "../animationNames";
import FrameAnimation from "../FrameAnimation";

export default class DeathAnimation extends FrameAnimation {
  active = false;
  name = AnimationName.PlayerDeath;

  tickIntervalTime = 200;
  interval: NodeJS.Timer;

  element: CanvasElement;
  baseTexture: Position;

  textures: Position[] = [
    {
      x: 600,
      y: 500,
    },
    {
      x: 700,
      y: 500,
    },
    {
      x: 800,
      y: 500,
    },
    {
      x: 900,
      y: 500,
    },
    {
      x: 1000,
      y: 500,
    },
    {
      x: 1100,
      y: 500,
    },
    {
      x: 1200,
      y: 500,
    },
  ];
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
      return;
    }
    const tex = this.textures[this.actualTextureIdx];
    this.element.texture_offset = tex;
    this.actualTextureIdx++;
  }
}
