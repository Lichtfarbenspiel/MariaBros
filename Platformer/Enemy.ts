namespace Platformer {
    import f = FudgeCore;
    import fAid = FudgeAid;

    export enum ENEMY {
        FROG = "frog"
    }

    
    export class Enemy extends Character {

        // private static animations: fAid.SpriteSheetAnimations;

        constructor(_name: string = "Enemy", posX: number, posY: number, scaleX: number, scaleY: number, _type: ENEMY, _spritesheet: f.CoatTextured) {
            super(_name);

            this.addComponent(new f.ComponentTransform());
            this.cmpTransform.local.scaling = new f.Vector3(scaleX, scaleY, 0);
            this.cmpTransform.local.translate(new f.Vector3(posX, posY, 0));

            this.generateSprites(_spritesheet, _type);

            this.show(ACTION.WALK);
            f.Loop.addEventListener(f.EVENT.LOOP_FRAME, this.update);
        }


        public generateSprites(_spritesheet: f.CoatTextured, type: ENEMY): void {
            Enemy.animations = {};

            let sprite: fAid.SpriteSheetAnimation = new fAid.SpriteSheetAnimation(ACTION.WALK, _spritesheet);
            switch (type) {
                case ENEMY.FROG:
                    sprite.generateByGrid(f.Rectangle.GET(3, 4, 16.3, 12), 3, ƒ.Vector2.ZERO(), 64, ƒ.ORIGIN2D.BOTTOMCENTER);
                    Enemy.animations[ACTION.WALK] = sprite;
                    for (let i: number = 0; i < 3; i++) {
                        sprite.frames[i].timeScale = 2.5;
                    }
                    break;
            }

            
            
            // for (let i: number = 0; i < 8; i++) {
            //     sprite.frames[i].timeScale = 2.5;
            // }
            
        }


        public show(_action: ACTION): void {
            // show only the animation defined for the action
            this.setAnimation(<fAid.SpriteSheetAnimation>Enemy.animations[_action]);
            // if (_action == ACTION.JUMP)
            // return;
        }

        public act(_action: ACTION, _direction?: DIRECTION): void {
            
            
            if (_action == this.action)
            return;
            this.action = _action;
            this.show(_action);
        }

        
        private update = (_event: f.Eventƒ): void => {
            let timeFrame: number = ƒ.Loop.timeFrameGame / 1000;
            this.speed.y += Enemy.gravity.y * timeFrame;
            let distance: ƒ.Vector3 = ƒ.Vector3.SCALE(this.speed, timeFrame);
            this.cmpTransform.local.translate(distance);
            
            super.checkPlatformCollision();
        }
    }
}