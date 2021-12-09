import { AnimationName } from "../../../animating/animationNames";
import Animator from "../../../animating/Animator";
import SafeAnimatorsStore from "../../../animating/utils/SafeAnimatorsStore";
import { Renderable } from "../../../interfaces";
import CanvasElement from "../../../rendering/CanvasElement";
import Renderer from "../../../rendering/Renderer";
import MainBackground from "./elements/MainBackground";
import Subtitle1Element from "./elements/Subtitle1Element";
import Subtitle2Element from "./elements/Subtitle2Element";
import Subtitle3Element from "./elements/Subtitle3Element";

export default class MainPage extends SafeAnimatorsStore implements Renderable {
    static subtitlesData = [
        { class: Subtitle1Element, anim: AnimationName.MenuSubtitle1 },
        { class: Subtitle2Element, anim: AnimationName.MenuSubtitle2 },
        { class: Subtitle3Element, anim: AnimationName.MenuSubtitle3 },
    ];

    background: MainBackground;
    subtitles: CanvasElement[] = [];

    constructor() {
        super();
        this.background = new MainBackground();
        this.initSubtitleElements();
    }

    render() {
        Renderer.render(this.background);
        for (const subtitleElement of this.subtitles) {
            Renderer.render(subtitleElement);
        }
    }

    private initSubtitleElements() {
        for (const { class: subClass, anim } of MainPage.subtitlesData) {
            this.initSubtitleElement(subClass, anim);
        }
    }

    private initSubtitleElement(
        subtitleClass: new () => CanvasElement,
        animation: AnimationName
    ) {
        const element = new subtitleClass();
        this.subtitles.push(element);

        const animator = new Animator(element);
        animator.startAnim(animation);
        this.animators.push(animator);
    }
}
