namespace Platformer {
  import f = FudgeCore;
  import fAid = FudgeAid;
  
  window.addEventListener("load", test);

  export let game: f.Node;
  export let level: f.Node;

  let player: Player;
  let objects: f.Node;
  let cmpCamera: f.ComponentCamera;

  function test(): void {
    let canvas: HTMLCanvasElement = document.querySelector("canvas");

    let playerImg: HTMLImageElement = document.querySelector("img.player");
    let spritesheet: f.CoatTextured = fAid.createSpriteSheet("Player", playerImg);
    Player.generateSprites(spritesheet);

    game = new f.Node("Game");
    player = new Player("Player 1", 0.15, 0.15);
    level = createPlatform();
    objects = addObjects();

    game.appendChild(player);
    game.appendChild(level);
    game.appendChild(objects);

    createBackground();
    

    cmpCamera = new f.ComponentCamera();
    cmpCamera.pivot.translateZ(6);
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
  }

  function processInput(): void {
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
    else if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.F])) {
      player.act(ACTION.ATTACK, player.dir);
    }
    else if (!player.isDead || player.isIdle)
      player.act(ACTION.IDLE);
  }

  function camMovement(): void {
    let playerPos: f.Vector3 = player.cmpTransform.local.translation;
    cmpCamera.pivot.translation = new f.Vector3(playerPos.x, playerPos.y + 0.5, cmpCamera.pivot.translation.z);
  }


  // create Environment

  function createBackground(): void {
    let width: number = 6;
    let texture: f.TextureImage = new f.TextureImage();
    let bgImg: HTMLImageElement = document.querySelector("img.background");

    for (let i: number = 0; i < width; i++) {
      texture.image = bgImg; 
      let bg: Background = new Background(i, texture);
      bg.cmpTransform.local.scaleY(3 * 2);
      bg.cmpTransform.local.scaleX(3 * 2);
      game.appendChild(bg);
    }
  }

  function createPlatform(): f.Node {
    let level: f.Node = new f.Node("Level");

    level.appendChild(new Platform(-5, -1.8, 0, TYPE.GROUND, 2));
    level.appendChild(new Platform(-5, -2.8, 0, TYPE.MIDDLEGROUND, 2));
    level.appendChild(new Platform(-5, -3.8, 0, TYPE.UNDERGROUND, 2));

    level.appendChild(new Platform(-3.5, -1.85, -0.1, TYPE.WATER, 2));
    level.appendChild(new Platform(-3.5, -2.85, -0.1, TYPE.UNDERWATER, 2));
    level.appendChild(new Platform(-3.5, -3.85, -0.1, TYPE.UNDERWATER, 2));

    level.appendChild(new Platform(-1, -1.8, 0, TYPE.GROUND, 4));
    level.appendChild(new Platform(-1, -2.8, 0, TYPE.MIDDLEGROUND, 4));
    level.appendChild(new Platform(-1, -3.8, 0, TYPE.UNDERGROUND, 4));


    level.appendChild(new Platform(2.6, -0.7, 0, TYPE.FLOATING, 2));

    level.appendChild(new Platform(2, -1.85, -0.1, TYPE.WATER, 3.5));
    level.appendChild(new Platform(2, -2.85, -0.1, TYPE.UNDERWATER, 3.5));
    level.appendChild(new Platform(2, -3.85, -0.1, TYPE.UNDERWATER, 3.5));

    level.appendChild(new Platform(6.5, -1.8, 0, TYPE.GROUND, 6));
    level.appendChild(new Platform(6.5, -2.8, 0, TYPE.UNDERGROUND, 6));
    level.appendChild(new Platform(6.5, -2.9, -0.1, TYPE.UNDERWATER, 6));
    level.appendChild(new Platform(6.5, -3.9, -0.1, TYPE.UNDERWATER, 6));

    level.appendChild(new Platform(12, -1, 0, TYPE.GROUND, 6));
    level.appendChild(new Platform(12, -2, 0, TYPE.UNDERGROUND, 6));
    level.appendChild(new Platform(12, -2.9 , -0.1, TYPE.UNDERWATER, 6));
    level.appendChild(new Platform(12, -3.9 , -0.1, TYPE.UNDERWATER, 6));

    level.appendChild(new Platform(17.5, -1.2, -0.1, TYPE.FLOATING, 2)); 
    level.appendChild(new Platform(17, -1.9, -0.1, TYPE.WATER, 5));
    level.appendChild(new Platform(17, -2.9, -0.1, TYPE.UNDERWATER, 5));
    level.appendChild(new Platform(17, -3.9, -0.1, TYPE.UNDERWATER, 5));
    
    level.appendChild(new Platform(21, -1.8, 0, TYPE.GROUND, 4));
    level.appendChild(new Platform(21, -2.8, 0, TYPE.MIDDLEGROUND, 4));
    level.appendChild(new Platform(21, -3.8, 0, TYPE.UNDERGROUND, 4));
    level.appendChild(new Platform(21, -3.9, -0.1, TYPE.UNDERWATER, 4));


    level.appendChild(new Platform(24.5, -2.4, 0, TYPE.GROUND, 4));
    level.appendChild(new Platform(24.5, -3.4, 0, TYPE.MIDDLEGROUND, 4));

    level.appendChild(new Platform(28, -1.8, 0, TYPE.GROUND, 4));
    level.appendChild(new Platform(28, -2.8, 0, TYPE.MIDDLEGROUND, 4));
    level.appendChild(new Platform(28, -3.8, 0, TYPE.MIDDLEGROUND, 4));

    return level;
  } 

  function addObjects(): f.Node{
    let objects: f.Node = new f.Node("Objects");

    objects.appendChild(new Object(-5, -1.1, -0.1, 1.5, 1.5, TYPE.TREE_2));
    objects.appendChild(new Object(-5.5, -1.6, -0.1, 1, 0.5, TYPE.BUSH_1));

    objects.appendChild(new Object(-1.5, -1.1, -0.1, 1.5, 1.5, TYPE.TREE_1));
    objects.appendChild(new Object(-0.9, -1.6, -0.2, 1, 0.5, TYPE.BUSH_3));
    objects.appendChild(new Object(-0.6, -1.6, -0.1, 0.5, 0.5, TYPE.ARROW_SIGN));
    objects.appendChild(new Object(0.8, -1.6, 0, 0.4, 0.4, TYPE.BOX));

    return objects;
  }
}