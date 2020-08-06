"use strict";
var Platformer;
(function (Platformer) {
    var f = FudgeCore;
    var fAid = FudgeAid;
    let COLLECTABLE;
    (function (COLLECTABLE) {
        COLLECTABLE["COIN_GOLD"] = "coin_gold";
        COLLECTABLE["COIN_GREEN"] = "coin_green";
        COLLECTABLE["COIN_RED"] = "coin_red";
    })(COLLECTABLE = Platformer.COLLECTABLE || (Platformer.COLLECTABLE = {}));
    let ACTION;
    (function (ACTION) {
        ACTION["SPINNING"] = "spinning";
    })(ACTION = Platformer.ACTION || (Platformer.ACTION = {}));
    class Collectable extends fAid.NodeSprite {
        constructor(_name, _posX, _posY, _scaleX, _scaleY, _type) {
            super(_name);
            this.isHealing = false;
            this.objectIMG = document.querySelectorAll("img.collectable");
            this.scaleX = _scaleX;
            this.scaleY = _scaleY;
            this.type = _type;
            this.scaleX = _scaleX;
            this.scaleY = _scaleY;
            this.addComponent(new f.ComponentTransform(ƒ.Matrix4x4.TRANSLATION(new f.Vector3(_posX, _posY, 0))));
            this.cmpTransform.local.scaling = new f.Vector3(_scaleX, _scaleY, 0);
            // this.mtxLocal.translate(new f.Vector3(_posX, _posY, 0));
            let spritesheet = this.getSprite(_type);
            this.generateSprites(spritesheet, _type);
            this.show(ACTION.SPINNING);
        }
        generateSprites(_spritesheet, type) {
            Collectable.animations = {};
            let sprite = new fAid.SpriteSheetAnimation(ACTION.SPINNING, _spritesheet);
            switch (type) {
                case COLLECTABLE.COIN_GOLD:
                    sprite.generateByGrid(f.Rectangle.GET(2.5, 2, 16, 16), 5, ƒ.Vector2.ZERO(), 64, ƒ.ORIGIN2D.BOTTOMCENTER);
                    Collectable.animations[ACTION.SPINNING] = sprite;
                    for (let i = 0; i < 5; i++) {
                        sprite.frames[i].timeScale = 2;
                    }
                    this.value = 10;
                    break;
                case COLLECTABLE.COIN_RED:
                    sprite.generateByGrid(f.Rectangle.GET(2.5, 2, 16, 16), 5, ƒ.Vector2.ZERO(), 64, ƒ.ORIGIN2D.BOTTOMCENTER);
                    Collectable.animations[ACTION.SPINNING] = sprite;
                    for (let i = 0; i < 5; i++) {
                        sprite.frames[i].timeScale = 2;
                    }
                    this.value = -8;
                    break;
                case COLLECTABLE.COIN_GREEN:
                    this.cmpTransform.local.scale(new f.Vector3(1.5, 1.5, 0));
                    sprite.generateByGrid(f.Rectangle.GET(3.5, 3, 17, 15), 4, ƒ.Vector2.ZERO(), 64, ƒ.ORIGIN2D.BOTTOMCENTER);
                    Collectable.animations[ACTION.SPINNING] = sprite;
                    for (let i = 0; i < 4; i++) {
                        sprite.frames[i].timeScale = 3;
                    }
                    this.isHealing = true;
                    this.value = 15;
                    break;
            }
        }
        getRectWorld() {
            let rect = ƒ.Rectangle.GET(0, 0, 100, 100);
            let topLeft = new ƒ.Vector3(-0.5, 0.5, 0);
            let bottomRight = new ƒ.Vector3(0.5, -0.5, 0);
            let mtxResult = f.Matrix4x4.MULTIPLICATION(this.mtxWorld, Collectable.pivot);
            topLeft.transform(mtxResult, true);
            bottomRight.transform(mtxResult, true);
            let size = new f.Vector2(bottomRight.x - topLeft.x, bottomRight.y - topLeft.y);
            rect.position = topLeft.toVector2();
            rect.size = size;
            return rect;
        }
        show(_action) {
            // show only the animation defined for the action
            this.setAnimation(Collectable.animations[_action]);
        }
        getSprite(type) {
            let collectableIMG = document.querySelectorAll("img.collectable");
            let sprite;
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
    Collectable.pivot = ƒ.Matrix4x4.TRANSLATION(ƒ.Vector3.Y(0));
    Platformer.Collectable = Collectable;
})(Platformer || (Platformer = {}));
//# sourceMappingURL=Collectable.js.map