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
        ACTION["FALL"] = "fall";
    })(ACTION = Platformer.ACTION || (Platformer.ACTION = {}));
    class Character extends fAid.NodeSprite {
        constructor(_name = "Character") {
            super(_name);
            this.dir = DIRECTION.RIGHT;
            this.speed = f.Vector3.ZERO();
            this.isDead = false;
            this.isIdle = true;
            this.isAttacking = false;
            this.isDrowning = false;
            this.attackRange = 0.5;
        }
        handleAttack(damage) {
            if (!this.isDead) {
                if (this.healthPoints > 0)
                    this.healthPoints -= damage;
                {
                    this.isDead = true;
                }
            }
        }
        getRectWorld() {
            let rect = f.Rectangle.GET(0, 0, this.scaleX, this.scaleY);
            let topLeft = new f.Vector3(-0.5, 0.5, 0);
            let bottomRight = new f.Vector3(0.5, -0.5, 0);
            let mtxResult = f.Matrix4x4.MULTIPLICATION(this.mtxWorld, Character.pivot);
            topLeft.transform(mtxResult, true);
            bottomRight.transform(mtxResult, true);
            let size = new f.Vector2(bottomRight.x - topLeft.x, bottomRight.y - topLeft.y);
            rect.position = topLeft.toVector2();
            rect.size = size;
            return rect;
        }
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
                    if (platform == Platformer.level.getChild(0)) {
                        this.isDrowning = true;
                    }
                }
            }
        }
        checkObjectCollision() {
            for (let object of Platformer.objects.getChildren()) {
                let rect = object.getRectWorld();
                let hit = rect.isInside(this.cmpTransform.local.translation.toVector2());
                if (object.type != Platformer.OBJECT.BOX) {
                    hit = false;
                }
                if (hit) {
                    let translation = this.cmpTransform.local.translation;
                    translation.y = rect.y;
                    this.cmpTransform.local.translation = translation;
                    this.isIdle = true;
                    this.speed.y = 0;
                    return object;
                }
            }
            return null;
        }
    }
    Character.gravity = f.Vector2.Y(-8);
    Character.pivot = ƒ.Matrix4x4.TRANSLATION(ƒ.Vector3.Y(-0.5));
    Platformer.Character = Character;
})(Platformer || (Platformer = {}));
//# sourceMappingURL=Character.js.map