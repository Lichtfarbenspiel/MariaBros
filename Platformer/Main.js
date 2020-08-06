"use strict";
var Platformer;
(function (Platformer) {
    var f = FudgeCore;
    window.addEventListener("load", initialize);
    Platformer.muteSound = false;
    Platformer.muteSoundBG = false;
    let cmpCamera;
    let camRestrictionX = [-1.5, 19];
    let canvas;
    let viewport;
    function initialize(_event) {
        document.getElementById("startBtn").addEventListener("click", start);
        document.getElementById("settingsBtn").addEventListener("click", Platformer.displaySetings);
        document.getElementById("settingsBtn").addEventListener("click", Platformer.displaySetings);
        document.getElementById("toggleMusic").addEventListener("click", Platformer.toggleMusic);
        document.getElementById("toggleSound").addEventListener("click", Platformer.toggleSound);
        document.getElementById("instructionsBtn").addEventListener("click", Platformer.displayInstructions);
        document.getElementById("backBtn").addEventListener("click", Platformer.displayMenu);
        document.getElementById("restartBtn").addEventListener("click", restart);
        document.getElementById("backMenuBtn").addEventListener("click", Platformer.displayMenu);
        // document.addEventListener(ƒ.KEYBOARD_CODE.ESC, displayMenu);
    }
    function start() {
        Platformer.Sound.initialize();
        Platformer.displayGame();
        canvas = document.querySelector("canvas.game");
        Platformer.game = new f.Node("Game");
        Platformer.collectables = new f.Node("Collectables");
        Platformer.level = Platformer.createPlatform();
        Platformer.objects = Platformer.addObjects();
        Platformer.enemies = Platformer.createEnemies();
        Platformer.game.appendChild(Platformer.level);
        Platformer.game.appendChild(Platformer.objects);
        Platformer.game.appendChild(Platformer.enemies);
        Platformer.game.appendChild(Platformer.collectables);
        Platformer.createBackground();
        Platformer.createPlayer();
        cmpCamera = new f.ComponentCamera();
        cmpCamera.pivot.translateZ(10);
        cmpCamera.pivot.lookAt(f.Vector3.ZERO());
        cmpCamera.backgroundColor = f.Color.CSS("aliceblue");
        viewport = new f.Viewport();
        viewport.initialize("Viewport", Platformer.game, cmpCamera, canvas);
        viewport.draw();
        viewport.addEventListener("\u0192keydown" /* DOWN */, hndKeyboard);
        viewport.activateKeyboardEvent("\u0192keydown" /* DOWN */, true);
        viewport.setFocus(true);
        f.Loop.addEventListener("loopFrame" /* LOOP_FRAME */, update);
        f.Loop.start(f.LOOP_MODE.TIME_GAME, 60);
    }
    function update(_event) {
        processInput();
        camMovement();
        viewport.draw();
    }
    function hndKeyboard(_event) {
        if (!Platformer.player.isDead) {
            if (_event.code == ƒ.KEYBOARD_CODE.SPACE)
                Platformer.player.act(Platformer.ACTION.JUMP);
        }
    }
    function processInput() {
        if (!Platformer.player.isDead) {
            if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.A, ƒ.KEYBOARD_CODE.ARROW_LEFT])) {
                Platformer.player.dir = Platformer.DIRECTION.LEFT;
                Platformer.player.act(Platformer.ACTION.WALK, Platformer.DIRECTION.LEFT);
            }
            else if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.D, ƒ.KEYBOARD_CODE.ARROW_RIGHT])) {
                Platformer.player.dir = Platformer.DIRECTION.RIGHT;
                Platformer.player.act(Platformer.ACTION.WALK, Platformer.DIRECTION.RIGHT);
            }
            else if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.SPACE])) {
                Platformer.player.act(Platformer.ACTION.JUMP, Platformer.player.dir);
            }
            else if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.F])) {
                Platformer.player.act(Platformer.ACTION.ATTACK, Platformer.player.dir);
            }
            else if (!Platformer.player.isDead || Platformer.player.isIdle)
                Platformer.player.act(Platformer.ACTION.IDLE);
        }
    }
    function camMovement() {
        let playerPos = Platformer.player.cmpTransform.local.translation;
        let camPos = cmpCamera.pivot.translation;
        if (playerPos.x > camRestrictionX[0] && playerPos.x < camRestrictionX[1]) {
            camPos = new f.Vector3(playerPos.x, -1, cmpCamera.pivot.translation.z);
        }
        cmpCamera.pivot.translation = camPos;
    }
    function gameOver() {
        f.Loop.stop();
        document.getElementById("game").style.display = "none";
        document.getElementById("endScreen").style.display = "initial";
        document.getElementById("win").style.display = "none";
        document.getElementById("gameover").style.display = "initial";
        document.getElementById("health").innerHTML = "HP: " + Platformer.player.healthPoints;
        document.getElementById("score").innerHTML = "SCORE: " + Platformer.player.wealth;
        canvas.style.visibility = "0.5";
    }
    Platformer.gameOver = gameOver;
    function gameFinished() {
        f.Loop.stop();
        document.getElementById("game").style.display = "none";
        document.getElementById("endScreen").style.display = "initial";
        document.getElementById("win").style.display = "initial";
        document.getElementById("gameover").style.display = "none";
        document.getElementById("health").innerHTML = "HP: " + Platformer.player.healthPoints;
        document.getElementById("score").innerHTML = "SCORE: " + Platformer.player.wealth;
        canvas.style.visibility = "0.5";
    }
    Platformer.gameFinished = gameFinished;
    function restart() {
        location.reload();
    }
})(Platformer || (Platformer = {}));
//# sourceMappingURL=Main.js.map