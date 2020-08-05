namespace Platformer {
  import f = FudgeCore;
  import fAid = FudgeAid;
  
  window.addEventListener("load", test);

  export let game: f.Node;
  export let level: f.Node;
  export let objects: f.Node;
  export let enemies: f.Node;
  export let collectables: f.Node;

  let player: Player;
  let cmpCamera: f.ComponentCamera;

  function test(): void {
    let canvas: HTMLCanvasElement = document.querySelector("canvas.game");
    let stats: HTMLCanvasElement = document.querySelector("canvas.stats");

    game = new f.Node("Game");
    collectables = new f.Node("Collectables");

    level = createPlatform();
    objects = addObjects();
    enemies = createEnemies();

    game.appendChild(level);
    game.appendChild(objects);
    game.appendChild(enemies);
    game.appendChild(collectables);
    
    createBackground();
    createPlayer();
       

    cmpCamera = new f.ComponentCamera();
    cmpCamera.pivot.translateZ(10);
    cmpCamera.pivot.lookAt(f.Vector3.ZERO());
    cmpCamera.backgroundColor = f.Color.CSS("aliceblue");

    let viewport: f.Viewport = new f.Viewport();
    viewport.initialize("Viewport", game, cmpCamera, canvas);
    viewport.draw();

    viewport.addEventListener(f.EVENT_KEYBOARD.DOWN, hndKeyboard);
    viewport.activateKeyboardEvent(f.EVENT_KEYBOARD.DOWN, true);
    viewport.setFocus(true);

    f.Loop.addEventListener(f.EVENT.LOOP_FRAME, update);
    f.Loop.start(f.LOOP_MODE.TIME_GAME, 60);

    function update(_event: ƒ.Eventƒ): void {
      processInput();
      camMovement();
      viewport.draw();
    }
  }
  
  function hndKeyboard(_event: f.EventKeyboard): void {
    if (_event.code == ƒ.KEYBOARD_CODE.SPACE)
      player.act(ACTION.JUMP);
    if (_event.code == ƒ.KEYBOARD_CODE.F)
      player.act(ACTION.ATTACK, player.dir);
  }

  function processInput(): void {
    if (!player.isDead) {
      if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.A, ƒ.KEYBOARD_CODE.ARROW_LEFT])) {
        player.dir = DIRECTION.LEFT;
        player.act(ACTION.WALK, DIRECTION.LEFT);
      }
      else if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.D, ƒ.KEYBOARD_CODE.ARROW_RIGHT])) {
        player.dir = DIRECTION.RIGHT;
        player.act(ACTION.WALK, DIRECTION.RIGHT);
      }
      else if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.SPACE])) {
        player.act(ACTION.JUMP, player.dir);
      }
      // else if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.F])) {
      //   player.act(ACTION.ATTACK, player.dir);
      // }
      else if (!player.isDead || player.isIdle)
        player.act(ACTION.IDLE);
    }
  }

  function camMovement(): void {
    let playerPos: f.Vector3 = player.cmpTransform.local.translation;
    cmpCamera.pivot.translation = new f.Vector3(playerPos.x, -1, cmpCamera.pivot.translation.z);
  }

  function displayStats(): void {

  }


  // setup Game

  function createBackground(): void {
    let width: number = 6;
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

  function createPlayer(): void {
    let playerImg: HTMLImageElement = document.querySelector("img.player");
    let spritesheet: f.CoatTextured = fAid.createSpriteSheet("Player", playerImg);
    Player.generateSprites(spritesheet);
    player = new Player("Player", 0.15, 0.15, new f.Vector2(8, 5), 3);

    game.appendChild(player);
  }

  function createEnemies(): f.Node {
    let enemies: f.Node = new f.Node("Enemies");

    let enemyIMG: HTMLImageElement = document.querySelector("img.enemy");
    let sprite: f.CoatTextured = fAid.createSpriteSheet("Enemy", enemyIMG);
    let enemy: Enemy = new Enemy("Frog", <Platform>level.getChild(6), 1.5, 1.5, new f.Vector2(0.2, 2), 1, ENEMY.FROG, sprite);
    
    enemies.appendChild(enemy);
    
    return enemies;
  }

  function createPlatform(): f.Node {
    let level: f.Node = new f.Node("Level");

    level.appendChild(new Platform(-5, -1.8, 0, TYPE.GROUND, 2, 2, COLLECTABLE.COIN_GOLD));
    level.appendChild(new Platform(-5, -2.8, 0, TYPE.MIDDLEGROUND, 2));
    level.appendChild(new Platform(-5, -3.8, 0, TYPE.UNDERGROUND, 2));

    level.appendChild(new Platform(-3.5, -1.85, -0.1, TYPE.WATER, 2));
    level.appendChild(new Platform(-3.5, -2.85, -0.1, TYPE.UNDERWATER, 2));
    level.appendChild(new Platform(-3.5, -3.85, -0.1, TYPE.UNDERWATER, 2));

    level.appendChild(new Platform(-1, -1.8, 0, TYPE.GROUND, 4, 4, COLLECTABLE.COIN_GOLD));
    level.appendChild(new Platform(-1, -2.8, 0, TYPE.MIDDLEGROUND, 4));
    level.appendChild(new Platform(-1, -3.8, 0, TYPE.UNDERGROUND, 4));


    level.appendChild(new Platform(2.6, -0.7, 0, TYPE.FLOATING, 2, 1, COLLECTABLE.COIN_GOLD));

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

    level.appendChild(new Platform(17.5, -1.2, -0.1, TYPE.FLOATING, 2)); 
    level.appendChild(new Platform(17, -1.9, -0.1, TYPE.WATER, 5));
    level.appendChild(new Platform(17, -2.9, -0.1, TYPE.UNDERWATER, 5));
    level.appendChild(new Platform(17, -3.9, -0.1, TYPE.UNDERWATER, 5));
    
    level.appendChild(new Platform(21, -1.8, 0, TYPE.GROUND, 4, 3, COLLECTABLE.COIN_GOLD));
    level.appendChild(new Platform(21, -2.8, 0, TYPE.MIDDLEGROUND, 4));
    level.appendChild(new Platform(21, -3.8, 0, TYPE.UNDERGROUND, 4));
    level.appendChild(new Platform(21, -3.9, -0.1, TYPE.UNDERWATER, 4));


    // level.appendChild(new Platform(24.5, -2.4, 0, TYPE.GROUND, 4));
    // level.appendChild(new Platform(24.5, -3.4, 0, TYPE.MIDDLEGROUND, 4));
    // level.appendChild(new Platform(24.5, -4.4, 0, TYPE.MIDDLEGROUND, 4));

    // level.appendChild(new Platform(28, -1.8, 0, TYPE.GROUND, 4));
    // level.appendChild(new Platform(28, -2.8, 0, TYPE.MIDDLEGROUND, 4));
    // level.appendChild(new Platform(28, -3.8, 0, TYPE.MIDDLEGROUND, 4));

    return level;
  } 

  function addObjects(): f.Node {
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
    objects.appendChild(new Object("Stein2", 13.5, -0.5, -0.1, 1.6, 1, OBJECT.STONE));

    objects.appendChild(new Object("Box1", 17.5, -1, 0, 0.4, 0.4, OBJECT.BOX));

    objects.appendChild(new Object("Baum7", 20, -1.1, -0.1, 1.5, 1.5, OBJECT.TREE_2));
    objects.appendChild(new Object("Baum7", 21, -1.33, -0.1, 1, 1, OBJECT.TREE_1));

    return objects;
  }
}