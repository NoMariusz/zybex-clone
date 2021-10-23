import { CANVAS_WIDTH } from "../../../constants";
import { Renderable } from "../../interfaces";
import { KEYS } from "../../controls/constants";
import Renderer from "../../rendering/Renderer";
import {
  BOTTOM_ANIM_MAX_OFFSET,
  BOTTOM_ANIM_STEP,
  BOTTOM_ANIM_MIN_OFFSET,
  FOCUS_ANIM_MS,
} from "./constants";
import BottomPanelEl from "./layout_items/BottomPanelElement";
import MultiPlayerIco from "./layout_items/MultiPlayerIco";
import PlayerAvatar from "./layout_items/PlayerAvatar";
import SinglePlayerIco from "./layout_items/SinglePlayerIco";
import StartIco from "./layout_items/StartIco";
import STartIco from "./layout_items/StartIco";

export default class BottomPanel implements Renderable {
  elementOffset: number;
  focusInterval: NodeJS.Timer;

  startGameCallback: () => void;

  // elements
  avatar1: PlayerAvatar;
  avatar2: PlayerAvatar;
  singleIco: SinglePlayerIco;
  multiIco: MultiPlayerIco;
  startIco: STartIco;

  selectedItem: BottomPanelEl;

  constructor(startGameCallback: () => void) {
    this.startGameCallback = startGameCallback;
    this.avatar1 = new PlayerAvatar();
    this.avatar2 = new PlayerAvatar();
    this.singleIco = new SinglePlayerIco();
    this.multiIco = new MultiPlayerIco();
    this.startIco = new StartIco();

    this.avatar2.flip = true;
    this.avatar2.changeColor();
    this.selectElement(this.multiIco);
  }

  public get canvasElements(): BottomPanelEl[] {
    return [
      this.avatar1,
      this.singleIco,
      this.startIco,
      this.multiIco,
      this.avatar2,
    ];
  }

  render() {
    this.animTick();
    for (const item of this.canvasElements) {
      Renderer.render(item);
    }
  }

  clear() {
    clearInterval(this.focusInterval);
  }

  // changing menu page animation

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
    const middlePos = CANVAS_WIDTH / 2 - 37;
    for (let idx = 0; idx < elemsCount; idx++) {
      const element = this.canvasElements[idx];
      const sign = Math.sign(idx - middleIdx);
      const maxPos = middlePos + BOTTOM_ANIM_MAX_OFFSET * (idx - middleIdx);
      const actualPos = middlePos + this.elementOffset * middleIdx * sign;
      element.position.x =
        sign < 0 ? Math.max(maxPos, actualPos) : Math.min(maxPos, actualPos);
    }

    // increment elements offset
    this.elementOffset += BOTTOM_ANIM_STEP;
  }

  // focusing elements in menu

  loadFocusInterval() {
    clearInterval(this.focusInterval);

    let focusVal = true;
    this.focusInterval = setInterval(() => {
      this.selectedItem.changeFocus(focusVal);
      focusVal = !focusVal;
    }, FOCUS_ANIM_MS);
  }

  selectElement(newEl: BottomPanelEl) {
    this.selectedItem?.endFocus();
    this.selectedItem = newEl;
    this.selectedItem.startFocus();
    this.loadFocusInterval();
  }

  // handling move focus

  handleKeys(key: string) {
    switch (key) {
      case KEYS.LEFT:
        this.moveFocus(-1);
        break;
      case KEYS.RIGHT:
        this.moveFocus(1);
        break;
      case KEYS.ACTION:
        this.handleSelect();
      default:
        break;
    }
  }

  moveFocus(velocity: number) {
    const elIdx = this.canvasElements.indexOf(this.selectedItem);
    let newIdx = elIdx + velocity;
    if (newIdx < 0) {
      newIdx = this.canvasElements.length - 1;
    }
    if (newIdx >= this.canvasElements.length) {
      newIdx = 0;
    }

    this.selectElement(this.canvasElements[newIdx]);
  }

  // selecting menu elements

  handleSelect() {
    if (this.selectedItem instanceof MultiPlayerIco) {
      this.singleIco.unselect();
      this.multiIco.select();
    } else if (this.selectedItem instanceof SinglePlayerIco) {
      this.singleIco.select();
      this.multiIco.unselect();
    } else if (this.selectedItem instanceof PlayerAvatar) {
      this.selectedItem.changeColor();
    } else if (this.selectedItem instanceof StartIco) {
      this.startGameCallback();
    }
  }
}
