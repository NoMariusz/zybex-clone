import KeyListener from "../controls/KeyListener";
import { Layout, Layouts } from "./interfaces";

export default class LayoutBaseImplementation implements Layout {
    changeLayout: (layName: Layouts) => void;
    keyListener: KeyListener;

    constructor(
        changeLayout: (layName: Layouts) => void,
        keyListener: KeyListener
    ) {
        this.changeLayout = changeLayout;
        this.keyListener = keyListener;
    }

    onShow() {}

    onHide() {}

    render() {}
}
