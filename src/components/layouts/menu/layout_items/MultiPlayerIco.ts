import SinglePlayerIco from "./SinglePlayerIco";

export default class MultiPlayerIco extends SinglePlayerIco {
    texture_offset = {
        x: 1261,
        y: 600,
    };

    changeFocus(value: boolean) {
        this.texture_offset.y = value ? 700 : 600;
    }
}
