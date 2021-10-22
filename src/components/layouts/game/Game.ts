import { Layout, Layouts } from "../interfaces";
import KeyListener from "../../controls/KeyListener";
import { KEYS } from "../../controls/constants";
import Board from "./Board";
import PlayerUi from "./ui/PlayerUi";
import Player from "./player/Player";

export default class Game implements Layout {
  changeLayout: (layName: Layouts) => void;
  keyListener: KeyListener;

  //items
  board: Board;

  playerUi: PlayerUi;
  player2Ui: PlayerUi;

  player: Player;

  constructor(
    changeLayout: (layName: Layouts) => void,
    keyListener: KeyListener
  ) {
    this.changeLayout = (s) => changeLayout(s);
    this.keyListener = keyListener;

    this.player = new Player();
    this.playerUi = new PlayerUi(this.player, 1);
    this.player2Ui = new PlayerUi(new Player(), 2);

    this.board = new Board(this.player);
  }

  render() {
    this.board.render();
    this.playerUi.render();
    this.player.render();
    this.player2Ui.render();
  }

  handleKeys(key: string) {
    if (key == KEYS.ACTION) {
      this.changeLayout(Layouts.MENU);
    }
  }

  onShow() {
    this.keyListener.subscribedFunc = (k) => this.handleKeys(k);
    this.player.avatar.loadColor();
  }
  onHide() {}
}
