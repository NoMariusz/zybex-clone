import { Sound, SOUNDS_PATH } from "./constants";

class SoundPlayer {
    private activeAudios: HTMLAudioElement[] = [];

    play(sound: Sound, looped = false) {
        const audio = this.makeAudio(sound);
        audio.loop = looped;

        audio.oncanplaythrough = () => {
            audio.play();
        };
        audio.onended = () => {
            this.removeAudio(audio);
        };

        this.activeAudios.push(audio);

        return audio;
    }

    cancel(audio: HTMLAudioElement) {
        audio.pause();
        this.removeAudio(audio);
    }

    clearAllSounds() {
        for (const audio of this.activeAudios) {
            audio.pause();
        }
        this.activeAudios = [];
    }

    private makeAudio(sound: Sound) {
        return new Audio(SOUNDS_PATH + sound);
    }

    private removeAudio(audio: HTMLAudioElement) {
        const i = this.activeAudios.findIndex((e) => e == audio);
        this.activeAudios.splice(i, 1);
    }
}

export default new SoundPlayer();
