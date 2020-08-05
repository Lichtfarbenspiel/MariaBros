namespace Platformer {

    interface Sounds {
        [id: string]: HTMLAudioElement;
    }


    export class Sound {
        static sounds: Sounds = {};

        public static initialize(): void {
            let audioElements: NodeListOf<HTMLAudioElement> = document.querySelectorAll("audio");

            for (let audioElement of audioElements) {
                Sound.sounds[audioElement.id] = audioElement;
            }
        }

        public static play(_id: string): void {
            if (!muteSound) {
                Sound.sounds[_id].volume = 0.5;
                Sound.sounds[_id].play();
            }
        }

        public static playMusic(): void {
            if (!muteSoundBG) {
                Sound.sounds["backgroundSound"].loop = true;
                Sound.sounds["backgroundSound"].volume = 0.3;
                Sound.sounds["backgroundSound"].play();
            }
        }

        public static stopMusic(): void {
            Sound.sounds["backgroundSound"].muted = true;
        }
    }
}