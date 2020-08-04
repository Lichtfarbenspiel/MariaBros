namespace Platformer {
    import f = FudgeCore;
    import fAid = FudgeAid;
    

    export enum DIRECTION {
        LEFT, RIGHT
    }

    export enum ACTION {
        IDLE = "idle", 
        WALK = "walk",
        JUMP = "jump", 
        ATTACK = "attack", 
        DIE = "die",
        FALL = "fall"
    }

    export class Character extends fAid.NodeSprite {

        protected static animations: fAid.SpriteSheetAnimations;
        protected static gravity: f.Vector2 = f.Vector2.Y(-4);

        public dir: DIRECTION = DIRECTION.RIGHT;
        public speed: f.Vector3 = f.Vector3.ZERO();
        public isDead: boolean = false;
        public isIdle: boolean = true;
        public isAttacking: boolean = false;

        public healthPoints: number;
        public strength: number;
        public attackRange: number = 0.5;

        protected action: ACTION;
        protected maxSpeed: f.Vector2;

        

        constructor(_name: string = "Character") {
            super(_name);
        }

        // protected update = (_event: f.Eventƒ): void => {
        //     let timeFrame: number = ƒ.Loop.timeFrameGame / 1000;
        //     this.speed.y += Character.gravity.y * timeFrame;
        //     let distance: ƒ.Vector3 = ƒ.Vector3.SCALE(this.speed, timeFrame);
        //     this.cmpTransform.local.translate(distance);
            
        //     this.checkPlatformCollision();
        // }

        public handleAttack(damage: number): void {
            if (!this.isDead) {

                if (this.healthPoints >= 0) {
                    this.isDead = true;
                    
                    this.healthPoints -= damage;
                }   
            }
            else {
                game.removeChild(this);
            }
        }

        protected checkPlatformCollision(): void {
            for (let platform of level.getChildren()) { 
                let rect: f.Rectangle = (<Platform> platform).getRectWorld();
                let hit: boolean = rect.isInside(this.cmpTransform.local.translation.toVector2());

                if ((<Platform> platform).type == TYPE.WATER || (<Platform> platform).type == TYPE.UNDERWATER || (<Platform> platform).type == TYPE.MIDDLEGROUND  || (<Platform> platform).type == TYPE.UNDERGROUND ) {
                    hit = false;
                }
                
                if (hit) {
                    let translation: f.Vector3 = this.cmpTransform.local.translation;
                    translation.y = rect.y;
                    this.cmpTransform.local.translation = translation;
                    this.isIdle = true;
                    this.speed.y = 0;
                }
            }
        }

        protected checkObjectCollision(): Object {
            for (let object of objects.getChildren()) { 
                let rect: f.Rectangle = (<Object> object).getRectWorld();
                let hit: boolean = rect.isInside(this.cmpTransform.local.translation.toVector2());

                if ((<Object> object).type != OBJECT.BOX) {
                    hit = false;
                }
                
                if (hit) {
                    let translation: f.Vector3 = this.cmpTransform.local.translation;
                    translation.y = rect.y;
                    this.cmpTransform.local.translation = translation;
                    this.isIdle = true;
                    this.speed.y = 0;
                    return <Object>object;
                }
            }
            return null;
        }
    }
}