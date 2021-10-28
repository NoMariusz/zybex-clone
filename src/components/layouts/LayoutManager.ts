import KeyListener from "../controls/KeyListener";
import { Renderable } from "../interfaces";
import { Layout, Layouts } from "./interfaces";
import LevelAnnounce from "./level_announce/LevelAnnounce";
import Menu from "./menu/Menu";
import Game from "./game/Game";

export default class LayoutManager implements Renderable {
  /* Manage swaps between layouts and controlling them */

  layouts: { [id: number]: Layout } = {};
  activeLayout: Layout;
  keyListener: KeyListener;

  constructor() {
    this.keyListener = new KeyListener();

    this.layouts = {
      [Layouts.MENU]: new Menu(
        (name: Layouts) => this.changeLayout(name),
        this.keyListener
      ),
      [Layouts.LEVEL_ANNOUNCE]: new LevelAnnounce(
        (name: Layouts) => this.changeLayout(name),
        this.keyListener
      ),
      [Layouts.GAME]: new Game(
        (name: Layouts) => this.changeLayout(name),
        this.keyListener
      ),
    };

    this.activeLayout = this.layouts[Layouts.MENU];
    this.activeLayout.onShow();
  }

  render() {
    this.activeLayout.render();
  }

  changeLayout(name: Layouts) {
    this.activeLayout.onHide();
    this.activeLayout = this.layouts[name];

    this.activeLayout.onShow();
  }
}
