import { Position, Renderable } from "../../../interfaces";
import Renderer from "../../../rendering/Renderer";
import { areEqual, clampValue } from "../../../utils";
import {
    BOARD_WIDTH,
    PlayerType,
    PLAYER_SHIP_DISTANCE,
    PLAYER_SHIP_SPEED,
    PLAYER_WAITING_FOR_SHIP_POSITION,
} from "../constants";
import Player from "../player/Player";
import { translateToCanvasPos } from "../utils";
import ShipElement from "./ShipElement";

enum Stages {
    Waiting,
    PositionPlayer,
    MovingShip,
    MovingBoth,
    Ended,
}

export default class ShipManager implements Renderable {
    shipElement: ShipElement;
    endCallback: () => void;
    stage: Stages;

    private players: Player[];

    private _position: Position = {
        x: 0,
        y: 0,
    };
    get position() {
        return this._position;
    }
    set position(newPos: Position) {
        this._position = newPos;
        this.shipElement.position = translateToCanvasPos(newPos);
    }

    constructor() {
        this.stage = Stages.Waiting;
        this.shipElement = new ShipElement();
    }

    startScene(players: Player[], endCallback: () => void) {
        this.players = players;
        this.endCallback = endCallback;

        for (const player of this.players) {
            player.lock();
        }
        this.position = {
            x: 0,
            y: PLAYER_WAITING_FOR_SHIP_POSITION.y - PLAYER_SHIP_DISTANCE,
        };

        // wait for player to stop shooting
        setTimeout(() => {
            this.stage = Stages.PositionPlayer;
        }, 1500);
    }

    render() {
        switch (this.stage) {
            case Stages.PositionPlayer:
                this.positionPlayer();
                break;
            case Stages.MovingShip:
                this.moveShip();
                Renderer.render(this.shipElement);
                break;
            case Stages.MovingBoth:
                this.moveShip();
                this.movePlayers();
                Renderer.render(this.shipElement);
                break;
            default:
                break;
        }
        this.checkStage();
    }

    private moveShip() {
        this.position = {
            ...this.position,
            x: this.position.x + PLAYER_SHIP_SPEED,
        };
    }

    private movePlayers() {
        for (const player of this.players) {
            player.position = {
                ...player.position,
                x: player.position.x + PLAYER_SHIP_SPEED,
            };
        }
    }

    private positionPlayer() {
        for (const player of this.players) {
            for (const coordinate of ["x", "y"] as const) {
                const offset = clampValue(
                    this.waitingPositionForPlayerType(player)[coordinate] -
                        player.position[coordinate],
                    -PLAYER_SHIP_SPEED,
                    PLAYER_SHIP_SPEED
                );
                player.position = {
                    ...player.position,
                    [coordinate]: player.position[coordinate] + offset,
                };
            }
        }
    }

    private checkStage() {
        switch (this.stage) {
            case Stages.PositionPlayer:
                if (
                    this.players.every((player) =>
                        areEqual(
                            player.position,
                            this.waitingPositionForPlayerType(player)
                        )
                    )
                ) {
                    this.stage = Stages.MovingShip;
                }
                break;
            case Stages.MovingShip:
                if (this.shipElement.position.x > this.players[0].position.x) {
                    this.stage = Stages.MovingBoth;
                }
                break;
            case Stages.MovingBoth:
                if (this.players[0].position.x > BOARD_WIDTH + 100) {
                    this.stage = Stages.Ended;
                    this.endCallback();
                }
                break;
            default:
                break;
        }
    }

    private waitingPositionForPlayerType(player: Player) {
        return {
            ...PLAYER_WAITING_FOR_SHIP_POSITION,
            x:
                PLAYER_WAITING_FOR_SHIP_POSITION.x +
                player.playerType * player.avatar.size.width,
        };
    }
}
