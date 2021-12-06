import { Position, Renderable } from "../../../interfaces";
import Renderer from "../../../rendering/Renderer";
import { areEqual, clampValue } from "../../../utils";
import {
    BOARD_WIDTH,
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
    player: Player;

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

    constructor(player: Player) {
        this.stage = Stages.Waiting;
        this.shipElement = new ShipElement();
        this.player = player;
    }

    startScene(endCallback: () => void) {
        this.endCallback = endCallback;

        this.player.lock();
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
                this.movePlayer();
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

    private movePlayer() {
        this.player.position = {
            ...this.player.position,
            x: this.player.position.x + PLAYER_SHIP_SPEED,
        };
    }

    private positionPlayer() {
        for (const coordinate of ["x", "y"] as const) {
            const offset = clampValue(
                PLAYER_WAITING_FOR_SHIP_POSITION[coordinate] -
                    this.player.position[coordinate],
                -PLAYER_SHIP_SPEED,
                PLAYER_SHIP_SPEED
            );
            this.player.position = {
                ...this.player.position,
                [coordinate]: this.player.position[coordinate] + offset,
            };
        }
    }

    private checkStage() {
        switch (this.stage) {
            case Stages.PositionPlayer:
                if (
                    areEqual(
                        this.player.position,
                        PLAYER_WAITING_FOR_SHIP_POSITION
                    )
                ) {
                    this.stage = Stages.MovingShip;
                }
                break;
            case Stages.MovingShip:
                if (this.shipElement.position.x > this.player.position.x) {
                    this.stage = Stages.MovingBoth;
                }
                break;
            case Stages.MovingBoth:
                if (this.player.position.x > BOARD_WIDTH + 100) {
                    this.stage = Stages.Ended;
                    this.endCallback();
                }
                break;
            default:
                break;
        }
    }
}
