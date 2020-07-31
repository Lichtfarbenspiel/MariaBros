namespace Platformer {
    import f = FudgeCore;
    import fAid = FudgeAid;
    
    export enum ACTION {
        IDLE = "idle", 
        WALK = "walk",
        JUMP = "jump", 
        ATTACK = "attack", 
        DIE = "die"
    }

    export enum DIRECTION {
        LEFT, RIGHT
    }

    export class Player extends fAid.NodeSprite {
        
        private static animations: fAid.SpriteSheetAnimations;
        private static maxSpeed: f.Vector2 = new f.Vector2(2, 5);
        private static gravity: f.Vector2 = f.Vector2.Y(-3.5);

        public dir: DIRECTION = DIRECTION.RIGHT;
        public speed: f.Vector3 = f.Vector3.ZERO();
        public isDead: boolean = false;
        private action: ACTION;

        constructor(_name: string = "Player", scaleX: number, scaleY: number) {
            super(_name);

            this.addComponent(new f.ComponentTransform());
            // this.mtxWorld.translation = new f.Vector3(posX, posY, 0);
            this.cmpTransform.local.scaling = new f.Vector3(scaleX, scaleY, 0);
            this.show(ACTION.IDLE);
            f.Loop.addEventListener(f.EVENT.LOOP_FRAME, this.update);
        }

        public static generateSprites(_spritesheet: f.CoatTextured): void {
            Player.animations = {};

            let sprite: fAid.SpriteSheetAnimation = new fAid.SpriteSheetAnimation(ACTION.JUMP, _spritesheet);
            // sprite.generateByGrid(f.Rectangle.GET(85, 70, 198, 283), 8, ƒ.Vector2.ZERO(), 64, ƒ.ORIGIN2D.BOTTOMCENTER);
            sprite.generateByGrid(f.Rectangle.GET(85, 70, 300, 283), 8, ƒ.Vector2.ZERO(), 64, ƒ.ORIGIN2D.BOTTOMCENTER);
            Player.animations[ACTION.JUMP] = sprite;
            for (let i: number = 0; i < 8; i++) {
                sprite.frames[i].timeScale = 1.5;
            }

            sprite = new fAid.SpriteSheetAnimation(ACTION.WALK, _spritesheet);
            sprite.generateByGrid(f.Rectangle.GET(85, 455, 350, 283), 8, ƒ.Vector2.ZERO(), 64, ƒ.ORIGIN2D.BOTTOMCENTER);
            Player.animations[ACTION.WALK] = sprite;
            
            sprite = new fAid.SpriteSheetAnimation(ACTION.IDLE, _spritesheet);
            sprite.generateByGrid(f.Rectangle.GET(85, 850, 300, 250), 3, ƒ.Vector2.ZERO(), 64, ƒ.ORIGIN2D.BOTTOMCENTER);
            Player.animations[ACTION.IDLE] = sprite;
            for (let i: number = 0; i < 3; i++) {
                sprite.frames[i].timeScale = 12;
            }

            sprite = new fAid.SpriteSheetAnimation(ACTION.DIE, _spritesheet);
            sprite.generateByGrid(f.Rectangle.GET(85, 1000, 350, 283), 3, ƒ.Vector2.ZERO(), 64, ƒ.ORIGIN2D.BOTTOMCENTER);
            Player.animations[ACTION.DIE] = sprite;
           
            
        }

        public show(_action: ACTION): void {
            // show only the animation defined for the action
            this.setAnimation(<fAid.SpriteSheetAnimation>Player.animations[_action]);
            // if (_action == ACTION.JUMP)
            // return;
        }

        public act(_action: ACTION, _direction?: DIRECTION): void {
            switch (_action) {
                case ACTION.IDLE:
                    this.speed.x = 0;
                    break;
                case ACTION.WALK:
                    let direction: number = (_direction == DIRECTION.RIGHT ? 1 : -1);
                    this.speed.x = Player.maxSpeed.x;
                    this.cmpTransform.local.rotation = f.Vector3.Y(90 - 90 * direction);
                    break; 
                case ACTION.JUMP:
                    this.speed.y = 2.5;
                    this.speed.x = 2.5;
                    break;
                case ACTION.DIE:
                    this.speed.x = 0;
                    break;
            }

            if (_action == this.action)
            return;

            this.action = _action;
            this.show(_action);
        }

        private update = (_event: f.Eventƒ): void => {
            let timeFrame: number = ƒ.Loop.timeFrameGame / 1000;
            this.speed.y += Player.gravity.y * timeFrame;
            let distance: ƒ.Vector3 = ƒ.Vector3.SCALE(this.speed, timeFrame);
            this.cmpTransform.local.translate(distance);
      
            this.checkCollision();
        }

        private checkCollision(): void {
            for (let platform of level.getChildren()) {
                let rect: f.Rectangle = (<Platform> platform).getRectWorld();
                let hit: boolean = rect.isInside(this.cmpTransform.local.translation.toVector2());
                
                if (hit) {
                    let translation: f.Vector3 = this.cmpTransform.local.translation;
                    translation.y = rect.y;
                    this.cmpTransform.local.translation = translation;
                    this.speed.y = 0;
                }
            }
        }

    }
}