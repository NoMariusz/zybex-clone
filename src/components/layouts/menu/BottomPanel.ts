import { CANVAS_WIDTH } from "../../../constants";
import { Renderable } from "../../interfaces";
import { CanvasElement } from "../../rendering/interfaces";
import Renderer from "../../rendering/Renderer";
import {
  BOTTOM_ANIM_MAX_OFFSET,
  BOTTOM_ANIM_STEP,
  BOTTOM_ANIM_MIN_OFFSET,
} from "./constants";
import MultiPlayerIco from "./layout_items/MultiPlayerIco";
import PlayerAvatar from "./layout_items/PlayerAvatar";
import SinglePlayerIco from "./layout_items/SinglePlayerIco";
import StartIco from "./layout_items/StartIco";
import STartIco from "./layout_items/StartIco";

export default class BottomPanel implements Renderable {
  elementOffset: number;

  // items
  avatar1: PlayerAvatar;
  avatar2: PlayerAvatar;
  singleIco: SinglePlayerIco;
  multiIco: MultiPlayerIco;
  startIco: STartIco;

  constructor() {
    this.avatar1 = new PlayerAvatar();
    this.avatar2 = new PlayerAvatar();
    this.singleIco = new SinglePlayerIco();
    this.multiIco = new MultiPlayerIco();
    this.startIco = new StartIco();
  }

  public get canvasElements(): CanvasElement[] {
    return [
      this.avatar1,
      this.singleIco,
      this.startIco,
      this.multiIco,
      this.avatar2,
    ];
  }

  playInitAnim() {
    //start interval playing animation
    this.elementOffset = BOTTOM_ANIM_MIN_OFFSET;
  }

  animTick() {
    // end loop if should
    if (this.elementOffset >= BOTTOM_ANIM_MAX_OFFSET) {
      return;
    }

    // chage elements position
    const elemsCount = this.canvasElements.length;
    const middleIdx = elemsCount / 2 - 0.5;
    const middlePos = CANVAS_WIDTH / 2;
    for (let idx = 0; idx < elemsCount; idx++) {
      const element = this.canvasElements[idx];
      const sign = Math.sign(idx - middleIdx);
      const maxPos =
        middlePos + BOTTOM_ANIM_MAX_OFFSET * (idx - middleIdx);
      const actualPos = middlePos + this.elementOffset*middleIdx * sign;
      element.position.x =
        sign < 0 ? Math.max(maxPos, actualPos) : Math.min(maxPos, actualPos);
    }

    // increment elements offset
    this.elementOffset += BOTTOM_ANIM_STEP;
  }

  render() {
    this.animTick();
    for (const item of this.canvasElements) {
      Renderer.render(item);
    }
  }
}
