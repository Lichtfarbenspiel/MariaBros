namespace Platformer {
    
    import f = FudgeCore;
    import fAid = FudgeAid;
    
    export function createBackground(): void {
        let width: number = 7;
        let texture: f.TextureImage = new f.TextureImage();
        let bgImg: HTMLImageElement = document.querySelector("img.background");
    
        for (let i: number = 0; i < width; i++) {
          texture.image = bgImg; 
          let bg: Background = new Background(i - 1, texture);
          bg.cmpTransform.local.scaleY(3 * 2);
          bg.cmpTransform.local.scaleX(3 * 2);
          game.appendChild(bg);
        }
      }
    
    export function createPlayer(): void {
        let playerImg: HTMLImageElement = document.querySelector("img.player");
        let spritesheet: f.CoatTextured = fAid.createSpriteSheet("Player", playerImg);
        Player.generateSprites(spritesheet);
        player = new Player("Player", 0.15, 0.15, new f.Vector2(8, 5), 3);
    
        game.appendChild(player);
      }
    
    export function createEnemies(): f.Node {
        let enemies: f.Node = new f.Node("Enemies");
        
        for (let i: number = 0; i < enemyJSON.length; i++) {
          enemies.appendChild(new Enemy(i));
        }
          
        return enemies;
      }
    
    export function createPlatform(): f.Node {
        let level: f.Node = new f.Node("Level");
    
        level.appendChild(new Platform(8, -6.5, 0, TYPE.GROUND, 40));
    
        level.appendChild(new Platform(-6.5, -1.85, -0.1, TYPE.WATER, 2));
        level.appendChild(new Platform(-6.5, -2.85, -0.1, TYPE.UNDERWATER, 2));
        level.appendChild(new Platform(-6.5, -3.85, -0.1, TYPE.UNDERWATER, 2));
    
        level.appendChild(new Platform(-5, -1.8, 0, TYPE.GROUND, 2, 1, COLLECTABLE.COIN_GREEN));
        
        level.appendChild(new Platform(-5, -2.8, 0, TYPE.MIDDLEGROUND, 2));
        level.appendChild(new Platform(-5, -3.8, 0, TYPE.UNDERGROUND, 2));
    
        level.appendChild(new Platform(-3.5, -1.85, -0.1, TYPE.WATER, 2));
        level.appendChild(new Platform(-3.5, -2.85, -0.1, TYPE.UNDERWATER, 2));
        level.appendChild(new Platform(-3.5, -3.85, -0.1, TYPE.UNDERWATER, 2));
    
        level.appendChild(new Platform(-1, -1.8, 0, TYPE.GROUND, 4, 4, COLLECTABLE.COIN_GOLD));
        level.appendChild(new Platform(-1, -2.8, 0, TYPE.MIDDLEGROUND, 4));
        level.appendChild(new Platform(-1, -3.8, 0, TYPE.UNDERGROUND, 4));
    
    
        level.appendChild(new Platform(2.6, -0.7, 0, TYPE.FLOATING, 2, 2, COLLECTABLE.COIN_RED));
    
        level.appendChild(new Platform(2, -1.85, -0.1, TYPE.WATER, 3.5));
        level.appendChild(new Platform(2, -2.85, -0.1, TYPE.UNDERWATER, 3.5));
        level.appendChild(new Platform(2, -3.85, -0.1, TYPE.UNDERWATER, 3.5));
    
        level.appendChild(new Platform(6.5, -1.8, 0, TYPE.GROUND, 6, 5, COLLECTABLE.COIN_GOLD));
        level.appendChild(new Platform(6.5, -2.8, 0, TYPE.UNDERGROUND, 6));
        level.appendChild(new Platform(6.5, -2.9, -0.1, TYPE.UNDERWATER, 6));
        level.appendChild(new Platform(6.5, -3.9, -0.1, TYPE.UNDERWATER, 6));
    
        level.appendChild(new Platform(12, -1, 0, TYPE.GROUND, 6, 4, COLLECTABLE.COIN_GOLD));
        level.appendChild(new Platform(12, -2, 0, TYPE.UNDERGROUND, 6));
        level.appendChild(new Platform(12, -2.9 , -0.1, TYPE.UNDERWATER, 6));
        level.appendChild(new Platform(12, -3.9 , -0.1, TYPE.UNDERWATER, 6));
    
        level.appendChild(new Platform(17.5, -1.2, -0.1, TYPE.FLOATING, 2, 1, COLLECTABLE.COIN_GREEN)); 
        level.appendChild(new Platform(17, -1.9, -0.1, TYPE.WATER, 5));
        level.appendChild(new Platform(17, -2.9, -0.1, TYPE.UNDERWATER, 5));
        level.appendChild(new Platform(17, -3.9, -0.1, TYPE.UNDERWATER, 5));
        
        level.appendChild(new Platform(21, -1.8, 0, TYPE.GROUND, 5, 1, COLLECTABLE.GEM_GOLD));
        level.appendChild(new Platform(21, -2.8, 0, TYPE.MIDDLEGROUND, 5));
        level.appendChild(new Platform(21, -3.8, 0, TYPE.UNDERGROUND, 5));
        level.appendChild(new Platform(21, -3.9, -0.1, TYPE.UNDERWATER, 5)); 
    
        level.appendChild(new Platform(24.5, -1.85, -0.1, TYPE.WATER, 2));
        level.appendChild(new Platform(24.5, -2.85, -0.1, TYPE.UNDERWATER, 2));
        level.appendChild(new Platform(24.5, -3.85, -0.1, TYPE.UNDERWATER, 2));
    
    
        // level.appendChild(new Platform(24.5, -2.4, 0, TYPE.GROUND, 4));
        // level.appendChild(new Platform(24.5, -3.4, 0, TYPE.MIDDLEGROUND, 4));
        // level.appendChild(new Platform(24.5, -4.4, 0, TYPE.MIDDLEGROUND, 4));
    
        // level.appendChild(new Platform(28, -1.8, 0, TYPE.GROUND, 4));
        // level.appendChild(new Platform(28, -2.8, 0, TYPE.MIDDLEGROUND, 4));
        // level.appendChild(new Platform(28, -3.8, 0, TYPE.MIDDLEGROUND, 4));
    
        return level;
      } 
    
    export function addObjects(): f.Node {
        let objects: f.Node = new f.Node("Objects");
    
        objects.appendChild(new Object("Baum1", -5, -1.1, -0.1, 1.5, 1.5, OBJECT.TREE_2));
        objects.appendChild(new Object("Busch1", -5.5, -1.6, -0.1, 1, 0.5, OBJECT.BUSH_1));
    
        objects.appendChild(new Object("Baum2", -1.5, -1.1, -0.1, 1.5, 1.5, OBJECT.TREE_1));
        objects.appendChild(new Object("Busch2", -0.9, -1.6, -0.2, 1, 0.5, OBJECT.BUSH_3));
        objects.appendChild(new Object("Schild1", -0.6, -1.6, -0.1, 0.5, 0.5, OBJECT.ARROW_SIGN));
        objects.appendChild(new Object("Box1", 0.8, -1.6, 0, 0.4, 0.4, OBJECT.BOX));
    
        objects.appendChild(new Object("Stein2", 2.2, -0.5, -0.1, 1, 0.5, OBJECT.STONE));
        objects.appendChild(new Object("Pilz1", 2.7, -0.6, -0.08, 0.23, 0.23, OBJECT.MUSHROOM_1));
        objects.appendChild(new Object("Pilz1", 2.9, -0.57, -0.09, 0.3, 0.3, OBJECT.MUSHROOM_2));
    
        objects.appendChild(new Object("Stumpf1", 4.7, -1.7, -0.1, 0.6, 0.3, OBJECT.STUMP));
        objects.appendChild(new Object("Baum3", 5.8, -1.33, -0.1, 1, 1, OBJECT.TREE_1));
        objects.appendChild(new Object("Baum4", 6.5, -1.1, -0.1, 1.5, 1.5, OBJECT.TREE_2));
        objects.appendChild(new Object("Baum5", 8, -1.1, -0.1, 1.5, 1.5, OBJECT.TREE_1));
    
        objects.appendChild(new Object("Stumpf2", 10, -0.9, -0.1, 0.6, 0.3, OBJECT.STUMP));
        objects.appendChild(new Object("Busch3", 10.7, -0.75, -0.1, 1, 0.5, OBJECT.BUSH_3));
        objects.appendChild(new Object("Pilz3", 11.5, -0.85, -0.08, 0.3, 0.3, OBJECT.MUSHROOM_1));
        objects.appendChild(new Object("Baum6", 12, -0.4, -0.1, 1.5, 1.5, OBJECT.TREE_2));
        objects.appendChild(new Object("Busch4", 12.7, -0.75, -0.1, 1, 0.5, OBJECT.BUSH_1));
        objects.appendChild(new Object("Stein2", 13.5, -0.6, -0.1, 1.6, 1, OBJECT.STONE));
    
        objects.appendChild(new Object("Box1", 17.5, -1, 0, 0.4, 0.4, OBJECT.BOX));
    
        objects.appendChild(new Object("Baum7", 20, -1.1, -0.1, 1.5, 1.5, OBJECT.TREE_2));
        objects.appendChild(new Object("Baum8", 21, -1.33, -0.1, 1, 1, OBJECT.TREE_1));
        objects.appendChild(new Object("Busch5", 22, -1.6, -0.1, 1, 0.5, OBJECT.BUSH_2));
        objects.appendChild(new Object("Ziel", 22.5, -1.4, -0.1, 1, 1, OBJECT.SIGN));
    
        return objects;
      }
}