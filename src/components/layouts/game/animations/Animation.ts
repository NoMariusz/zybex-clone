import { CanvasElement } from "../../../rendering/interfaces";
import { AnimationName } from "./animationNames";

export default interface Animation {
  name: AnimationName;
  active: boolean;

  tickIntervalTime: number;

  interval: NodeJS.Timer;

  element: CanvasElement;

  tick: () => void;
  start: () => void;
  end: () => void;
}
