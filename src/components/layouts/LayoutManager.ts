import KeyListener from "../controls/KeyListener";
import { Renderable } from "../interfaces";
import { Layout, Layouts } from "./interfaces";
import Menu from "./menu/Menu";

export default class LayoutManager implements Renderable {
  /* Manage swaps between layouts and controlling them */

  layouts: Layouts;
  activeLayout: Layout;
  keyListener: KeyListener;

  constructor() {
    this.keyListener = new KeyListener();

    this.layouts = {
      menu: new Menu(
        (name: string) => this.changeLayout(name),
        this.keyListener
      ),
    };

    this.activeLayout = this.layouts.menu;
    this.activeLayout.onShow();
  }

  render() {
    this.activeLayout.render();
  }

  changeLayout(name: string) {}
}
