namespace Platformer {
  import f = FudgeCore;
  import fAid = FudgeAid;
  
  window.addEventListener("load", test);

  export let game: f.Node;
  export let level: f.Node;
  let player: Player;
  let cmpCamera: f.ComponentCamera;

  function test(): void {
    let canvas: HTMLCanvasElement = document.querySelector("canvas");
    let crc2: CanvasRenderingContext2D = canvas.getContext("2d");
    let playerImg: HTMLImageElement = document.querySelector("img.player");
    let spritesheet: f.CoatTextured = fAid.createSpriteSheet("Player", playerImg);
    Player.generateSprites(spritesheet);

    game = new f.Node("Game");
    player = new Player("Player 1", 0.15, 0.15);
    level = createPlatform();
    createBackground();
    game.appendChild(level);
    game.appendChild(player);

    // game.appendChild(background);

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

      
      crc2.strokeRect(-1, -1, canvas.width / 2, canvas.height + 2);
      crc2.strokeRect(-1, canvas.height / 2, canvas.width + 2, canvas.height);
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

    level.appendChild(new Platform(0, -1, 0, TYPE.GROUND, 3));
  








      // let platform: Platform = new Platform();
      // platform.cmpTransform.local.scaleY(0.2);
      // platform.cmpTransform.local.translateY(-3);
      // level.appendChild(platform);

      // platform = new Platform();
      // platform.cmpTransform.local.translateY(-0.6);
      // platform.cmpTransform.local.translateX(-3.5);
      // platform.cmpTransform.local.scaleY(1);
      // platform.cmpTransform.local.scaleX(2);
      // level.appendChild(platform);

      // platform = new Platform();
      // platform.cmpTransform.local.translateY(-2);
      // platform.cmpTransform.local.translateX(-5.3);
      // platform.cmpTransform.local.scaleY(0.5);
      // platform.cmpTransform.local.scaleX(1);
      // level.appendChild(platform);

      // platform = new Platform();
      // platform.cmpTransform.local.translateY(-1.6);
      // platform.cmpTransform.local.translateX(0);
      // platform.cmpTransform.local.scaleY(0.5);
      // platform.cmpTransform.local.scaleX(5);
      // level.appendChild(platform);

      // platform = new Platform();
      // platform.cmpTransform.local.translateY(-1.6);
      // platform.cmpTransform.local.translateX(6);
      // platform.cmpTransform.local.scaleY(0.5);
      // platform.cmpTransform.local.scaleX(5);
      // level.appendChild(platform);

      // platform = new Platform();
      // platform.cmpTransform.local.translateY(-1);
      // platform.cmpTransform.local.translateX(6);
      // platform.cmpTransform.local.scaleY(1);
      // platform.cmpTransform.local.scaleX(1);
      // level.appendChild(platform);

      // platform = new Platform();
      // platform.cmpTransform.local.translateY(-1.3);
      // platform.cmpTransform.local.translateX(5.35);
      // platform.cmpTransform.local.scaleY(0.3);
      // platform.cmpTransform.local.scaleX(0.3);
      // level.appendChild(platform);

      // platform = new Platform();
      // platform.cmpTransform.local.translateX(8);
      // platform.cmpTransform.local.translateY(-0.6);
      // platform.cmpTransform.local.scaleY(0.3);
      // platform.cmpTransform.local.scaleX(0.3);
      // level.appendChild(platform);

      // platform = new Platform();
      // platform.cmpTransform.local.translateY(-1.6);
      // platform.cmpTransform.local.translateX(9.5);
      // platform.cmpTransform.local.scaleY(0.3);
      // platform.cmpTransform.local.scaleX(0.3);
      // level.appendChild(platform);

      // platform = new Platform();
      // platform.cmpTransform.local.translateY(-1.6);
      // platform.cmpTransform.local.translateX(11);
      // platform.cmpTransform.local.scaleY(0.3);
      // platform.cmpTransform.local.scaleX(0.3);
      // level.appendChild(platform);

      // platform = new Platform();
      // platform.cmpTransform.local.translateX(10);
      // platform.cmpTransform.local.translateY(-0.3);
      // platform.cmpTransform.local.scaleY(0.2);
      // platform.cmpTransform.local.scaleX(2);
      // level.appendChild(platform);

      // platform = new Platform();
      // platform.cmpTransform.local.translateY(-1.6);
      // platform.cmpTransform.local.translateX(14);
      // platform.cmpTransform.local.scaleY(1);
      // platform.cmpTransform.local.scaleX(4);
      // level.appendChild(platform);
      
      // platform = new Platform();
      // platform.cmpTransform.local.translateY(-1.1);
      // platform.cmpTransform.local.translateX(17);
      // platform.cmpTransform.local.scaleY(0.5);
      // platform.cmpTransform.local.scaleX(2);
      // level.appendChild(platform);

      // platform = new Platform();
      // platform.cmpTransform.local.translateY(-0.6);
      // platform.cmpTransform.local.translateX(20);
      // platform.cmpTransform.local.scaleY(0.5);
      // platform.cmpTransform.local.scaleX(2);
      // level.appendChild(platform);

      // platform = new Platform();
      // platform.cmpTransform.local.translateY(-2.2);
      // platform.cmpTransform.local.translateX(18);
      // platform.cmpTransform.local.scaleY(0.4);
      // platform.cmpTransform.local.scaleX(4);
      // level.appendChild(platform);

      // platform = new Platform();
      // platform.cmpTransform.local.translateY(-1.6);
      // platform.cmpTransform.local.translateX(26);
      // platform.cmpTransform.local.scaleY(0.5);
      // platform.cmpTransform.local.scaleX(7.29);
      // level.appendChild(platform);

    return level;
  } 
}