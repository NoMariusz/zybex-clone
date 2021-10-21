import { Layout, Layouts } from "../interfaces";
import KeyListener from "../../controls/KeyListener";
import { KEYS } from "../../controls/constants";
import Board from "./Board";
import PlayerUi from "./PlayerUi";
import Player from "./player/Player";
import { Players } from "./constants";

export default class Game implements Layout {
  changeLayout: (layName: Layouts) => void;
  keyListener: KeyListener;

  //items
  board: Board;

  p1Ui: PlayerUi;
  p2Ui: PlayerUi | null = null;

  p1: Player;
  p2: Player | null = null;

  constructor(
    changeLayout: (layName: Layouts) => void,
    keyListener: KeyListener
  ) {
    this.changeLayout = (s) => changeLayout(s);
    this.keyListener = keyListener;

    this.initPlayers();

    this.board = new Board(this.players);
  }

  public get players(): Player[] {
    return this.p2 != null ? [this.p1, this.p2] : [this.p1];
  }

  initPlayers() {
    this.p1 = new Player(Players.PlayerOne);
    this.p1Ui = new PlayerUi(this.p1);
  }

  render() {
    this.board.render();
    this.p1Ui.render();
    this.p1.render();
    this.p2Ui?.render();
    this.p2?.render();
  }

  handleKeys(key: string) {
    if (key == KEYS.ACTION) {
      this.changeLayout(Layouts.MENU);
    }
  }

  onShow() {
    this.keyListener.subscribedFunc = (k) => this.handleKeys(k);
  }
  onHide() {}
}
