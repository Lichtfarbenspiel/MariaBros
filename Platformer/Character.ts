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
        DIE = "die"
    }

    export class Character extends fAid.NodeSprite {
        
        protected static animations: fAid.SpriteSheetAnimations;
        protected static maxSpeed: f.Vector2 = new f.Vector2(5, 5);
        protected static gravity: f.Vector2 = f.Vector2.Y(-3.5);

        public dir: DIRECTION = DIRECTION.RIGHT;
        public speed: f.Vector3 = f.Vector3.ZERO();
        public isDead: boolean = false;
        public isIdle: boolean = true;

        protected action: ACTION;

        // private rect: f.Rectangle;

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

    }
}