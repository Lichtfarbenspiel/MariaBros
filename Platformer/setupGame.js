"use strict";
var Platformer;
(function (Platformer) {
    var f = FudgeCore;
    var fAid = FudgeAid;
    function createBackground() {
        let width = 7;
        let texture = new f.TextureImage();
        let bgImg = document.querySelector("img.background");
        for (let i = 0; i < width; i++) {
            texture.image = bgImg;
            let bg = new Platformer.Background(i - 1, texture);
            bg.cmpTransform.local.scaleY(3 * 2);
            bg.cmpTransform.local.scaleX(3 * 2);
            Platformer.game.appendChild(bg);
        }
    }
    Platformer.createBackground = createBackground;
    function createPlayer() {
        let playerImg = document.querySelector("img.player");
        let spritesheet = fAid.createSpriteSheet("Player", playerImg);
        Platformer.Player.generateSprites(spritesheet);
        Platformer.player = new Platformer.Player("Player", 0.15, 0.15, new f.Vector2(8, 5), 3);
        Platformer.game.appendChild(Platformer.player);
    }
    Platformer.createPlayer = createPlayer;
    function createEnemies() {
        let enemies = new f.Node("Enemies");
        let enemyIMG = document.querySelector("img.enemy");
        let sprite = fAid.createSpriteSheet("Enemy", enemyIMG);
        let enemy = new Platformer.Enemy("Frog", Platformer.level.getChild(4), 1.5, 1.5, new f.Vector2(0.2, 2), 1, Platformer.ENEMY.FROG, sprite);
        enemies.appendChild(enemy);
        enemy = new Platformer.Enemy("Frog", Platformer.level.getChild(13), 1.5, 1.5, new f.Vector2(0.2, 2), 1, Platformer.ENEMY.FROG, sprite);
        enemies.appendChild(enemy);
        enemy = new Platformer.Enemy("Frog", Platformer.level.getChild(21), 1.5, 1.5, new f.Vector2(0.2, 2), 1, Platformer.ENEMY.FROG, sprite);
        enemies.appendChild(enemy);
        enemy = new Platformer.Enemy("Frog", Platformer.level.getChild(29), 1.5, 1.5, new f.Vector2(0.2, 2), 1, Platformer.ENEMY.FROG, sprite);
        enemies.appendChild(enemy);
        return enemies;
    }
    Platformer.createEnemies = createEnemies;
    function createPlatform() {
        let level = new f.Node("Level");
        level.appendChild(new Platformer.Platform(8, -6.5, 0, Platformer.TYPE.GROUND, 40));
        level.appendChild(new Platformer.Platform(-6.5, -1.85, -0.1, Platformer.TYPE.WATER, 2));
        level.appendChild(new Platformer.Platform(-6.5, -2.85, -0.1, Platformer.TYPE.UNDERWATER, 2));
        level.appendChild(new Platformer.Platform(-6.5, -3.85, -0.1, Platformer.TYPE.UNDERWATER, 2));
        level.appendChild(new Platformer.Platform(-5, -1.8, 0, Platformer.TYPE.GROUND, 2, 1, Platformer.COLLECTABLE.COIN_GREEN));
        level.appendChild(new Platformer.Platform(-5, -2.8, 0, Platformer.TYPE.MIDDLEGROUND, 2));
        level.appendChild(new Platformer.Platform(-5, -3.8, 0, Platformer.TYPE.UNDERGROUND, 2));
        level.appendChild(new Platformer.Platform(-3.5, -1.85, -0.1, Platformer.TYPE.WATER, 2));
        level.appendChild(new Platformer.Platform(-3.5, -2.85, -0.1, Platformer.TYPE.UNDERWATER, 2));
        level.appendChild(new Platformer.Platform(-3.5, -3.85, -0.1, Platformer.TYPE.UNDERWATER, 2));
        level.appendChild(new Platformer.Platform(-1, -1.8, 0, Platformer.TYPE.GROUND, 4, 4, Platformer.COLLECTABLE.COIN_GOLD));
        level.appendChild(new Platformer.Platform(-1, -2.8, 0, Platformer.TYPE.MIDDLEGROUND, 4));
        level.appendChild(new Platformer.Platform(-1, -3.8, 0, Platformer.TYPE.UNDERGROUND, 4));
        level.appendChild(new Platformer.Platform(2.6, -0.7, 0, Platformer.TYPE.FLOATING, 2, 2, Platformer.COLLECTABLE.COIN_RED));
        level.appendChild(new Platformer.Platform(2, -1.85, -0.1, Platformer.TYPE.WATER, 3.5));
        level.appendChild(new Platformer.Platform(2, -2.85, -0.1, Platformer.TYPE.UNDERWATER, 3.5));
        level.appendChild(new Platformer.Platform(2, -3.85, -0.1, Platformer.TYPE.UNDERWATER, 3.5));
        level.appendChild(new Platformer.Platform(6.5, -1.8, 0, Platformer.TYPE.GROUND, 6, 5, Platformer.COLLECTABLE.COIN_GOLD));
        level.appendChild(new Platformer.Platform(6.5, -2.8, 0, Platformer.TYPE.UNDERGROUND, 6));
        level.appendChild(new Platformer.Platform(6.5, -2.9, -0.1, Platformer.TYPE.UNDERWATER, 6));
        level.appendChild(new Platformer.Platform(6.5, -3.9, -0.1, Platformer.TYPE.UNDERWATER, 6));
        level.appendChild(new Platformer.Platform(12, -1, 0, Platformer.TYPE.GROUND, 6, 4, Platformer.COLLECTABLE.COIN_GOLD));
        level.appendChild(new Platformer.Platform(12, -2, 0, Platformer.TYPE.UNDERGROUND, 6));
        level.appendChild(new Platformer.Platform(12, -2.9, -0.1, Platformer.TYPE.UNDERWATER, 6));
        level.appendChild(new Platformer.Platform(12, -3.9, -0.1, Platformer.TYPE.UNDERWATER, 6));
        level.appendChild(new Platformer.Platform(17.5, -1.2, -0.1, Platformer.TYPE.FLOATING, 2, 1, Platformer.COLLECTABLE.COIN_GREEN));
        level.appendChild(new Platformer.Platform(17, -1.9, -0.1, Platformer.TYPE.WATER, 5));
        level.appendChild(new Platformer.Platform(17, -2.9, -0.1, Platformer.TYPE.UNDERWATER, 5));
        level.appendChild(new Platformer.Platform(17, -3.9, -0.1, Platformer.TYPE.UNDERWATER, 5));
        level.appendChild(new Platformer.Platform(21, -1.8, 0, Platformer.TYPE.GROUND, 5, 1, Platformer.COLLECTABLE.GEM_GOLD));
        level.appendChild(new Platformer.Platform(21, -2.8, 0, Platformer.TYPE.MIDDLEGROUND, 5));
        level.appendChild(new Platformer.Platform(21, -3.8, 0, Platformer.TYPE.UNDERGROUND, 5));
        level.appendChild(new Platformer.Platform(21, -3.9, -0.1, Platformer.TYPE.UNDERWATER, 5));
        level.appendChild(new Platformer.Platform(24.5, -1.85, -0.1, Platformer.TYPE.WATER, 2));
        level.appendChild(new Platformer.Platform(24.5, -2.85, -0.1, Platformer.TYPE.UNDERWATER, 2));
        level.appendChild(new Platformer.Platform(24.5, -3.85, -0.1, Platformer.TYPE.UNDERWATER, 2));
        // level.appendChild(new Platform(24.5, -2.4, 0, TYPE.GROUND, 4));
        // level.appendChild(new Platform(24.5, -3.4, 0, TYPE.MIDDLEGROUND, 4));
        // level.appendChild(new Platform(24.5, -4.4, 0, TYPE.MIDDLEGROUND, 4));
        // level.appendChild(new Platform(28, -1.8, 0, TYPE.GROUND, 4));
        // level.appendChild(new Platform(28, -2.8, 0, TYPE.MIDDLEGROUND, 4));
        // level.appendChild(new Platform(28, -3.8, 0, TYPE.MIDDLEGROUND, 4));
        return level;
    }
    Platformer.createPlatform = createPlatform;
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
        objects.appendChild(new Platformer.Object("Stumpf2", 10, -0.9, -0.1, 0.6, 0.3, Platformer.OBJECT.STUMP));
        objects.appendChild(new Platformer.Object("Busch3", 10.7, -0.75, -0.1, 1, 0.5, Platformer.OBJECT.BUSH_3));
        objects.appendChild(new Platformer.Object("Pilz3", 11.5, -0.85, -0.08, 0.3, 0.3, Platformer.OBJECT.MUSHROOM_1));
        objects.appendChild(new Platformer.Object("Baum6", 12, -0.4, -0.1, 1.5, 1.5, Platformer.OBJECT.TREE_2));
        objects.appendChild(new Platformer.Object("Busch4", 12.7, -0.75, -0.1, 1, 0.5, Platformer.OBJECT.BUSH_1));
        objects.appendChild(new Platformer.Object("Stein2", 13.5, -0.6, -0.1, 1.6, 1, Platformer.OBJECT.STONE));
        objects.appendChild(new Platformer.Object("Box1", 17.5, -1, 0, 0.4, 0.4, Platformer.OBJECT.BOX));
        objects.appendChild(new Platformer.Object("Baum7", 20, -1.1, -0.1, 1.5, 1.5, Platformer.OBJECT.TREE_2));
        objects.appendChild(new Platformer.Object("Baum8", 21, -1.33, -0.1, 1, 1, Platformer.OBJECT.TREE_1));
        objects.appendChild(new Platformer.Object("Busch5", 22, -1.6, -0.1, 1, 0.5, Platformer.OBJECT.BUSH_2));
        objects.appendChild(new Platformer.Object("Ziel", 22.5, -1.4, -0.1, 1, 1, Platformer.OBJECT.SIGN));
        return objects;
    }
    Platformer.addObjects = addObjects;
})(Platformer || (Platformer = {}));
//# sourceMappingURL=SetupGame.js.map