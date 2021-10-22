import { Layout, Layouts } from "../interfaces";
import KeyListener from "../../controls/KeyListener";
import { KEYS } from "../../controls/constants";
import Board from "./Board";
import PlayerUi from "./ui/PlayerUi";
import Player from "./player/Player";
import { Players } from "./constants";
import Player2Ui from "./ui/Player2Ui";

export default class Game implements Layout {
  changeLayout: (layName: Layouts) => void;
  keyListener: KeyListener;

  //items
  board: Board;

  playerUi: PlayerUi;
  player2Ui: Player2Ui;

  player: Player;

  constructor(
    changeLayout: (layName: Layouts) => void,
    keyListener: KeyListener
  ) {
    this.changeLayout = (s) => changeLayout(s);
    this.keyListener = keyListener;

    this.player = new Player(Players.PlayerOne);
    this.playerUi = new PlayerUi(this.player);
    this.player2Ui = new Player2Ui(this.player);

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
