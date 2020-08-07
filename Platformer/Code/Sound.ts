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
               
                if (_id == "collect") 
                    Sound.sounds[_id].volume = 0.7;
                {
                    Sound.sounds[_id].volume = 0.5;
                }
                Sound.sounds[_id].play();

                
            }
        }

        public static playMusic(): void {
            if (!muteSoundBG) {
                Sound.sounds["music"].loop = true;
                Sound.sounds["music"].volume = 0.08;
                Sound.sounds["music"].play();
            }
        }

        public static stopMusic(): void {
            Sound.sounds["music"].muted = true;
        }
    }
}