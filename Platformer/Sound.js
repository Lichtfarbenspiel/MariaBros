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
                if (_id == "collect")
                    Sound.sounds[_id].volume = 0.7;
                {
                    Sound.sounds[_id].volume = 0.5;
                }
                Sound.sounds[_id].play();
            }
        }
        static playMusic() {
            if (!Platformer.muteSoundBG) {
                Sound.sounds["music"].loop = true;
                Sound.sounds["music"].volume = 0.08;
                Sound.sounds["music"].play();
            }
        }
        static stopMusic() {
            Sound.sounds["music"].muted = true;
        }
    }
    Sound.sounds = {};
    Platformer.Sound = Sound;
})(Platformer || (Platformer = {}));
//# sourceMappingURL=Sound.js.map