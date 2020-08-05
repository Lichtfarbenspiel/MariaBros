namespace Platformer {
    import f = FudgeCore;
    import fAid = FudgeAid;

    export class Player extends Character {
        
        private enemy: Enemy;
        private wealth: number = 0;

        constructor(_name: string = "Player", _scaleX: number, _scaleY: number, _maxSpeed: f.Vector2) {
            super(_name);
            
            this.maxSpeed = _maxSpeed;
            this.scaleX = _scaleX;
            this.scaleY = _scaleY;

            this.addComponent(new f.ComponentTransform());
            // this.mtxWorld.translation = new f.Vector3(posX, posY, 0);
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
            // if (_action == ACTION.JUMP)
            // return;
        }

        public act(_action: ACTION, _direction?: DIRECTION): void {
            switch (_action) {
                case ACTION.IDLE:
                    this.isIdle = true;
                    this.speed.x = 0;
                    break;
                case ACTION.WALK:
                    this.isIdle = false;
                    let direction: number = (_direction == DIRECTION.RIGHT ? 1 : -1);
                    this.speed.x = this.maxSpeed.x;
                    this.cmpTransform.local.rotation = f.Vector3.Y(90 - 90 * direction);
                    break; 
                case ACTION.JUMP:
                    this.isIdle = false;
                    this.speed.y = 8;
                    break;
                case ACTION.ATTACK:
                    this.isIdle = false;
                    this.isAttacking = true;
                    // this.attack(this.enemy);
                    break;
                case ACTION.DIE:
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

        // public attack(_enemy: Character): void {
        //     let distanceSquared: number = f.Vector3.DIFFERENCE(this.mtxWorld.translation, _enemy.mtxWorld.translation).magnitudeSquared;
            
        //     if (distanceSquared > (this.attackRange * this.attackRange))
        //         return;
        //     {
        //         let damage: number = f.Random.default.getRange(0, 1) * (this.strength - 0.1) + 0.1;
        //         _enemy.handleAttack(damage);
        //     }
        // }

        private update = (_event: f.Eventƒ): void => {
            let timeFrame: number = ƒ.Loop.timeFrameGame / 1000;
            this.speed.y += Player.gravity.y * timeFrame;
            let distance: ƒ.Vector3 = ƒ.Vector3.SCALE(this.speed, timeFrame);
            this.cmpTransform.local.translate(distance);

            this.checkCollision(collectables);
            console.log(this.wealth);
            
            super.checkPlatformCollision();
            this.checkObjectCollision();
            // this.checkEnemyCollision();
            this.checkDeath();
            // this.checkEnemiesInRange();
        }

        private checkCollision(_collectable: f.Node): void {
            for (let collectable of _collectable.getChildren()) { 
                let collectPos: f.Vector3 = collectable.cmpTransform.local.translation;
                let characterPos: f.Vector3 = this.cmpTransform.local.translation;
                characterPos.y += 0.5;

                let difference: f.Vector3 = f.Vector3.DIFFERENCE(collectPos, characterPos);
                let distance: number = Math.abs(Math.sqrt(difference.x * difference.x + difference.y * difference.y + difference.z * difference.z));

                if (distance <= 0.16) {
                    this.wealth += (<Collectable>collectable).value;
                    collectables.removeChild(<Collectable>collectable);
                }
            }
        }

        private checkDeath(): void {
            if (this.isDead) {
                this. show(ACTION.DIE);
                this.speed.x = 0;
                //GAME OVER
            }
        }

        private checkEnemiesInRange(): void {
            let pos: f.Vector3 = this.mtxLocal.translation;
            for (let _enemy of enemies.getChildren()) {
                if (pos.isInsideSphere((<Enemy>_enemy).mtxLocal.translation, 0.5)) {
                    this.enemy = (<Enemy>_enemy);
                }
            }
        }
    }
}