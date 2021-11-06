import { BOARD_HEIGHT } from "../../../constants";

export enum ButterflyParts {
    Up,
    Down,
}

export const BUTTERFLY_Y_FUNCTIONS: {
    [key in ButterflyParts]: (x: number) => number;
} = {
    [ButterflyParts.Up]: (x: number) =>
        ((Math.sin(-x) * 2 - 1) * -1 * BOARD_HEIGHT) / 8 + BOARD_HEIGHT / 2,
    [ButterflyParts.Down]: (x: number) =>
        ((Math.sin(-x) * 2 - 1) * BOARD_HEIGHT) / 8 + BOARD_HEIGHT / 2,
};
