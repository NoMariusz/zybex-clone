import { Layout, Layouts } from "../interfaces";
import KeyListener from "../../controls/KeyListener";
import AnnounceBackground from "./AnnounceBackground";
import Renderer from "../../rendering/Renderer";
import { KEYS } from "../../controls/constants";

export default class LevelAnnounce implements Layout {
  changeLayout: (layName: Layouts) => void;
  keyListener: KeyListener;

  //items
  announceBackground: AnnounceBackground;

  constructor(
    changeLayout: (layName: Layouts) => void,
    keyListener: KeyListener
  ) {
    this.changeLayout = (s) => changeLayout(s);
    this.keyListener = keyListener;

    this.announceBackground = new AnnounceBackground();
  }

  render() {
    Renderer.render(this.announceBackground);
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
