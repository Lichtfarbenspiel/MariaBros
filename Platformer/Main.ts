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
    let img: HTMLImageElement = document.querySelector("img");
    let spritesheet: f.CoatTextured = fAid.createSpriteSheet("Player", img);
    Player.generateSprites(spritesheet);

    game = new f.Node("Game");
    player = new Player("Player 1", 0.15, 0.15);
    level = createLevel();
    game.appendChild(level);
    game.appendChild(player);

    cmpCamera = new f.ComponentCamera();
    cmpCamera.pivot.translateZ(6);
    cmpCamera.pivot.lookAt(f.Vector3.ZERO());
    cmpCamera.backgroundColor = f.Color.CSS("lightgreen");

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
    else if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.W])) {
      player.isDead = true;
      player.act(ACTION.DIE, player.dir);
    }
    else if (!player.isDead)
      player.act(ACTION.IDLE);
  }
  
  function createLevel(): f.Node {
    let level: f.Node = new f.Node("Level");
    let platform: Platform = new Platform();
    platform.cmpTransform.local.scaleY(0.2);
    platform.cmpTransform.local.translateY(-2);
    level.appendChild(platform);

    platform = new Platform();
    platform.cmpTransform.local.translateX(2);
    platform.cmpTransform.local.translateY(0.1);
    platform.cmpTransform.local.scaleY(0.2);
    platform.cmpTransform.local.scaleX(2);
    level.appendChild(platform);

    platform = new Platform();
    platform.cmpTransform.local.translateY(-1.6);
    platform.cmpTransform.local.translateX(-2.2);
    platform.cmpTransform.local.scaleY(0.5);
    platform.cmpTransform.local.scaleX(10);
    level.appendChild(platform);

    platform = new Platform();
    platform.cmpTransform.local.translateY(-1.6);
    platform.cmpTransform.local.translateX(9);
    platform.cmpTransform.local.scaleY(0.5);
    platform.cmpTransform.local.scaleX(10);
    level.appendChild(platform);

    return level;
  } 

  function camMovement(): void {
    let playerPos: f.Vector3 = player.cmpTransform.local.translation;
    cmpCamera.pivot.translation = new f.Vector3(playerPos.x, playerPos.y + 0.5, cmpCamera.pivot.translation.z);
  }


}