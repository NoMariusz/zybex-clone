import { Focusable } from "../../../interfaces";
import { CanvasElement } from "../../../rendering/interfaces";
import BottomPanelEl from "./BottomPanelElement";

export default class StartIco extends BottomPanelEl implements Focusable {
  texture_offset = {
    x: 1261,
    y: 900,
  };

  size = {
    width: 75,
    height: 60,
  };

  startFocus() {
    this.texture_offset.y = 800;
  }
  endFocus() {
    this.texture_offset.y = 900;
  }

  changeFocus(value: boolean) {}
}
