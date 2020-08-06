"use strict";
var Platformer;
(function (Platformer) {
    var f = FudgeCore;
    var fAid = FudgeAid;
    class Player extends Platformer.Character {
        constructor(_name = "Player", _scaleX, _scaleY, _maxSpeed, _hp) {
            super(_name);
            this.isJumping = true;
            this.wealth = 0;
            this.update = (_event) => {
                let timeFrame = ƒ.Loop.timeFrameGame / 1000;
                this.speed.y += Player.gravity.y * timeFrame;
                let distance = ƒ.Vector3.SCALE(this.speed, timeFrame);
                this.cmpTransform.local.translate(distance);
                this.checkCollectable();
                console.log(this.wealth);
                super.checkPlatformCollision();
                this.checkObjectCollision();
                this.checkEnemyCollision();
            };
            this.maxSpeed = _maxSpeed;
            this.scaleX = _scaleX;
            this.scaleY = _scaleY;
            this.healthPoints = _hp;
            this.addComponent(new f.ComponentTransform());
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
                    if (this.speed.y <= 1) {
                        this.isIdle = false;
                        this.speed.y = 8;
                        Platformer.Sound.play("jump");
                    }
                    break;
                case Platformer.ACTION.ATTACK:
                    this.isIdle = false;
                    this.isAttacking = true;
                    Platformer.Sound.play("attack");
                    // this.attack(this.enemy);
                    break;
            }
            if (_action == this.action)
                return;
            this.action = _action;
            this.show(_action);
        }
        checkCollectable() {
            for (let collectable of Platformer.collectables.getChildren()) {
                let collectPos = collectable.cmpTransform.local.translation;
                let characterPos = this.cmpTransform.local.translation;
                characterPos.y += 0.5;
                let difference = f.Vector3.DIFFERENCE(collectPos, characterPos);
                let distance = Math.abs(Math.sqrt(difference.x * difference.x + difference.y * difference.y + difference.z * difference.z));
                if (distance <= 0.16) {
                    Platformer.Sound.play("collect");
                    if (this.healthPoints <= 4 && collectable.isHealing) {
                        this.healthPoints += 1;
                    }
                    else {
                        this.wealth += collectable.value;
                    }
                    Platformer.collectables.removeChild(collectable);
                }
            }
        }
        checkEnemyCollision() {
            for (let enemy of Platformer.enemies.getChildren()) {
                let enemyPos = enemy.cmpTransform.local.translation;
                let characterPos = this.cmpTransform.local.translation;
                // characterPos.y -= 0.5;
                let difference = f.Vector3.DIFFERENCE(enemyPos, characterPos);
                let distance = Math.abs(Math.sqrt(difference.x * difference.x + difference.y * difference.y + difference.z * difference.z));
                if (distance <= 0.16) {
                    this.handleEnemyCollision(enemy);
                }
            }
        }
        handleEnemyCollision(_enemy) {
            if (!this.isDead) {
                if (this.isAttacking) {
                    _enemy.isDead = true;
                    Platformer.enemies.removeChild(_enemy);
                    this.wealth += 10;
                }
                else {
                    this.healthPoints -= _enemy.strength;
                    console.log("HP: " + this.healthPoints);
                    _enemy.changeDirection();
                    if (this.healthPoints <= 0) {
                        this.speed.x = 0;
                        this.isDead = true;
                        _enemy.speed.x = 0;
                        this.show(Platformer.ACTION.DIE);
                        Platformer.gameOver();
                        console.log("Game Over");
                        // ƒ.Time.game.setTimer(5, 1, () => {
                        // });
                    }
                }
            }
        }
    }
    Platformer.Player = Player;
})(Platformer || (Platformer = {}));
//# sourceMappingURL=Player.js.map