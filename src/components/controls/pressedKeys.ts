import { Keys } from "./constants";

const pressedKeys: { [key in Keys]: boolean } = {
    [Keys.LEFT]: false,
    [Keys.RIGHT]: false,
    [Keys.UP]: false,
    [Keys.DOWN]: false,
    [Keys.ACTION]: false,
    [Keys.LEFT2]: false,
    [Keys.RIGHT2]: false,
    [Keys.UP2]: false,
    [Keys.DOWN2]: false,
    [Keys.ACTION2]: false,
};

export default pressedKeys;
