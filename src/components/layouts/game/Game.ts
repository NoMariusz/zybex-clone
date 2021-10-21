import { Layout, Layouts } from "../interfaces";
import KeyListener from "../../controls/KeyListener";
import Renderer from "../../rendering/Renderer";
import { KEYS } from "../../controls/constants";

export default class Game implements Layout {
  changeLayout: (layName: Layouts) => void;
  keyListener: KeyListener;

  //items

  constructor(
    changeLayout: (layName: Layouts) => void,
    keyListener: KeyListener
  ) {
    this.changeLayout = (s) => changeLayout(s);
    this.keyListener = keyListener;
  }

  render() {
    // Renderer.render();
  }

  handleKeys(key: string){
    if(key == KEYS.ACTION){
        this.changeLayout(Layouts.MENU)
    }
  }

  onShow() {
    this.keyListener.subscribedFunc = (k) => this.handleKeys(k)
  }
  onHide() {}
}
