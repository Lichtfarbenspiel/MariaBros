namespace Platformer {
    import f = FudgeCore;
    import fAid = FudgeAid;

    export enum COLLECTABLE {
        COIN_GOLD = "coin_gold",
        COIN_GREEN = "coin_green", 
        COIN_RED = "coin_red"
    }

    export enum ACTION {
        SPINNING = "spinning"
    }

    export class Collectable extends fAid.NodeSprite {
        protected static animations: fAid.SpriteSheetAnimations;
        private static readonly pivot: ƒ.Matrix4x4 = ƒ.Matrix4x4.TRANSLATION(ƒ.Vector3.Y(0));

        public scaleX: number;
        public scaleY: number;
        public type: COLLECTABLE;
        public value: number;
        public isHealing: boolean = false;

        private objectIMG: NodeListOf<HTMLImageElement> = document.querySelectorAll("img.collectable");

        public constructor(_name: string, _posX: number,_posY: number, _scaleX: number, _scaleY: number, _type: COLLECTABLE) {
            
            super(_name);
    
            this.scaleX = _scaleX;
            this.scaleY = _scaleY;
            this.type = _type;

            this.scaleX = _scaleX;
            this.scaleY = _scaleY;


            this.addComponent(new f.ComponentTransform());
            this.cmpTransform.local.scaling = new f.Vector3(_scaleX, _scaleY, 0);
            this.mtxLocal.translate(new f.Vector3(_posX, _posY, 0));

            let spritesheet: f.CoatTextured = this.getSprite(_type);

            this.generateSprites(spritesheet, _type);

            this.show(ACTION.SPINNING);
        }

        public generateSprites(_spritesheet: f.CoatTextured, type: COLLECTABLE): void {
            Collectable.animations = {};

            let sprite: fAid.SpriteSheetAnimation = new fAid.SpriteSheetAnimation(ACTION.SPINNING, _spritesheet);
            switch (type) {
                case COLLECTABLE.COIN_GOLD:
                    sprite.generateByGrid(f.Rectangle.GET(2.5, 2, 16, 16), 5, ƒ.Vector2.ZERO(), 64, ƒ.ORIGIN2D.BOTTOMCENTER);
                    Collectable.animations[ACTION.SPINNING] = sprite;
                    for (let i: number = 0; i < 5; i++) {
                        sprite.frames[i].timeScale = 2;
                    }
                    this.value = 10;
                    break;
                case COLLECTABLE.COIN_RED:
                    sprite.generateByGrid(f.Rectangle.GET(2.5, 2, 16, 16), 5, ƒ.Vector2.ZERO(), 64, ƒ.ORIGIN2D.BOTTOMCENTER);
                    Collectable.animations[ACTION.SPINNING] = sprite;
                    for (let i: number = 0; i < 5; i++) {
                        sprite.frames[i].timeScale = 2;
                    }
                    this.value = -8;
                    break;
                case COLLECTABLE.COIN_GREEN:
                    this.cmpTransform.local.scale(new f.Vector3(1.5, 1.5, 0));
                    sprite.generateByGrid(f.Rectangle.GET(3.5, 3, 17, 15), 4, ƒ.Vector2.ZERO(), 64, ƒ.ORIGIN2D.BOTTOMCENTER);
                    Collectable.animations[ACTION.SPINNING] = sprite;
                    for (let i: number = 0; i < 4; i++) {
                        sprite.frames[i].timeScale = 3;
                    }
                    this.isHealing = true;
                    this.value = 15;
                    break;
            }
        }

        public getRectWorld(): f.Rectangle {
            let rect: ƒ.Rectangle = ƒ.Rectangle.GET(0, 0, 100, 100);
            let topLeft: ƒ.Vector3 = new ƒ.Vector3(-0.5, 0.5, 0);
            let bottomRight: ƒ.Vector3 = new ƒ.Vector3(0.5, -0.5, 0);

            let mtxResult: f.Matrix4x4 = f.Matrix4x4.MULTIPLICATION(this.mtxWorld, Collectable.pivot);
            topLeft.transform(mtxResult, true);
            bottomRight.transform(mtxResult, true);

            let size: f.Vector2 = new f.Vector2(bottomRight.x - topLeft.x, bottomRight.y - topLeft.y);
            rect.position = topLeft.toVector2();
            rect.size = size;

            return rect;
        }

        public show(_action: ACTION): void {
            // show only the animation defined for the action
            this.setAnimation(<fAid.SpriteSheetAnimation>Collectable.animations[_action]);
        }
 

        private getSprite(type: COLLECTABLE): f.CoatTextured {
            
            let collectableIMG: NodeListOf<HTMLImageElement> = document.querySelectorAll("img.collectable");
            let sprite: f.CoatTextured;
            switch (type) {
                case COLLECTABLE.COIN_GOLD:
                    sprite = fAid.createSpriteSheet("Enemy", collectableIMG[0]);
                    break;
                case COLLECTABLE.COIN_GREEN:
                    sprite = fAid.createSpriteSheet("Enemy", collectableIMG[1]);
                    break;
                case COLLECTABLE.COIN_RED:
                    sprite = fAid.createSpriteSheet("Enemy", collectableIMG[2]);
                    break;
            }
            return sprite;
        }

    }
}