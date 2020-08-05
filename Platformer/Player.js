"use strict";
var Platformer;
(function (Platformer) {
    var f = FudgeCore;
    var fAid = FudgeAid;
    class Player extends Platformer.Character {
        constructor(_name = "Player", _scaleX, _scaleY, _maxSpeed) {
            super(_name);
            this.wealth = 0;
            // public attack(_enemy: Character): void {
            //     let distanceSquared: number = f.Vector3.DIFFERENCE(this.mtxWorld.translation, _enemy.mtxWorld.translation).magnitudeSquared;
            //     if (distanceSquared > (this.attackRange * this.attackRange))
            //         return;
            //     {
            //         let damage: number = f.Random.default.getRange(0, 1) * (this.strength - 0.1) + 0.1;
            //         _enemy.handleAttack(damage);
            //     }
            // }
            this.update = (_event) => {
                let timeFrame = ƒ.Loop.timeFrameGame / 1000;
                this.speed.y += Player.gravity.y * timeFrame;
                let distance = ƒ.Vector3.SCALE(this.speed, timeFrame);
                this.cmpTransform.local.translate(distance);
                this.checkCollision(Platformer.collectables);
                console.log(this.wealth);
                super.checkPlatformCollision();
                this.checkObjectCollision();
                // this.checkEnemyCollision();
                this.checkDeath();
                // this.checkEnemiesInRange();
            };
            this.maxSpeed = _maxSpeed;
            this.scaleX = _scaleX;
            this.scaleY = _scaleY;
            this.addComponent(new f.ComponentTransform());
            // this.mtxWorld.translation = new f.Vector3(posX, posY, 0);
            this.cmpTransform.local.scaling = new f.Vector3(this.scaleX, this.scaleY, 0);
            this.cmpTransform.local.translateY(-1);
            this.show(Platformer.ACTION.IDLE);
            f.Loop.addEventListener("loopFrame" /* LOOP_FRAME */, this.update);
        }
        static generateSprites(_spritesheet) {
            Player.animations = {};
            let sprite = new fAid.SpriteSheetAnimation(Platformer.ACTION.IDLE, _spritesheet);
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
                    this.isIdle = true;
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
                    this.speed.y = 8;
                    break;
                case Platformer.ACTION.ATTACK:
                    this.isIdle = false;
                    this.isAttacking = true;
                    // this.attack(this.enemy);
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
        checkCollision(_collectable) {
            for (let collectable of _collectable.getChildren()) {
                let collectPos = collectable.cmpTransform.local.translation;
                let characterPos = this.cmpTransform.local.translation;
                characterPos.y += 0.5;
                let difference = f.Vector3.DIFFERENCE(collectPos, characterPos);
                let distance = Math.abs(Math.sqrt(difference.x * difference.x + difference.y * difference.y + difference.z * difference.z));
                if (distance <= 0.16) {
                    this.wealth += collectable.value;
                    Platformer.collectables.removeChild(collectable);
                }
            }
        }
        checkDeath() {
            if (this.isDead) {
                this.show(Platformer.ACTION.DIE);
                this.speed.x = 0;
                //GAME OVER
            }
        }
        checkEnemiesInRange() {
            let pos = this.mtxLocal.translation;
            for (let _enemy of Platformer.enemies.getChildren()) {
                if (pos.isInsideSphere(_enemy.mtxLocal.translation, 0.5)) {
                    this.enemy = _enemy;
                }
            }
        }
    }
    Platformer.Player = Player;
})(Platformer || (Platformer = {}));
//# sourceMappingURL=Player.js.map