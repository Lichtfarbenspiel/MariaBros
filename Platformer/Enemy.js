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
        constructor(_name = "Enemy", _platform, scaleX, scaleY, _maxSpeed, _type, _spritesheet) {
            super(_name);
            this.update = (_event) => {
                let timeFrame = ƒ.Loop.timeFrameGame / 1000;
                this.speed.y += Enemy.gravity.y * timeFrame;
                let distance = ƒ.Vector3.SCALE(this.speed, timeFrame);
                this.cmpTransform.local.translate(distance);
                this.checkPlatformCollision();
                this.checkObjectCollision();
                if (this.checkWalkingRange()) {
                    this.changeDirection();
                }
            };
            this.platform = _platform;
            this.maxSpeed = _maxSpeed;
            let pos = this.platform.cmpTransform.local.translation;
            this.addComponent(new f.ComponentTransform());
            this.cmpTransform.local.scaling = new f.Vector3(scaleX, scaleY, 0);
            this.cmpTransform.local.translate(new f.Vector3(pos.x, 0, 0));
            this.generateSprites(_spritesheet, _type);
            this.act(Platformer.ACTION.WALK, this.dir);
            f.Loop.addEventListener("loopFrame" /* LOOP_FRAME */, this.update);
        }
        generateSprites(_spritesheet, type) {
            Enemy.animations = {};
            let sprite = new fAid.SpriteSheetAnimation(Platformer.ACTION.WALK, _spritesheet);
            switch (type) {
                case ENEMY.FROG:
                    sprite.generateByGrid(f.Rectangle.GET(2, 4, 17, 12), 3, ƒ.Vector2.ZERO(), 64, ƒ.ORIGIN2D.BOTTOMCENTER);
                    Enemy.animations[Platformer.ACTION.WALK] = sprite;
                    for (let i = 0; i < 3; i++) {
                        sprite.frames[i].timeScale = 2.5;
                    }
                    break;
            }
        }
        show(_action) {
            // show only the animation defined for the action
            this.setAnimation(Enemy.animations[_action]);
        }
        act(_action, _direction) {
            this.speed.x = this.maxSpeed.x;
            let direction = (_direction == Platformer.DIRECTION.RIGHT ? 1 : -1);
            switch (_direction) {
                case Platformer.DIRECTION.LEFT:
                    this.dir = Platformer.DIRECTION.LEFT;
                    this.cmpTransform.local.rotation = f.Vector3.Y(90 - 90 * direction);
                    break;
                case Platformer.DIRECTION.RIGHT:
                    this.dir = Platformer.DIRECTION.RIGHT;
                    this.cmpTransform.local.rotation = f.Vector3.Y(90 - 90 * direction);
                    break;
            }
            this.show(_action);
        }
        changeDirection() {
            if (this.dir == Platformer.DIRECTION.LEFT)
                this.act(Platformer.ACTION.WALK, Platformer.DIRECTION.RIGHT);
            else if (this.dir == Platformer.DIRECTION.RIGHT)
                this.act(Platformer.ACTION.WALK, Platformer.DIRECTION.LEFT);
        }
        checkWalkingRange() {
            let rectPlatform = (this.platform).getRectWorld();
            let hitPlatform = rectPlatform.isInside(this.cmpTransform.local.translation.toVector2());
            // let rectObject: f.Rectangle = (this.Object).getRectWorld();
            // let hitObject: boolean = rectObject.isInside(this.cmpTransform.local.translation.toVector2());
            if (hitPlatform) {
                return false;
            }
            return true;
        }
    }
    Platformer.Enemy = Enemy;
})(Platformer || (Platformer = {}));
//# sourceMappingURL=Enemy.js.map