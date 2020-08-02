"use strict";
var Platformer;
(function (Platformer) {
    var f = FudgeCore;
    var fAid = FudgeAid;
    let ENEMY;
    (function (ENEMY) {
        ENEMY["FROG"] = "frog";
    })(ENEMY = Platformer.ENEMY || (Platformer.ENEMY = {}));
    class Enemy extends Platformer.Character {
        // private static animations: fAid.SpriteSheetAnimations;
        constructor(_name = "Enemy", posX, posY, scaleX, scaleY, _type, _spritesheet) {
            super(_name);
            this.update = (_event) => {
                let timeFrame = ƒ.Loop.timeFrameGame / 1000;
                this.speed.y += Enemy.gravity.y * timeFrame;
                let distance = ƒ.Vector3.SCALE(this.speed, timeFrame);
                this.cmpTransform.local.translate(distance);
                super.checkPlatformCollision();
            };
            this.addComponent(new f.ComponentTransform());
            this.cmpTransform.local.scaling = new f.Vector3(scaleX, scaleY, 0);
            this.cmpTransform.local.translate(new f.Vector3(posX, posY, 0));
            this.generateSprites(_spritesheet, _type);
            this.show(Platformer.ACTION.WALK);
            f.Loop.addEventListener("loopFrame" /* LOOP_FRAME */, this.update);
        }
        generateSprites(_spritesheet, type) {
            Enemy.animations = {};
            let sprite = new fAid.SpriteSheetAnimation(Platformer.ACTION.WALK, _spritesheet);
            switch (type) {
                case ENEMY.FROG:
                    sprite.generateByGrid(f.Rectangle.GET(3, 4, 16.3, 12), 3, ƒ.Vector2.ZERO(), 64, ƒ.ORIGIN2D.BOTTOMCENTER);
                    Enemy.animations[Platformer.ACTION.WALK] = sprite;
                    for (let i = 0; i < 3; i++) {
                        sprite.frames[i].timeScale = 2.5;
                    }
                    break;
            }
            // for (let i: number = 0; i < 8; i++) {
            //     sprite.frames[i].timeScale = 2.5;
            // }
        }
        show(_action) {
            // show only the animation defined for the action
            this.setAnimation(Enemy.animations[_action]);
            // if (_action == ACTION.JUMP)
            // return;
        }
        act(_action, _direction) {
            if (_action == this.action)
                return;
            this.action = _action;
            this.show(_action);
        }
    }
    Platformer.Enemy = Enemy;
})(Platformer || (Platformer = {}));
//# sourceMappingURL=Enemy.js.map