import { Layout, Layouts } from "../interfaces";
import KeyListener from "../../controls/KeyListener";
import { Keys } from "../../controls/constants";
import Board from "./board/Board";
import PlayerUi from "./ui/PlayerUi";
import Player from "./player/Player";
import EnemyManager from "./enemy/EnemyManager";
import Background from "./background/Background";
import ShipManager from "./ship/ShipManager";
import store from "../store";
import LayoutBaseImplementation from "../LayoutBaseImplementation";
import SoundPlayer from "../../sounds/SoundPlayer";
import { Sound } from "../../sounds/constants";

export default class Game extends LayoutBaseImplementation {
    board: Board;
    enemyManager: EnemyManager;
    shipManager: ShipManager;
    background: Background;

    playerUi: PlayerUi;
    player2Ui: PlayerUi;

    player: Player;

    constructor(
        changeLayout: (layName: Layouts) => void,
        keyListener: KeyListener
    ) {
        super(changeLayout, keyListener);

        this.background = new Background();

        this.init();
    }

    init() {
        this.player = new Player(() => this.gameOver());
        this.playerUi = new PlayerUi(this.player, 1);
        this.player2Ui = new PlayerUi(new Player(), 2);

        this.enemyManager = new EnemyManager(this.player, () =>
            this.onAllEnemiesDies()
        );
        this.board = new Board(this.player, this.enemyManager);
        this.shipManager = new ShipManager(this.player);
    }

    render() {
        this.board.render();
        this.enemyManager.render();
        this.player.render();
        this.background.render();
        this.playerUi.render();
        this.player2Ui.render();
        this.shipManager.render();
    }

    handleKeys(key: string) {
        if (key == Keys.ACTION) {
            this.player.changeWeapon();
        }
    }

    onShow() {
        this.init();

        this.keyListener.subscribedFunc = (k) => this.handleKeys(k);
        this.player.onStart();
        this.enemyManager.start();
    }
    onHide() {
        this.player.clear();
        this.enemyManager.clear();
    }

    gameOver() {
        console.log("Game Over, changing layout");
        this.saveValuesToStore();
        this.changeLayout(Layouts.GAME_OVER);
    }

    onAllEnemiesDies() {
        // playing end level animation and change layout
        this.shipManager.startScene(() => this.levelCompleted());

        SoundPlayer.play(Sound.LevelEnd);
    }

    levelCompleted() {
        console.log("Level Completed, changing layout");
        this.saveValuesToStore();
        this.changeLayout(Layouts.LEVEL_SUMMARY);
    }

    saveValuesToStore() {
        // save level statistics
        store.levelScore = this.player.points;
        store.livesAfterLevel = this.player.lives;
        // save weapons for the next level
        this.player.weaponManager.saveWeapons();
    }
}
