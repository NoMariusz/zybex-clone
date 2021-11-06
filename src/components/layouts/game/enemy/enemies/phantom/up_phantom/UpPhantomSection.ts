import DownPhantomSection from "../down_phantom/DownPhantomSection";

export default class UpPhantomSection extends DownPhantomSection {
    startMoving() {
        this.velocity = { y: -1, x: 0 };
        this.moving = true;
    }

    changeVelocity() {
        if (this.velocity.y == 0) {
            this.velocity = {
                y: -1,
                x: 0,
            };
        } else {
            this.velocity = {
                y: 0,
                x: 1,
            };
        }
    }
}
