namespace Platformer {
    import f = FudgeCore;
    import fAid = FudgeAid;

    export enum ENEMY {
        FROG = "frog"
    }

    
    export class Enemy extends Character {

        // private static animations: fAid.SpriteSheetAnimations;
        private platform: Platform;

        constructor(_name: string = "Enemy", _platform: Platform, scaleX: number, scaleY: number, _maxSpeed: f.Vector2, _type: ENEMY, _spritesheet: f.CoatTextured) {
            super(_name);

            this.platform = _platform;
            this.maxSpeed = _maxSpeed;

            let pos: f.Vector3 = this.platform.cmpTransform.local.translation;

            this.addComponent(new f.ComponentTransform());
            this.cmpTransform.local.scaling = new f.Vector3(scaleX, scaleY, 0);
            this.cmpTransform.local.translate(new f.Vector3(pos.x, 0, 0));

            this.generateSprites(_spritesheet, _type);

            this.act(ACTION.WALK, this.dir);
            f.Loop.addEventListener(f.EVENT.LOOP_FRAME, this.update);
        }


        public generateSprites(_spritesheet: f.CoatTextured, type: ENEMY): void {
            Enemy.animations = {};

            let sprite: fAid.SpriteSheetAnimation = new fAid.SpriteSheetAnimation(ACTION.WALK, _spritesheet);
            switch (type) {
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

        
        private update = (_event: f.Eventƒ): void => {
            let timeFrame: number = ƒ.Loop.timeFrameGame / 1000;
            this.speed.y += Enemy.gravity.y * timeFrame;
            let distance: ƒ.Vector3 = ƒ.Vector3.SCALE(this.speed, timeFrame);
            this.cmpTransform.local.translate(distance);
            
            this.checkPlatformCollision();
            if (this.checkWalkingRange()) {
                this.changeDirection();
            }
        }

        private changeDirection(): void {
            if (this.dir == DIRECTION.LEFT)
                this.act(ACTION.WALK, DIRECTION.RIGHT);
            else if (this.dir == DIRECTION.RIGHT)
                this.act(ACTION.WALK, DIRECTION.LEFT);
        }

        private checkWalkingRange(): boolean {
            let rect: f.Rectangle = (this.platform).getRectWorld();
            let hit: boolean = rect.isInside(this.cmpTransform.local.translation.toVector2());
            
            if (hit) {
                return false;
            }
            return true;
        }
    }
}