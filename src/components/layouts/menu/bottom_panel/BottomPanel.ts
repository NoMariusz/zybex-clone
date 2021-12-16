import { CANVAS_WIDTH } from "../../../../constants";
import { Renderable } from "../../../interfaces";
import { Keys } from "../../../controls/constants";
import Renderer from "../../../rendering/Renderer";
import {
    BOTTOM_ANIM_MAX_OFFSET,
    BOTTOM_ANIM_STEP,
    FOCUS_ANIM_MS,
} from "../constants";
import BottomPanelEl from "./items/BottomPanelElement";
import MultiPlayerIco from "./items/MultiPlayerIco";
import PlayerAvatar from "./items/PlayerAvatar";
import SinglePlayerIco from "./items/SinglePlayerIco";
import StartIco from "./items/StartIco";
import STartIco from "./items/StartIco";

export default class BottomPanel implements Renderable {
    elementOffset: number;
    focusInterval: NodeJS.Timer;

    startGameCallback: () => void;

    // elements
    avatar1: PlayerAvatar;
    avatar2: PlayerAvatar;
    singleIco: SinglePlayerIco;
    multiIco: MultiPlayerIco;
    startIco: STartIco;

    selectedItem: BottomPanelEl;

    // constants values for playing animation
    middlePos: number;
    middleIdx: number;

    animWork: boolean = false;

    get canvasElements(): BottomPanelEl[] {
        return [
            this.avatar1,
            this.singleIco,
            this.startIco,
            this.multiIco,
            this.avatar2,
        ];
    }
    constructor(startGameCallback: () => void) {
        this.startGameCallback = startGameCallback;
        this.avatar1 = new PlayerAvatar();
        this.avatar2 = new PlayerAvatar();
        this.singleIco = new SinglePlayerIco();
        this.multiIco = new MultiPlayerIco();
        this.startIco = new StartIco();

        this.avatar2.useFlippedTexture();
        this.avatar2.changeColor();
        this.selectElement(this.multiIco);

        this.initAnimConsts();
        this.playInitAnim();
    }

    initAnimConsts() {
        const elemsCount = this.canvasElements.length;
        this.middleIdx = (elemsCount / 2) | 0;
        this.middlePos = CANVAS_WIDTH / 2 - this.startIco.size.width / 2;
        // init consts for elements
        for (let idx = 0; idx < this.canvasElements.length; idx++) {
            const element = this.canvasElements[idx];
            element.maxPos =
                this.middlePos +
                BOTTOM_ANIM_MAX_OFFSET * (idx - this.middleIdx);
            element.velocity = Math.sign(idx - this.middleIdx);
        }
    }

    // lifecycle

    render() {
        this.animTick();
        for (const item of this.canvasElements) {
            Renderer.render(item);
        }
    }

    clear() {
        clearInterval(this.focusInterval);
    }

    // changing menu page animation

    playInitAnim() {
        //start interval playing animation
        for (const element of this.canvasElements) {
            element.position.x = this.middlePos;
        }
        this.animWork = true;
    }

    animTick() {
        // end loop if should
        if (!this.animWork) {
            return;
        }

        // chage elements position
        for (let idx = 0; idx < this.canvasElements.length; idx++) {
            const element = this.canvasElements[idx];
            // const actualPos = this.middlePos + this.elementOffset * this.middleIdx * sign;
            const step = element.velocity * BOTTOM_ANIM_STEP;
            element.position.x =
                element.velocity < 0
                    ? Math.max(element.maxPos, step + element.position.x)
                    : Math.min(element.maxPos, step + element.position.x);
        }

        // check if should stop anim
        this.animWork = !this.canvasElements.every(
            (e) => e.maxPos == e.position.x
        );
    }

    // focusing elements in menu

    loadFocusInterval() {
        clearInterval(this.focusInterval);

        let focusVal = true;
        this.focusInterval = setInterval(() => {
            this.selectedItem.changeFocus(focusVal);
            focusVal = !focusVal;
        }, FOCUS_ANIM_MS);
    }

    selectElement(newEl: BottomPanelEl) {
        this.selectedItem?.endFocus();
        this.selectedItem = newEl;
        this.selectedItem.startFocus();
        this.loadFocusInterval();
    }

    // handling move focus

    handleKeys(key: string) {
        switch (key) {
            case Keys.LEFT:
                this.moveFocus(-1);
                break;
            case Keys.RIGHT:
                this.moveFocus(1);
                break;
            case Keys.ACTION:
                this.handleSelect();
            default:
                break;
        }
    }

    moveFocus(velocity: number) {
        const elIdx = this.canvasElements.indexOf(this.selectedItem);
        let newIdx = elIdx + velocity;
        if (newIdx < 0) {
            newIdx = this.canvasElements.length - 1;
        }
        if (newIdx >= this.canvasElements.length) {
            newIdx = 0;
        }

        this.selectElement(this.canvasElements[newIdx]);
    }

    // selecting menu elements

    handleSelect() {
        if (this.selectedItem instanceof MultiPlayerIco) {
            this.singleIco.unselect();
            this.multiIco.select();
        } else if (this.selectedItem instanceof SinglePlayerIco) {
            this.singleIco.select();
            this.multiIco.unselect();
        } else if (this.selectedItem instanceof PlayerAvatar) {
            this.selectedItem.changeColor();
        } else if (this.selectedItem instanceof StartIco) {
            this.startGameCallback();
        }
    }
}
