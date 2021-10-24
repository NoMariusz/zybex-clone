import { Layout, Layouts } from "../interfaces";
import KeyListener from "../../controls/KeyListener";
import { Keys } from "../../controls/constants";
import Board from "./board/Board";
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

    this.player = new Player(() => this.gameOver());
    this.playerUi = new PlayerUi(this.player, 1);
    this.player2Ui = new PlayerUi(new Player(), 2);

    this.board = new Board(this.player);
  }

  render() {
    this.board.render();
    this.playerUi.render();
    this.player2Ui.render();
    this.player.render();
  }

  handleKeys(key: string) {
    if (key == Keys.ACTION) {
      this.gameOver();
    }
  }

  onShow() {
    this.keyListener.subscribedFunc = (k) => this.handleKeys(k);
    this.player.avatar.loadColor();
  }
  onHide() {
    this.player.animator.clearAnims();
  }

  gameOver() {
    console.log("Game Over");
    this.changeLayout(Layouts.MENU);
  }
}
