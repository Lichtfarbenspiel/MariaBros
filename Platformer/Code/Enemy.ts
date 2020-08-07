namespace Platformer {
    import f = FudgeCore;
    import fAid = FudgeAid;
   

    export enum ENEMY {
        FROG = "frog"
    }

    
    export class Enemy extends Character {

        private platform: Platform;
        private platformNumber: number;
        private type: ENEMY;
        private spritesheet: f.CoatTextured;

        constructor(i: number) {
            super(enemyJSON[i].name);

            this.platform = <Platform>level.getChild(enemyJSON[i].platformNumber);
            this.maxSpeed = new f.Vector2(0.2, 2);
            this.strength = enemyJSON[i].strength;

            this.scaleX = enemyJSON[i].scaleX;
            this.scaleY = enemyJSON[i].scaleY;
            this.type = <ENEMY>enemyJSON[i].type;

            let pos: f.Vector3 = this.platform.cmpTransform.local.translation.copy;

            this.addComponent(new f.ComponentTransform(ƒ.Matrix4x4.TRANSLATION(new f.Vector3(pos.x, pos.y, 0))));
            this.cmpTransform.local.scaling = new f.Vector3(this.scaleX, this.scaleY, 0);

            let enemyIMG: HTMLImageElement = document.querySelector("img.enemy");
            this.spritesheet = fAid.createSpriteSheet("Enemy", enemyIMG);
           
            this.generateSprites();

            this.act(ACTION.WALK, this.dir);
            f.Loop.addEventListener(f.EVENT.LOOP_FRAME, this.update);
        }


        public generateSprites(): void {
            Enemy.animations = {};
            let sprite: fAid.SpriteSheetAnimation = new fAid.SpriteSheetAnimation(ACTION.WALK, this.spritesheet);
            switch (this.type) {
                case ENEMY.FROG:
                    sprite.generateByGrid(f.Rectangle.GET(2, 4, 17, 12), 3, ƒ.Vector2.ZERO(), 64, ƒ.ORIGIN2D.BOTTOMCENTER);
                    Enemy.animations[ACTION.WALK] = sprite;
                    for (let i: number = 0; i < 3; i++) {
                        sprite.frames[i].timeScale = 2.5;
                    }
                    break;
            }
        }


        public show(_action: ACTION): void {
            // show only the animation defined for the action
            this.setAnimation(<fAid.SpriteSheetAnimation>Enemy.animations[_action]);
        }

        public act(_action: ACTION, _direction?: DIRECTION): void {
            this.speed.x = this.maxSpeed.x;
            let direction: number = (_direction == DIRECTION.RIGHT ? 1 : -1);
            
            switch (_direction) {
                case DIRECTION.LEFT:
                    this.dir = DIRECTION.LEFT;
                    this.cmpTransform.local.rotation = f.Vector3.Y(90 - 90 * direction);
                    break;
                case DIRECTION.RIGHT:
                    this.dir = DIRECTION.RIGHT;
                    this.cmpTransform.local.rotation = f.Vector3.Y(90 - 90 * direction);
                    break;
            }
            
            this.show(_action);
        }

        public changeDirection(): void {
            if (this.dir == DIRECTION.LEFT)
                this.act(ACTION.WALK, DIRECTION.RIGHT);
            else if (this.dir == DIRECTION.RIGHT)
                this.act(ACTION.WALK, DIRECTION.LEFT);
        }

        
        private update = (_event: f.Eventƒ): void => {
            let timeFrame: number = ƒ.Loop.timeFrameGame / 1000;
            this.speed.y += Enemy.gravity.y * timeFrame;
            let distance: ƒ.Vector3 = ƒ.Vector3.SCALE(this.speed, timeFrame);
            this.cmpTransform.local.translate(distance);
            
            this.checkPlatformCollision();

            this.checkDrowning();
            this.checkWalkingRange();
        }

        private checkWalkingRange(): void {
            let rectPlatform: f.Rectangle = (this.platform).getRectWorld();
            let hitPlatform: boolean = rectPlatform.isInside(this.cmpTransform.local.translation.toVector2());

            // let rectObject: f.Rectangle = (this.object).getRectWorld();
            // let hitObject: boolean = rectObject.isInside(this.cmpTransform.local.translation.toVector2());
            
            if (!hitPlatform) {
                this.changeDirection();
            }
        }

        private checkDrowning(): void {
            if (this.isDrowning) {
                enemies.removeChild(this);
            }
        }
    }
}