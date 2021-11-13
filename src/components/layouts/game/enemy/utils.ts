import { Position } from "../../../interfaces";
import Enemy from "./Enemy";

export enum DoubleRowEnemyParts {
    Up,
    Down,
}

// prepare simple implementation of enemy to get type singature and make proper interface for enemy
class EnemyImpl extends Enemy {
    initSections() {}

    calcInitPosition(pos: Position, idx: number) {
        return {
            x: 0,
            y: 0,
        };
    }
}

type EnemyClass = typeof EnemyImpl;

export interface EnemyInterface extends EnemyClass {}
