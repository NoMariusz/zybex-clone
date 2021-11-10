import { Keys } from "./constants";

const pressedKeys: { [key in Keys]?: boolean } = {
    [Keys.LEFT]: false,
    [Keys.RIGHT]: false,
    [Keys.UP]: false,
    [Keys.DOWN]: false,
};

export default pressedKeys;
