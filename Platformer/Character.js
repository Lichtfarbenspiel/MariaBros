"use strict";
var Platformer;
(function (Platformer) {
    var f = FudgeCore;
    var fAid = FudgeAid;
    let DIRECTION;
    (function (DIRECTION) {
        DIRECTION[DIRECTION["LEFT"] = 0] = "LEFT";
        DIRECTION[DIRECTION["RIGHT"] = 1] = "RIGHT";
    })(DIRECTION = Platformer.DIRECTION || (Platformer.DIRECTION = {}));
    let ACTION;
    (function (ACTION) {
        ACTION["IDLE"] = "idle";
        ACTION["WALK"] = "walk";
        ACTION["JUMP"] = "jump";
        ACTION["ATTACK"] = "attack";
        ACTION["DIE"] = "die";
    })(ACTION = Platformer.ACTION || (Platformer.ACTION = {}));
    class Character extends fAid.NodeSprite {
        // private rect: f.Rectangle;
        constructor(_name = "Character") {
            super(_name);
            this.dir = DIRECTION.RIGHT;
            this.speed = f.Vector3.ZERO();
            this.isDead = false;
            this.isIdle = true;
        }
        // protected update = (_event: f.Eventƒ): void => {
        //     let timeFrame: number = ƒ.Loop.timeFrameGame / 1000;
        //     this.speed.y += Character.gravity.y * timeFrame;
        //     let distance: ƒ.Vector3 = ƒ.Vector3.SCALE(this.speed, timeFrame);
        //     this.cmpTransform.local.translate(distance);
        //     this.checkPlatformCollision();
        // }
        checkPlatformCollision() {
            for (let platform of Platformer.level.getChildren()) {
                let rect = platform.getRectWorld();
                let hit = rect.isInside(this.cmpTransform.local.translation.toVector2());
                if (platform.type == Platformer.TYPE.WATER || platform.type == Platformer.TYPE.UNDERWATER || platform.type == Platformer.TYPE.MIDDLEGROUND || platform.type == Platformer.TYPE.UNDERGROUND) {
                    hit = false;
                }
                if (hit) {
                    let translation = this.cmpTransform.local.translation;
                    translation.y = rect.y;
                    this.cmpTransform.local.translation = translation;
                    this.isIdle = true;
                    this.speed.y = 0;
                }
            }
        }
    }
    Character.gravity = f.Vector2.Y(-4);
    Platformer.Character = Character;
})(Platformer || (Platformer = {}));
//# sourceMappingURL=Character.js.map