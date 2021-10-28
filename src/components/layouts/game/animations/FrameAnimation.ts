import { Position } from "../../../interfaces";
import { CanvasElement } from "../../../rendering/interfaces";
import Animation from "./Animation";
import { AnimationName } from "./animationNames";

export default abstract class FrameAnimation implements Animation {
  abstract name: AnimationName;
  abstract active: boolean;

  abstract tickIntervalTime: number;

  abstract interval: NodeJS.Timer;

  abstract element: CanvasElement;
  abstract textures: Position[];

  get animTime() {
    return this.tickIntervalTime * this.textures.length;
  }

  abstract tick(): void;
  abstract start(): void;
  abstract end(): void;
}
