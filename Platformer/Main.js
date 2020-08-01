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
        let playerImg = document.querySelector("img.player");
        let spritesheet = fAid.createSpriteSheet("Player", playerImg);
        Platformer.Player.generateSprites(spritesheet);
        Platformer.game = new f.Node("Game");
        player = new Platformer.Player("Player 1", 0.15, 0.15);
        Platformer.level = createPlatform();
        createBackground();
        Platformer.game.appendChild(Platformer.level);
        Platformer.game.appendChild(player);
        // game.appendChild(background);
        cmpCamera = new f.ComponentCamera();
        cmpCamera.pivot.translateZ(30);
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
    function camMovement() {
        let playerPos = player.cmpTransform.local.translation;
        cmpCamera.pivot.translation = new f.Vector3(playerPos.x, playerPos.y + 0.5, cmpCamera.pivot.translation.z);
    }
    // create Environment
    function createBackground() {
        let width = 6;
        let texture = new f.TextureImage();
        let bgImg = document.querySelector("img.background");
        for (let i = 0; i < width; i++) {
            texture.image = bgImg;
            let bg = new Platformer.Background(i, texture);
            bg.cmpTransform.local.scaleY(3 * 2);
            bg.cmpTransform.local.scaleX(3 * 2);
            Platformer.game.appendChild(bg);
        }
    }
    function createPlatform() {
        let level = new f.Node("Level");
        let platform = new Platformer.Platform();
        platform.cmpTransform.local.scaleY(0.2);
        platform.cmpTransform.local.translateY(-3);
        level.appendChild(platform);
        platform = new Platformer.Platform();
        platform.cmpTransform.local.translateY(-0.6);
        platform.cmpTransform.local.translateX(-3.5);
        platform.cmpTransform.local.scaleY(1);
        platform.cmpTransform.local.scaleX(2);
        level.appendChild(platform);
        platform = new Platformer.Platform();
        platform.cmpTransform.local.translateY(-2);
        platform.cmpTransform.local.translateX(-5.3);
        platform.cmpTransform.local.scaleY(0.5);
        platform.cmpTransform.local.scaleX(1);
        level.appendChild(platform);
        platform = new Platformer.Platform();
        platform.cmpTransform.local.translateY(-1.6);
        platform.cmpTransform.local.translateX(0);
        platform.cmpTransform.local.scaleY(0.5);
        platform.cmpTransform.local.scaleX(5);
        level.appendChild(platform);
        platform = new Platformer.Platform();
        platform.cmpTransform.local.translateY(-1.6);
        platform.cmpTransform.local.translateX(6);
        platform.cmpTransform.local.scaleY(0.5);
        platform.cmpTransform.local.scaleX(5);
        level.appendChild(platform);
        platform = new Platformer.Platform();
        platform.cmpTransform.local.translateY(-1);
        platform.cmpTransform.local.translateX(6);
        platform.cmpTransform.local.scaleY(1);
        platform.cmpTransform.local.scaleX(1);
        level.appendChild(platform);
        platform = new Platformer.Platform();
        platform.cmpTransform.local.translateY(-1.3);
        platform.cmpTransform.local.translateX(5.35);
        platform.cmpTransform.local.scaleY(0.3);
        platform.cmpTransform.local.scaleX(0.3);
        level.appendChild(platform);
        platform = new Platformer.Platform();
        platform.cmpTransform.local.translateX(8);
        platform.cmpTransform.local.translateY(-0.6);
        platform.cmpTransform.local.scaleY(0.3);
        platform.cmpTransform.local.scaleX(0.3);
        level.appendChild(platform);
        platform = new Platformer.Platform();
        platform.cmpTransform.local.translateY(-1.6);
        platform.cmpTransform.local.translateX(9.5);
        platform.cmpTransform.local.scaleY(0.3);
        platform.cmpTransform.local.scaleX(0.3);
        level.appendChild(platform);
        platform = new Platformer.Platform();
        platform.cmpTransform.local.translateY(-1.6);
        platform.cmpTransform.local.translateX(11);
        platform.cmpTransform.local.scaleY(0.3);
        platform.cmpTransform.local.scaleX(0.3);
        level.appendChild(platform);
        platform = new Platformer.Platform();
        platform.cmpTransform.local.translateX(10);
        platform.cmpTransform.local.translateY(-0.3);
        platform.cmpTransform.local.scaleY(0.2);
        platform.cmpTransform.local.scaleX(2);
        level.appendChild(platform);
        platform = new Platformer.Platform();
        platform.cmpTransform.local.translateY(-1.6);
        platform.cmpTransform.local.translateX(14);
        platform.cmpTransform.local.scaleY(1);
        platform.cmpTransform.local.scaleX(4);
        level.appendChild(platform);
        platform = new Platformer.Platform();
        platform.cmpTransform.local.translateY(-1.1);
        platform.cmpTransform.local.translateX(17);
        platform.cmpTransform.local.scaleY(0.5);
        platform.cmpTransform.local.scaleX(2);
        level.appendChild(platform);
        platform = new Platformer.Platform();
        platform.cmpTransform.local.translateY(-0.6);
        platform.cmpTransform.local.translateX(20);
        platform.cmpTransform.local.scaleY(0.5);
        platform.cmpTransform.local.scaleX(2);
        level.appendChild(platform);
        platform = new Platformer.Platform();
        platform.cmpTransform.local.translateY(-2.2);
        platform.cmpTransform.local.translateX(18);
        platform.cmpTransform.local.scaleY(0.4);
        platform.cmpTransform.local.scaleX(4);
        level.appendChild(platform);
        platform = new Platformer.Platform();
        platform.cmpTransform.local.translateY(-1.6);
        platform.cmpTransform.local.translateX(26);
        platform.cmpTransform.local.scaleY(0.5);
        platform.cmpTransform.local.scaleX(7.29);
        level.appendChild(platform);
        return level;
    }
})(Platformer || (Platformer = {}));
//# sourceMappingURL=Main.js.map