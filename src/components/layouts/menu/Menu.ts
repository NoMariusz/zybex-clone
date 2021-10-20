import KeyListener from "../../controls/KeyListener";
import Renderer from "../../rendering/Renderer";
import { Layout, Layouts } from "../interfaces";
import BottomPanel from "./BottomPanel";
import { CHANGE_LAYOUT_TIMEOUT } from "./constants";
import MenuBackground from "./layout_items/MenuBackground";

export default class Menu implements Layout {
  changeLayout: (layName: Layouts) => void;
  keyListener: KeyListener;

  actualPage: number;
  changePageInterval: NodeJS.Timer;

  // sub items
  bottomPanel: BottomPanel;
  // items
  background: MenuBackground;

  constructor(
    changeLayout: (layName: Layouts) => void,
    keyListener: KeyListener
  ) {
    this.changeLayout = changeLayout;
    this.keyListener = keyListener;
    this.actualPage = 0;

    this.bottomPanel = new BottomPanel(() => this.startGame());
    this.background = new MenuBackground();
  }

  render() {
    Renderer.render(this.background);
    this.bottomPanel.render();
  }

  onShow() {
    this.keyListener.subscribedFunc = (e: string) =>
      this.bottomPanel.handleKeys(e);
    this.actualPage = 0;
    this.changePageInterval = setInterval(
      () => this.changePage(),
      CHANGE_LAYOUT_TIMEOUT
    );
    this.changePage();
  }

  onHide() {
    clearInterval(this.changePageInterval);
    this.bottomPanel.clear();
  }

  changePage() {
    this.actualPage = this.actualPage == 0 ? 1 : 0;
    this.background.changeTexture(this.actualPage);
    this.bottomPanel.playInitAnim();
  }

  startGame() {
    this.changeLayout(Layouts.LEVEL_ANNOUNCE)
  }
}
