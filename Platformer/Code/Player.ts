namespace Platformer {
    import f = FudgeCore;
    import fAid = FudgeAid;

    export class Player extends Character {
        
        public isJumping: boolean = true;
        public wealth: number = 0;

        constructor(_name: string = "Player", _scaleX: number, _scaleY: number, _maxSpeed: f.Vector2, _hp: number) {
            super(_name);
            
            this.maxSpeed = _maxSpeed;
            this.scaleX = _scaleX;
            this.scaleY = _scaleY;
            this.healthPoints = _hp;

            this.addComponent(new f.ComponentTransform());
            this.cmpTransform.local.scaling = new f.Vector3(this.scaleX, this.scaleY, 0);
            this.cmpTransform.local.translateY(-1);


            this.show(ACTION.IDLE);
            f.Loop.addEventListener(f.EVENT.LOOP_FRAME, this.update);
        }

        public static generateSprites(_spritesheet: f.CoatTextured): void {
            Player.animations = {};

            let sprite: fAid.SpriteSheetAnimation = new fAid.SpriteSheetAnimation(ACTION.IDLE, _spritesheet);
            sprite.generateByGrid(f.Rectangle.GET(85, 70, 300, 283), 8, ƒ.Vector2.ZERO(), 64, ƒ.ORIGIN2D.BOTTOMCENTER);
            Player.animations[ACTION.IDLE] = sprite;
            for (let i: number = 0; i < 8; i++) {
                sprite.frames[i].timeScale = 2.5;
            }

            sprite = new fAid.SpriteSheetAnimation(ACTION.WALK, _spritesheet);
            sprite.generateByGrid(f.Rectangle.GET(85, 455, 350, 283), 8, ƒ.Vector2.ZERO(), 64, ƒ.ORIGIN2D.BOTTOMCENTER);
            Player.animations[ACTION.WALK] = sprite;
            
            sprite = new fAid.SpriteSheetAnimation(ACTION.JUMP, _spritesheet);
            sprite.generateByGrid(f.Rectangle.GET(85, 850, 300, 250), 3, ƒ.Vector2.ZERO(), 64, ƒ.ORIGIN2D.BOTTOMCENTER);
            Player.animations[ACTION.JUMP] = sprite;
            for (let i: number = 0; i < 3; i++) {
                sprite.frames[i].timeScale = 3;
            }

            sprite = new fAid.SpriteSheetAnimation(ACTION.ATTACK, _spritesheet);
            sprite.generateByGrid(f.Rectangle.GET(85, 1570, 360, 283), 8, ƒ.Vector2.ZERO(), 64, ƒ.ORIGIN2D.BOTTOMCENTER);
            Player.animations[ACTION.ATTACK] = sprite;
            for (let i: number = 0; i < 8; i++) {
                sprite.frames[i].timeScale = 2;
            }

            sprite = new fAid.SpriteSheetAnimation(ACTION.DIE, _spritesheet);
            sprite.generateByGrid(f.Rectangle.GET(85, 1170, 380, 283), 3, ƒ.Vector2.ZERO(), 64, ƒ.ORIGIN2D.BOTTOMCENTER);
            Player.animations[ACTION.DIE] = sprite;
            for (let i: number = 0; i < 3; i++) {
                sprite.frames[i].timeScale = 10 ;
            }
            
        }

        public show(_action: ACTION): void {
            // show only the animation defined for the action
            this.setAnimation(<fAid.SpriteSheetAnimation>Player.animations[_action]);
        }

        public act(_action: ACTION, _direction?: DIRECTION): void {
            switch (_action) {
                case ACTION.IDLE:
                    this.speed.x = 0;
                    this.isIdle = true;
                    break;
                case ACTION.WALK:
                    let direction: number = (_direction == DIRECTION.RIGHT ? 1 : -1);
                    this.speed.x = this.maxSpeed.x;
                    this.cmpTransform.local.rotation = f.Vector3.Y(90 - 90 * direction);
                    this.isIdle = false;
                    break; 
                case ACTION.JUMP:
                    if (this.speed.y <= 1) {
                        this.speed.y = 8;
                        this.isIdle = false;
                        Sound.play("jump");
                    }
                    break;
                case ACTION.ATTACK:
                    this.isAttacking = true;
                    this.isIdle = false;
                    Sound.play("attack");
                    ƒ.Time.game.setTimer(1500, 1, () => {
                        this.isAttacking = false;
                    });
                    break;
            }

            if (_action == this.action)
            return;

            this.action = _action;
            this.show(_action);
        }

        private update = (_event: f.Eventƒ): void => {
            let timeFrame: number = ƒ.Loop.timeFrameGame / 1000;
            this.speed.y += Player.gravity.y * timeFrame;
            let distance: ƒ.Vector3 = ƒ.Vector3.SCALE(this.speed, timeFrame);
            this.cmpTransform.local.translate(distance);

            console.log("is Drowning: " + this.isDrowning);

            this.checkCollectable();
            
            super.checkPlatformCollision();
            this.checkObjectCollision();
            this.checkEnemyCollision();
            this.checkDrowning();

            this.displayStats();
        }

        private checkCollectable(): void {
            for (let collectable of collectables.getChildren()) { 
                let collectPos: f.Vector3 = collectable.cmpTransform.local.translation;
                let characterPos: f.Vector3 = this.cmpTransform.local.translation;
                characterPos.y += 0.5;

                let difference: f.Vector3 = f.Vector3.DIFFERENCE(collectPos, characterPos);
                let distance: number = Math.abs(Math.sqrt(difference.x * difference.x + difference.y * difference.y + difference.z * difference.z));

                if (distance <= 0.16) {
                    Sound.play("collect");
                    if ((<Collectable>collectable).isHealing) {
                        if (this.healthPoints <= 2)
                            this.healthPoints += 1;
                        else 
                        this.wealth += (<Collectable>collectable).value;
                    }
                    else {
                        this.wealth += (<Collectable>collectable).value;
                    }

                    collectables.removeChild(<Collectable>collectable);

                    if ((<Collectable>collectable).type == COLLECTABLE.GEM_GOLD) {
                        ƒ.Time.game.setTimer(1500, 1, () => {
                            gameFinished();
                            console.log("Game Finished!");
                        });
                    }
                }
            }
        }

        private checkEnemyCollision(): void {
            for (let enemy of enemies.getChildren()) { 
                let enemyPos: f.Vector3 = enemy.cmpTransform.local.translation;
                let characterPos: f.Vector3 = this.cmpTransform.local.translation;

                let difference: f.Vector3 = f.Vector3.DIFFERENCE(enemyPos, characterPos);
                let distance: number = Math.abs(Math.sqrt(difference.x * difference.x + difference.y * difference.y + difference.z * difference.z));

                if (distance <= 0.16) {
                    this.handleEnemyCollision((<Enemy>enemy));
                    Sound.play("frog");
                }
            }
        }

        private handleEnemyCollision(_enemy: Enemy): void {
            if (!this.isDead) {
                if (this.isAttacking) {
                    _enemy.isDead = true;
                    enemies.removeChild(_enemy);
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
                        
                        this.show(ACTION.DIE);
                        Sound.play("die");
                        ƒ.Time.game.setTimer(2500, 1, () => {
                            gameOver();
                            console.log("Game Over");
                        });
                    }
                }
            }
        }

        protected checkDrowning(): void {
            if (this.isDrowning) {
                this.isDead = true;
                this.healthPoints = 0;
                Sound.play("die");
                ƒ.Time.game.setTimer(250, 1, () => {
                    gameOver();
                    console.log("Game Over");
                });
                
                // if (this.healthPoints >= 1) {
                //     this.cmpTransform.local.translation.y = 7;
                // }
                // else {
                //     this.isDead = true;
                //     this.healthPoints = 0;
                //     Sound.play("die");
                //     ƒ.Time.game.setTimer(2500, 1, () => {
                //         gameOver();
                //         console.log("Game Over");
                //     });
                // }
            }
        }

        private displayStats(): void {
            document.getElementById("healthStats").innerHTML = "HP: " + this.healthPoints;
            document.getElementById("scoreStats").innerHTML = "SCORE: " + this.wealth;
        }
    }
}