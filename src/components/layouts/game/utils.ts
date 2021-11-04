import { Position } from "../../interfaces";
import { BOARD_Y } from "./constants";

export const translateToCanvasPos = (boardPos: Position) => {
    return {
        x: boardPos.x,
        y: boardPos.y + BOARD_Y,
    };
};

export const randomEnum = <T>(anEnum: T): T[keyof T] => {
    const enumValues = Object.keys(anEnum)
        .map((n) => Number.parseInt(n))
        .filter((n) => !Number.isNaN(n)) as unknown as T[keyof T][];
    const randomIndex = Math.floor(Math.random() * enumValues.length);
    const randomEnumValue = enumValues[randomIndex];
    return randomEnumValue;
};

export abstract class SafeTimeoutable {
    timeouts: NodeJS.Timeout[] = [];

    makeSafeTimeout(fun: () => void, timeoutMs: number | undefined) {
        const t = setTimeout(() => {
            fun();
            const idx = this.timeouts.findIndex((timeout) => timeout == t);
            this.timeouts.splice(idx, 1);
        }, timeoutMs);
        this.timeouts.push(t);
    }

    clearTimeouts() {
        // clear not ended timeouts
        for (const timeout of this.timeouts) {
            clearTimeout(timeout);
        }
    }
}
