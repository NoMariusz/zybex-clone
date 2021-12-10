import { PlayerAction, PlayerType } from "../layouts/game/constants";

export enum Keys {
    LEFT = "a",
    RIGHT = "d",
    UP = "w",
    DOWN = "s",
    ACTION = " ",
    LEFT2 = "ArrowLeft",
    RIGHT2 = "ArrowRight",
    UP2 = "ArrowUp",
    DOWN2 = "ArrowDown",
    ACTION2 = "Control",
}

export const PLAYER_TYPE_TO_SUPPORTED_KEYS: { [key in PlayerType]: Keys[] } = {
    [PlayerType.Player1]: [Keys.LEFT, Keys.RIGHT, Keys.UP, Keys.DOWN],
    [PlayerType.Player2]: [Keys.LEFT2, Keys.RIGHT2, Keys.UP2, Keys.DOWN2],
};

export const KEY_TO_PLAYER_ACTION: { [key in Keys]: PlayerAction } = {
    [Keys.UP]: PlayerAction.MoveUp,
    [Keys.DOWN]: PlayerAction.MoveDown,
    [Keys.RIGHT]: PlayerAction.MoveRight,
    [Keys.LEFT]: PlayerAction.MoveLeft,
    [Keys.ACTION]: PlayerAction.ChangeWeapon,
    [Keys.UP2]: PlayerAction.MoveUp,
    [Keys.DOWN2]: PlayerAction.MoveDown,
    [Keys.RIGHT2]: PlayerAction.MoveRight,
    [Keys.LEFT2]: PlayerAction.MoveLeft,
    [Keys.ACTION2]: PlayerAction.ChangeWeapon,
};
