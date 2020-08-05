"use strict";
var Platformer;
(function (Platformer) {
    class Sound {
        static initialize() {
            let audioElements = document.querySelectorAll("audio");
            for (let audioElement of audioElements) {
                Sound.sounds[audioElement.id] = audioElement;
            }
        }
        static play(_id) {
            if (!Platformer.muteSound) {
                Sound.sounds[_id].volume = 0.5;
                Sound.sounds[_id].play();
            }
        }
        static playMusic() {
            if (!Platformer.muteSoundBG) {
                Sound.sounds["backgroundSound"].loop = true;
                Sound.sounds["backgroundSound"].volume = 0.3;
                Sound.sounds["backgroundSound"].play();
            }
        }
        static stopMusic() {
            Sound.sounds["backgroundSound"].muted = true;
        }
    }
    Sound.sounds = {};
    Platformer.Sound = Sound;
})(Platformer || (Platformer = {}));
//# sourceMappingURL=Sound.js.map