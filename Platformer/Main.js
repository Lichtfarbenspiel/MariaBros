"use strict";
var Platformer;
(function (Platformer) {
    var f = FudgeCore;
    var fAid = FudgeAid;
    window.addEventListener("load", test);
    let player;
    let cmpCamera;
    function test() {
        let canvas = document.querySelector("canvas");
        let crc2 = canvas.getContext("2d");
        let img = document.querySelector("img");
        let spritesheet = fAid.createSpriteSheet("Player", img);
        Platformer.Player.generateSprites(spritesheet);
        Platformer.game = new f.Node("Game");
        player = new Platformer.Player("Player 1", 0.15, 0.15);
        Platformer.level = createLevel();
        Platformer.game.appendChild(Platformer.level);
        Platformer.game.appendChild(player);
        cmpCamera = new f.ComponentCamera();
        cmpCamera.pivot.translateZ(6);
        cmpCamera.pivot.lookAt(f.Vector3.ZERO());
        cmpCamera.backgroundColor = f.Color.CSS("lightgreen");
        let viewport = new f.Viewport();
        viewport.initialize("Viewport", Platformer.game, cmpCamera, canvas);
        viewport.draw();
        viewport.addEventListener("\u0192keydown" /* DOWN */, hndKeyboard);
        viewport.activateKeyboardEvent("\u0192keydown" /* DOWN */, true);
        viewport.setFocus(true);
        f.Loop.addEventListener("loopFrame" /* LOOP_FRAME */, update);
        f.Loop.start(f.LOOP_MODE.TIME_GAME, 60);
        function update(_event) {
            processInput();
            camMovement();
            viewport.draw();
            crc2.strokeRect(-1, -1, canvas.width / 2, canvas.height + 2);
            crc2.strokeRect(-1, canvas.height / 2, canvas.width + 2, canvas.height);
        }
    }
    function hndKeyboard(_event) {
        if (_event.code == ƒ.KEYBOARD_CODE.SPACE)
            player.act(Platformer.ACTION.JUMP);
    }
    function processInput() {
        if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.A, ƒ.KEYBOARD_CODE.ARROW_LEFT])) {
            player.dir = Platformer.DIRECTION.LEFT;
            player.act(Platformer.ACTION.WALK, Platformer.DIRECTION.LEFT);
        }
        else if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.D, ƒ.KEYBOARD_CODE.ARROW_RIGHT])) {
            player.dir = Platformer.DIRECTION.RIGHT;
            player.act(Platformer.ACTION.WALK, Platformer.DIRECTION.RIGHT);
        }
        else if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.SPACE])) {
            player.act(Platformer.ACTION.JUMP, player.dir);
        }
        else if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.F])) {
            player.act(Platformer.ACTION.ATTACK, player.dir);
        }
        else if (!player.isDead || player.isIdle)
            player.act(Platformer.ACTION.IDLE);
    }
    function createLevel() {
        let level = new f.Node("Level");
        let platform = new Platformer.Platform();
        platform.cmpTransform.local.scaleY(0.2);
        platform.cmpTransform.local.translateY(-2);
        level.appendChild(platform);
        platform = new Platformer.Platform();
        platform.cmpTransform.local.translateX(2);
        platform.cmpTransform.local.translateY(0.1);
        platform.cmpTransform.local.scaleY(0.2);
        platform.cmpTransform.local.scaleX(2);
        level.appendChild(platform);
        platform = new Platformer.Platform();
        platform.cmpTransform.local.translateY(-1.6);
        platform.cmpTransform.local.translateX(-2.2);
        platform.cmpTransform.local.scaleY(0.5);
        platform.cmpTransform.local.scaleX(10);
        level.appendChild(platform);
        platform = new Platformer.Platform();
        platform.cmpTransform.local.translateY(-1.6);
        platform.cmpTransform.local.translateX(9);
        platform.cmpTransform.local.scaleY(0.5);
        platform.cmpTransform.local.scaleX(10);
        level.appendChild(platform);
        return level;
    }
    function camMovement() {
        let playerPos = player.cmpTransform.local.translation;
        cmpCamera.pivot.translation = new f.Vector3(playerPos.x, playerPos.y + 0.5, cmpCamera.pivot.translation.z);
    }
})(Platformer || (Platformer = {}));
//# sourceMappingURL=Main.js.map