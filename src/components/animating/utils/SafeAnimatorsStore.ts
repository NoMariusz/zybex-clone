import Animator from "../Animator";

export default abstract class SafeAnimatorsStore {
    animators: Animator[] = [];

    clear() {
        for (const animator of this.animators) {
            animator.clearAnims();
        }
        this.animators = [];
    }
}
