import { Renderable } from "../interfaces";
import Menu from "./menu/Menu";

export interface Layout extends Renderable {
    changeLayout(layName: string): void;
    onShow(): void;
    onHide(): void;
}

export interface Layouts {
    menu: Menu;
}
