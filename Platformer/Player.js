"use strict";
var Platformer;
(function (Platformer) {
    var f = FudgeCore;
    var fAid = FudgeAid;
    // export enum DIRECTION {
    //     LEFT, RIGHT
    // }
    class Player extends Platformer.Character {
        // private static animations: fAid.SpriteSheetAnimations;
        // private maxSpeed: f.Vector2 = new f.Vector2(5, 5);
        // private static gravity: f.Vector2 = f.Vector2.Y(-3.5);
        // public dir: DIRECTION = DIRECTION.RIGHT;
        // public speed: f.Vector3 = f.Vector3.ZERO();
        // public isDead: boolean = false;
        // public isIdle: boolean = true;
        constructor(_name = "Player", scaleX, scaleY, _maxSpeed) {
            super(_name);
            this.update = (_event) => {
                let timeFrame = ƒ.Loop.timeFrameGame / 1000;
                this.speed.y += Player.gravity.y * timeFrame;
                let distance = ƒ.Vector3.SCALE(this.speed, timeFrame);
                this.cmpTransform.local.translate(distance);
                super.checkPlatformCollision();
                this.checkObjectCollision();
            };
            this.maxSpeed = _maxSpeed;
            this.addComponent(new f.ComponentTransform());
            // this.mtxWorld.translation = new f.Vector3(posX, posY, 0);
            this.cmpTransform.local.scaling = new f.Vector3(scaleX, scaleY, 0);
            this.cmpTransform.local.translateY(-1);
            this.show(Platformer.ACTION.IDLE);
            f.Loop.addEventListener("loopFrame" /* LOOP_FRAME */, this.update);
        }
        static generateSprites(_spritesheet) {
            Player.animations = {};
            let sprite = new fAid.SpriteSheetAnimation(Platformer.ACTION.IDLE, _spritesheet);
            // sprite.generateByGrid(f.Rectangle.GET(85, 70, 198, 283), 8, ƒ.Vector2.ZERO(), 64, ƒ.ORIGIN2D.BOTTOMCENTER);
            sprite.generateByGrid(f.Rectangle.GET(85, 70, 300, 283), 8, ƒ.Vector2.ZERO(), 64, ƒ.ORIGIN2D.BOTTOMCENTER);
            Player.animations[Platformer.ACTION.IDLE] = sprite;
            for (let i = 0; i < 8; i++) {
                sprite.frames[i].timeScale = 2.5;
            }
            sprite = new fAid.SpriteSheetAnimation(Platformer.ACTION.WALK, _spritesheet);
            sprite.generateByGrid(f.Rectangle.GET(85, 455, 350, 283), 8, ƒ.Vector2.ZERO(), 64, ƒ.ORIGIN2D.BOTTOMCENTER);
            Player.animations[Platformer.ACTION.WALK] = sprite;
            sprite = new fAid.SpriteSheetAnimation(Platformer.ACTION.JUMP, _spritesheet);
            sprite.generateByGrid(f.Rectangle.GET(85, 850, 300, 250), 3, ƒ.Vector2.ZERO(), 64, ƒ.ORIGIN2D.BOTTOMCENTER);
            Player.animations[Platformer.ACTION.JUMP] = sprite;
            for (let i = 0; i < 3; i++) {
                sprite.frames[i].timeScale = 3;
            }
            sprite = new fAid.SpriteSheetAnimation(Platformer.ACTION.ATTACK, _spritesheet);
            sprite.generateByGrid(f.Rectangle.GET(85, 1570, 360, 283), 8, ƒ.Vector2.ZERO(), 64, ƒ.ORIGIN2D.BOTTOMCENTER);
            Player.animations[Platformer.ACTION.ATTACK] = sprite;
            for (let i = 0; i < 8; i++) {
                sprite.frames[i].timeScale = 2;
            }
            sprite = new fAid.SpriteSheetAnimation(Platformer.ACTION.DIE, _spritesheet);
            sprite.generateByGrid(f.Rectangle.GET(85, 1170, 380, 283), 3, ƒ.Vector2.ZERO(), 64, ƒ.ORIGIN2D.BOTTOMCENTER);
            Player.animations[Platformer.ACTION.DIE] = sprite;
            for (let i = 0; i < 3; i++) {
                sprite.frames[i].timeScale = 10;
            }
        }
        show(_action) {
            // show only the animation defined for the action
            this.setAnimation(Player.animations[_action]);
            // if (_action == ACTION.JUMP)
            // return;
        }
        act(_action, _direction) {
            switch (_action) {
                case Platformer.ACTION.IDLE:
                    this.speed.x = 0;
                    break;
                case Platformer.ACTION.WALK:
                    this.isIdle = false;
                    let direction = (_direction == Platformer.DIRECTION.RIGHT ? 1 : -1);
                    this.speed.x = this.maxSpeed.x;
                    this.cmpTransform.local.rotation = f.Vector3.Y(90 - 90 * direction);
                    break;
                case Platformer.ACTION.JUMP:
                    this.isIdle = false;
                    this.speed.y = 2.5;
                    break;
                case Platformer.ACTION.DIE:
                    this.isIdle = false;
                    this.isDead = true;
                    this.speed.x = 0;
                    break;
            }
            if (_action == this.action)
                return;
            this.action = _action;
            this.show(_action);
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
                }
            }
        }
    }
    Platformer.Player = Player;
})(Platformer || (Platformer = {}));
//# sourceMappingURL=Player.js.map