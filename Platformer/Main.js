"use strict";
var Platformer;
(function (Platformer) {
    var f = FudgeCore;
    var fAid = FudgeAid;
    window.addEventListener("load", test);
    let player;
    let cmpCamera;
    function test() {
        let canvas = document.querySelector("canvas.game");
        let stats = document.querySelector("canvas.stats");
        Platformer.game = new f.Node("Game");
        Platformer.collectables = new f.Node("Collectables");
        Platformer.level = createPlatform();
        Platformer.objects = addObjects();
        Platformer.enemies = createEnemies();
        Platformer.game.appendChild(Platformer.level);
        Platformer.game.appendChild(Platformer.objects);
        Platformer.game.appendChild(Platformer.enemies);
        Platformer.game.appendChild(Platformer.collectables);
        createBackground();
        createPlayer();
        cmpCamera = new f.ComponentCamera();
        cmpCamera.pivot.translateZ(6);
        cmpCamera.pivot.lookAt(f.Vector3.ZERO());
        cmpCamera.backgroundColor = f.Color.CSS("aliceblue");
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
        }
    }
    function hndKeyboard(_event) {
        if (_event.code == ƒ.KEYBOARD_CODE.SPACE)
            player.act(Platformer.ACTION.JUMP);
    }
    function processInput() {
        if (!player.isDead) {
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
    }
    function camMovement() {
        let playerPos = player.cmpTransform.local.translation;
        cmpCamera.pivot.translation = new f.Vector3(playerPos.x, playerPos.y + 0.5, cmpCamera.pivot.translation.z);
    }
    function displayStats() {
    }
    // setup Game
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
    function createPlayer() {
        let playerImg = document.querySelector("img.player");
        let spritesheet = fAid.createSpriteSheet("Player", playerImg);
        Platformer.Player.generateSprites(spritesheet);
        player = new Platformer.Player("Player", 0.15, 0.15, new f.Vector2(8, 5));
        Platformer.game.appendChild(player);
    }
    function createEnemies() {
        let enemies = new f.Node("Enemies");
        let enemyIMG = document.querySelector("img.enemy");
        let sprite = fAid.createSpriteSheet("Enemy", enemyIMG);
        let enemy = new Platformer.Enemy("Frog", Platformer.level.getChild(6), 1.5, 1.5, new f.Vector2(0.2, 2), Platformer.ENEMY.FROG, sprite);
        enemies.appendChild(enemy);
        return enemies;
    }
    function createPlatform() {
        let level = new f.Node("Level");
        level.appendChild(new Platformer.Platform(-5, -1.8, 0, Platformer.TYPE.GROUND, 2, 2, Platformer.COLLECTABLE.COIN_GOLD));
        level.appendChild(new Platformer.Platform(-5, -2.8, 0, Platformer.TYPE.MIDDLEGROUND, 2));
        level.appendChild(new Platformer.Platform(-5, -3.8, 0, Platformer.TYPE.UNDERGROUND, 2));
        level.appendChild(new Platformer.Platform(-3.5, -1.85, -0.1, Platformer.TYPE.WATER, 2));
        level.appendChild(new Platformer.Platform(-3.5, -2.85, -0.1, Platformer.TYPE.UNDERWATER, 2));
        level.appendChild(new Platformer.Platform(-3.5, -3.85, -0.1, Platformer.TYPE.UNDERWATER, 2));
        level.appendChild(new Platformer.Platform(-1, -1.8, 0, Platformer.TYPE.GROUND, 4, 4, Platformer.COLLECTABLE.COIN_GOLD));
        level.appendChild(new Platformer.Platform(-1, -2.8, 0, Platformer.TYPE.MIDDLEGROUND, 4));
        level.appendChild(new Platformer.Platform(-1, -3.8, 0, Platformer.TYPE.UNDERGROUND, 4));
        level.appendChild(new Platformer.Platform(2.6, -0.7, 0, Platformer.TYPE.FLOATING, 2));
        level.appendChild(new Platformer.Platform(2, -1.85, -0.1, Platformer.TYPE.WATER, 3.5));
        level.appendChild(new Platformer.Platform(2, -2.85, -0.1, Platformer.TYPE.UNDERWATER, 3.5));
        level.appendChild(new Platformer.Platform(2, -3.85, -0.1, Platformer.TYPE.UNDERWATER, 3.5));
        level.appendChild(new Platformer.Platform(6.5, -1.8, 0, Platformer.TYPE.GROUND, 6));
        level.appendChild(new Platformer.Platform(6.5, -2.8, 0, Platformer.TYPE.UNDERGROUND, 6));
        level.appendChild(new Platformer.Platform(6.5, -2.9, -0.1, Platformer.TYPE.UNDERWATER, 6));
        level.appendChild(new Platformer.Platform(6.5, -3.9, -0.1, Platformer.TYPE.UNDERWATER, 6));
        level.appendChild(new Platformer.Platform(12, -1, 0, Platformer.TYPE.GROUND, 6));
        level.appendChild(new Platformer.Platform(12, -2, 0, Platformer.TYPE.UNDERGROUND, 6));
        level.appendChild(new Platformer.Platform(12, -2.9, -0.1, Platformer.TYPE.UNDERWATER, 6));
        level.appendChild(new Platformer.Platform(12, -3.9, -0.1, Platformer.TYPE.UNDERWATER, 6));
        level.appendChild(new Platformer.Platform(17.5, -1.2, -0.1, Platformer.TYPE.FLOATING, 2));
        level.appendChild(new Platformer.Platform(17, -1.9, -0.1, Platformer.TYPE.WATER, 5));
        level.appendChild(new Platformer.Platform(17, -2.9, -0.1, Platformer.TYPE.UNDERWATER, 5));
        level.appendChild(new Platformer.Platform(17, -3.9, -0.1, Platformer.TYPE.UNDERWATER, 5));
        level.appendChild(new Platformer.Platform(21, -1.8, 0, Platformer.TYPE.GROUND, 4));
        level.appendChild(new Platformer.Platform(21, -2.8, 0, Platformer.TYPE.MIDDLEGROUND, 4));
        level.appendChild(new Platformer.Platform(21, -3.8, 0, Platformer.TYPE.UNDERGROUND, 4));
        level.appendChild(new Platformer.Platform(21, -3.9, -0.1, Platformer.TYPE.UNDERWATER, 4));
        level.appendChild(new Platformer.Platform(24.5, -2.4, 0, Platformer.TYPE.GROUND, 4));
        level.appendChild(new Platformer.Platform(24.5, -3.4, 0, Platformer.TYPE.MIDDLEGROUND, 4));
        level.appendChild(new Platformer.Platform(28, -1.8, 0, Platformer.TYPE.GROUND, 4));
        level.appendChild(new Platformer.Platform(28, -2.8, 0, Platformer.TYPE.MIDDLEGROUND, 4));
        level.appendChild(new Platformer.Platform(28, -3.8, 0, Platformer.TYPE.MIDDLEGROUND, 4));
        return level;
    }
    function addObjects() {
        let objects = new f.Node("Objects");
        objects.appendChild(new Platformer.Object("Baum1", -5, -1.1, -0.1, 1.5, 1.5, Platformer.OBJECT.TREE_2));
        objects.appendChild(new Platformer.Object("Busch1", -5.5, -1.6, -0.1, 1, 0.5, Platformer.OBJECT.BUSH_1));
        objects.appendChild(new Platformer.Object("Baum2", -1.5, -1.1, -0.1, 1.5, 1.5, Platformer.OBJECT.TREE_1));
        objects.appendChild(new Platformer.Object("Busch2", -0.9, -1.6, -0.2, 1, 0.5, Platformer.OBJECT.BUSH_3));
        objects.appendChild(new Platformer.Object("Schild1", -0.6, -1.6, -0.1, 0.5, 0.5, Platformer.OBJECT.ARROW_SIGN));
        objects.appendChild(new Platformer.Object("Box1", 0.8, -1.6, 0, 0.4, 0.4, Platformer.OBJECT.BOX));
        objects.appendChild(new Platformer.Object("Stein2", 2.2, -0.5, -0.1, 1, 0.5, Platformer.OBJECT.STONE));
        objects.appendChild(new Platformer.Object("Pilz1", 2.7, -0.6, -0.08, 0.23, 0.23, Platformer.OBJECT.MUSHROOM_1));
        objects.appendChild(new Platformer.Object("Pilz1", 2.9, -0.57, -0.09, 0.3, 0.3, Platformer.OBJECT.MUSHROOM_2));
        objects.appendChild(new Platformer.Object("Stumpf1", 4.7, -1.7, -0.1, 0.6, 0.3, Platformer.OBJECT.STUMP));
        objects.appendChild(new Platformer.Object("Baum3", 5.8, -1.33, -0.1, 1, 1, Platformer.OBJECT.TREE_1));
        objects.appendChild(new Platformer.Object("Baum4", 6.5, -1.1, -0.1, 1.5, 1.5, Platformer.OBJECT.TREE_2));
        objects.appendChild(new Platformer.Object("Baum5", 8, -1.1, -0.1, 1.5, 1.5, Platformer.OBJECT.TREE_1));
        return objects;
    }
})(Platformer || (Platformer = {}));
//# sourceMappingURL=Main.js.map