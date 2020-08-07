namespace Platformer {
  import f = FudgeCore;
  
  loadJSON();
  window.addEventListener("load", initialize);

  export let game: f.Node;
  export let level: f.Node;
  export let objects: f.Node;
  export let enemies: f.Node;
  export let collectables: f.Node;
  export let drowningCollider: Platform;

  export let muteSound: boolean = false;
  export let muteSoundBG: boolean = false;

  export let player: Player;
  export let enemyJSON: Enemy[];


  let cmpCamera: f.ComponentCamera;
  let camRestrictionX: number[] = [-1.5, 19];
  let canvas: HTMLCanvasElement;
  let viewport: f.Viewport;


  function initialize(_event: Event): void {
    document.getElementById("startBtn").addEventListener("click", start);
    document.getElementById("settingsBtn").addEventListener("click", displaySetings);
    document.getElementById("settingsBtn").addEventListener("click", displaySetings);
    document.getElementById("toggleMusic").addEventListener("click", toggleMusic);
    document.getElementById("toggleSound").addEventListener("click", toggleSound);

    document.getElementById("instructionsBtn").addEventListener("click", displayInstructions);
    document.getElementById("backBtn").addEventListener("click", displayMenu);

    // document.getElementById("restartBtn").addEventListener("click", restart);
    document.getElementById("backMenuBtn").addEventListener("click", displayMenu);
  }

  export async function loadJSON(): Promise<void> {
    let response: Response = await fetch("data.json");
    let json: string = await response.text();
    enemyJSON = JSON.parse(json);
  }
  
  function start(): void {
    Sound.initialize();
    displayGame();

    canvas = document.querySelector("canvas.game");
    
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

    viewport = new f.Viewport();
    viewport.initialize("Viewport", game, cmpCamera, canvas);
    viewport.draw();

    viewport.addEventListener(f.EVENT_KEYBOARD.DOWN, hndKeyboard);
    viewport.activateKeyboardEvent(f.EVENT_KEYBOARD.DOWN, true);
    viewport.setFocus(true);

    f.Loop.addEventListener(f.EVENT.LOOP_FRAME, update);
    f.Loop.start(f.LOOP_MODE.TIME_GAME, 60);
  }

  function update(_event: ƒ.Eventƒ): void {
    processInput();
    camMovement();
    viewport.draw();     
  }
  
  function hndKeyboard(_event: f.EventKeyboard): void {
    if (!player.isDead) {
      if (_event.code == ƒ.KEYBOARD_CODE.SPACE)
        player.act(ACTION.JUMP);
      if (_event.code == ƒ.KEYBOARD_CODE.ESC)
        displayMenu();
    }       
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
      else if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.W, ƒ.KEYBOARD_CODE.ARROW_UP])) {
        player.act(ACTION.ATTACK, player.dir);
      }
      else if (!player.isDead || player.isIdle)
        player.act(ACTION.IDLE);
    }
  }

  function camMovement(): void {
    let playerPos: f.Vector3 = player.cmpTransform.local.translation;
    let camPos: f.Vector3 = cmpCamera.pivot.translation;
    if (playerPos.x > camRestrictionX[0] && playerPos.x < camRestrictionX[1]) {
      camPos = new f.Vector3(playerPos.x, -1, cmpCamera.pivot.translation.z);
    }
    cmpCamera.pivot.translation = camPos;
  }

  export function gameOver(): void {
    f.Loop.stop();
    document.getElementById("game").style.display = "none";
    
    document.getElementById("endScreen").style.display = "initial";
    document.getElementById("win").style.display = "none";
    document.getElementById("gameover").style.display = "initial";
    document.getElementById("health").innerHTML = "HP: " + player.healthPoints;
    document.getElementById("score").innerHTML = "SCORE: " + player.wealth;
    canvas.style.visibility = "0.5";
}

  export function gameFinished(): void {
    f.Loop.stop();
    document.getElementById("game").style.display = "none";
    
    document.getElementById("endScreen").style.display = "initial";
    document.getElementById("win").style.display = "initial";
    document.getElementById("gameover").style.display = "none";
    document.getElementById("health").innerHTML = "HP: " + player.healthPoints;
    document.getElementById("score").innerHTML = "SCORE: " + player.wealth;
    canvas.style.visibility = "0.5";
  }

  function restart(): void {
    location.reload();
  }
}