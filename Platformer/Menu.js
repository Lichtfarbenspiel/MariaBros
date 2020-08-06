"use strict";
var Platformer;
(function (Platformer) {
    function displayMenu() {
        document.getElementById("menu").style.display = "initial";
        document.getElementById("startMenu").style.display = "initial";
        document.getElementById("settingsMenu").style.display = "none";
        document.getElementById("instructionsMenu").style.display = "none";
        document.getElementById("endScreen").style.display = "none";
        document.getElementById("win").style.display = "none";
        document.getElementById("gameover").style.display = "none";
        document.getElementById("backBtn").style.display = "none";
        document.getElementById("game").style.display = "none";
        Platformer.Sound.stopMusic();
    }
    Platformer.displayMenu = displayMenu;
    function displaySetings() {
        document.getElementById("startMenu").style.display = "none";
        document.getElementById("settingsMenu").style.display = "initial";
        document.getElementById("instructionsMenu").style.display = "none";
        document.getElementById("backBtn").style.display = "initial";
        document.getElementById("endScreen").style.display = "none";
        document.getElementById("win").style.display = "none";
        document.getElementById("gameover").style.display = "none";
        document.getElementById("game").style.display = "none";
    }
    Platformer.displaySetings = displaySetings;
    function displayInstructions() {
        document.getElementById("startMenu").style.display = "none";
        document.getElementById("settingsMenu").style.display = "none";
        document.getElementById("instructionsMenu").style.display = "initial";
        document.getElementById("backBtn").style.display = "initial";
        document.getElementById("endScreen").style.display = "none";
        document.getElementById("win").style.display = "none";
        document.getElementById("gameover").style.display = "none";
        document.getElementById("game").style.display = "none";
    }
    Platformer.displayInstructions = displayInstructions;
    function displayGame() {
        document.getElementById("menu").style.display = "none";
        document.getElementById("game").style.display = "initial";
        document.getElementById("endScreen").style.display = "none";
        document.getElementById("win").style.display = "none";
        document.getElementById("gameover").style.display = "none";
        Platformer.Sound.playMusic();
    }
    Platformer.displayGame = displayGame;
    function toggleMusic() {
        if (!Platformer.muteSoundBG) {
            Platformer.muteSoundBG = true;
            document.getElementById("toggleMusic").innerHTML = "MUSIK AUS";
            Platformer.Sound.stopMusic();
        }
        else {
            Platformer.muteSoundBG = false;
            document.getElementById("toggleMusic").innerHTML = "MUSIK AN";
            Platformer.Sound.playMusic();
        }
    }
    Platformer.toggleMusic = toggleMusic;
    function toggleSound() {
        if (!Platformer.muteSound) {
            Platformer.muteSound = true;
            document.getElementById("toggleSound").innerHTML = "SOUNDS AUS";
        }
        else {
            Platformer.muteSound = false;
            document.getElementById("toggleSound").innerHTML = "SOUNDS AN";
        }
    }
    Platformer.toggleSound = toggleSound;
})(Platformer || (Platformer = {}));
//# sourceMappingURL=Menu.js.map