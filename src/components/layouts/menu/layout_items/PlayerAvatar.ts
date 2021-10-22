import { Focusable } from "../../../interfaces";
import { AVATAR_COLORS } from "../../../../constants";
import BottomPanelEl from "./BottomPanelElement";

export default class PlayerAvatar extends BottomPanelEl implements Focusable {
  texture_offset = {
    x: 1261,
    y: AVATAR_COLORS.red,
  };

  lastColor: AVATAR_COLORS = AVATAR_COLORS.red;

  size = {
    width: 67,
    height: 70,
  };

  changeFocus(value: boolean) {
    this.texture_offset.y = value ? AVATAR_COLORS.white : this.lastColor;
  }

  startFocus() {}
  endFocus() {
    this.texture_offset.y = this.lastColor;
  }

  changeColor() {
    let color: number;
    let setNext = false;
    // loop in every color
    for (const col in AVATAR_COLORS) {
      // if in previous loop find color, then set color to actual iteration color
      if (Number(col) && setNext && Number(col) != AVATAR_COLORS.white) {
        color = Number(col);
        setNext = false;
        break;
      }
      // search for actual color
      if (col == this.lastColor.toString()) {
        setNext = true;
      }
    }
    // if find color was last at iteration, then set to red
    if (setNext) {
      color = AVATAR_COLORS.red;
    }

    this.texture_offset.y = color;
    this.lastColor = color;
  }
}
