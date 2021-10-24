import { Renderable } from "../../../interfaces";
import Renderer from "../../../rendering/Renderer";
import {
  LEVEL_TEXTURE_FULL_WIDTH,
  LEVEL_TEXTURE_SCALE,
  PLAYFIELD_SCROLL_SPEED,
} from "../constants";
import PlayfieldElement from "./PlayfieldElement";

export default class PlayfieldManager implements Renderable {
  playfieldElement: PlayfieldElement;

  constructor() {
    this.playfieldElement = new PlayfieldElement();
  }

  render() {
    this.scroll();
    Renderer.render(this.playfieldElement);
  }

  scroll() {
    this.playfieldElement.texture_offset.x += PLAYFIELD_SCROLL_SPEED;
    // to show something when level texture ended and detect that event
    if (this.playfieldElement.texture_offset.x > LEVEL_TEXTURE_FULL_WIDTH) {
      this.playfieldElement.texture_offset.x =
        -this.playfieldElement.size.width * LEVEL_TEXTURE_SCALE;
      this.onLevelEnded();
    }
  }

  onLevelEnded() {}
}
