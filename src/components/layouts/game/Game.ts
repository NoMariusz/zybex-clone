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
import { PlayerType } from "./constants";

export default class Game extends LayoutBaseImplementation {
    board: Board;
    enemyManager: EnemyManager;
    shipManager: ShipManager;
    background: Background;

    playerUi: PlayerUi;
    player2Ui: PlayerUi;

    player: Player;
    player2: Player | undefined;

    players: Player[];

    get alivePlayers() {
        return this.players.filter((p) => p.alive);
    }

    get livePlayersCount() {
        return this.alivePlayers.length;
    }

    constructor(
        changeLayout: (layName: Layouts) => void,
        keyListener: KeyListener
    ) {
        super(changeLayout, keyListener);

        this.background = new Background();
    }

    private init() {
        this.player = new Player(() => this.onPlayerDie(), PlayerType.Player1);
        this.playerUi = new PlayerUi(this.player);
        this.players = [this.player];
        this.initPlayer2();

        this.enemyManager = new EnemyManager(this.players, () =>
            this.onAllEnemiesDies()
        );
        this.board = new Board(this.players, this.enemyManager);
        this.shipManager = new ShipManager();
    }

    private initPlayer2() {
        // dummy player2 only for use to ui
        let playerForUi = new Player(() => true, PlayerType.Player2);

        if (store.twoPlayersMode) {
            this.player2 = new Player(
                () => this.onPlayerDie(),
                PlayerType.Player2
            );
            playerForUi = this.player2;
            this.players.push(this.player2);
        }

        this.player2Ui = new PlayerUi(playerForUi);
    }

    // lifecycle

    render() {
        this.board.render();
        this.enemyManager.render();
        for (const player of this.players) {
            player.render();
        }
        this.background.render();
        this.playerUi.render();
        this.player2Ui.render();
        this.shipManager.render();
    }

    handleKeys(key: string) {
        if (key == Keys.ACTION) {
            this.player.changeWeapon();
        }
        if (key == Keys.ACTION2) {
            this.player2?.changeWeapon();
        }
    }

    onShow() {
        this.init();

        this.keyListener.subscribedFunc = (k) => this.handleKeys(k);
        // start game only for alive players
        for (const player of this.alivePlayers) {
            player.onStart();
        }
        this.enemyManager.start();
    }
    onHide() {
        for (const player of this.players) {
            player.clear();
        }
        this.enemyManager.clear();
    }

    // game events

    onPlayerDie() {
        /* @return: boolean - if player die end with gameover */
        if (this.livePlayersCount == 0) {
            this.gameOver();
            return true;
        }
        return false;
    }

    gameOver() {
        console.log("Game Over, changing layout...");
        this.saveValuesToStore();
        this.changeLayout(Layouts.GAME_OVER);
    }

    onAllEnemiesDies() {
        // playing end level animation and change layout
        this.shipManager.startScene(this.alivePlayers, () =>
            this.levelCompleted()
        );

        SoundPlayer.play(Sound.LevelEnd);
    }

    levelCompleted() {
        console.log("Level Completed, changing layout");
        this.saveValuesToStore();
        this.changeLayout(Layouts.LEVEL_SUMMARY);
    }

    // utils

    saveValuesToStore() {
        // save level statistics
        store.levelScores = this.players.map((p) => p.points);
        store.livesAfterLevel = this.players.map((p) => p.lives);
        // save weapons for the next level
        for (const player of this.players) {
            player.weaponManager.saveWeapons();
        }
    }
}
