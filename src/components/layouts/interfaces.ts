import KeyListener from "../controls/KeyListener";
import { Renderable } from "../interfaces";

export interface Layout extends Renderable {
    keyListener: KeyListener;
    changeLayout(layName: Layouts): void;
    onShow(): void;
    onHide(): void;
}

export enum Layouts {
    MENU,
    LEVEL_ANNOUNCE,
    GAME,
    LEVEL_SUMMARY,
    GAME_OVER,
    SAVE_SCORE,
}
