namespace Platformer {

    export function displayMenu(): void {
        document.getElementById("menu").style.display = "initial";
        document.getElementById("startMenu").style.display = "initial";
        document.getElementById("settingsMenu").style.display = "none";
        document.getElementById("instructionsMenu").style.display = "none";

        document.getElementById("endScreen").style.display = "none";
        document.getElementById("win").style.display = "none";
        document.getElementById("gameover").style.display = "none";

        document.getElementById("backBtn").style.display = "none";

        document.getElementById("game").style.display = "none";
        
        Sound.stopMusic();       
    }

    export function displaySetings(): void {
        document.getElementById("startMenu").style.display = "none";
        document.getElementById("settingsMenu").style.display = "initial";
        document.getElementById("instructionsMenu").style.display = "none";
        document.getElementById("backBtn").style.display = "initial";

        document.getElementById("endScreen").style.display = "none";
        document.getElementById("win").style.display = "none";
        document.getElementById("gameover").style.display = "none";
        
        document.getElementById("game").style.display = "none";
    }
    

    export function displayInstructions(): void {
        document.getElementById("startMenu").style.display = "none";
        document.getElementById("settingsMenu").style.display = "none";
        document.getElementById("instructionsMenu").style.display = "initial";
        document.getElementById("backBtn").style.display = "initial";

        document.getElementById("endScreen").style.display = "none";
        document.getElementById("win").style.display = "none";
        document.getElementById("gameover").style.display = "none";

        document.getElementById("game").style.display = "none";
    }

    export function displayGame(): void {
        document.getElementById("menu").style.display = "none";
        document.getElementById("game").style.display = "initial";

        document.getElementById("endScreen").style.display = "none";
        document.getElementById("win").style.display = "none";
        document.getElementById("gameover").style.display = "none";

        Sound.playMusic();
    }

    export function toggleMusic(): void {
        if (!muteSoundBG) {
            muteSoundBG = true;
            document.getElementById("toggleMusic").innerHTML = "MUSIK AUS";
            Sound.stopMusic();
        }
        else {
            muteSoundBG = false;
            document.getElementById("toggleMusic").innerHTML = "MUSIK AN";
            Sound.playMusic();
        }
    }

    export function toggleSound(): void {
        if (!muteSound) {
            muteSound = true;
            document.getElementById("toggleSound").innerHTML = "SOUNDS AUS";
        }
        else {
            muteSound = false;
            document.getElementById("toggleSound").innerHTML = "SOUNDS AN";
        }
    }
}