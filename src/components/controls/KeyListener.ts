import { Keys } from "./constants";
import pressedKeys from "./pressedKeys";

export default class KeyListener {
  subscribedFunc: (key: string) => void;

  constructor() {
    const root: HTMLBodyElement = document.querySelector("body");
    root.onkeyup = (e) => {
      this.subscribedFunc(e.key);
      this.changeKeyState(e.key, false);
    };
    root.onkeydown = (e) => {
      this.changeKeyState(e.key, true);
    };
  }

  changeKeyState(key: string, pressed: boolean) {
    // check if pressed key should be monitored
    if (
      key == Keys.LEFT ||
      key == Keys.RIGHT ||
      key == Keys.UP ||
      key == Keys.DOWN
    ) {
      pressedKeys[key] = pressed;
    }
  }
}
