"use strict";
var Platformer;
(function (Platformer) {
    var f = FudgeCore;
    let TYPE;
    (function (TYPE) {
        TYPE["BUSH_1"] = "bush_1";
        TYPE["BUSH_2"] = "bush_2";
        TYPE["BUSH_3"] = "bush_3";
        TYPE["BUSH_4"] = "bush_4";
        TYPE["BOX"] = "box";
        TYPE["MUSHROOM_1"] = "mushroom_1";
        TYPE["MUSHROOM_2"] = "mushroom_2";
        TYPE["SIGN"] = "sign";
        TYPE["ARROW_SIGN"] = "arrow_sign";
        TYPE["STONE"] = "stone";
        TYPE["STUMP"] = "STUMP";
        TYPE["TREE_1"] = "tree_1";
        TYPE["TREE_2"] = "tree_2";
    })(TYPE = Platformer.TYPE || (Platformer.TYPE = {}));
    class Object extends f.Node {
        constructor(name, posX, posY, posZ = 0, scaleX = 1, scaleY = 1, type) {
            super(name);
            this.objectIMG = document.querySelectorAll("img.object");
            this.width = scaleX;
            this.height = scaleY;
            this.type = type;
            this.addComponent(new ƒ.ComponentTransform());
            this.mtxLocal.translate(new f.Vector3(posX, posY, posZ));
            this.mtxLocal.scaling = new f.Vector3(scaleX, scaleY, 0);
            let cmpMesh = new f.ComponentMesh(Object.mesh);
            this.addComponent(cmpMesh);
            let coat = new f.CoatTextured();
            coat.texture = this.getImageType(type);
            let material = new f.Material(type.toString(), f.ShaderTexture, coat);
            this.addComponent(new f.ComponentMaterial(material));
        }
        getRectWorld() {
            let rect = f.Rectangle.GET(0, 0, this.width, this.height);
            let topLeft = new f.Vector3(-this.width / 2, this.height / 2, 0);
            let bottomRight = new f.Vector3(this.width / 2, -this.height / 2, 0);
            let mtxResult = f.Matrix4x4.MULTIPLICATION(this.mtxWorld, Object.pivot);
            topLeft.transform(mtxResult, true);
            bottomRight.transform(mtxResult, true);
            let size = new f.Vector2(bottomRight.x - topLeft.x, bottomRight.y - topLeft.y);
            rect.position = topLeft.toVector2();
            rect.size = size;
            return rect;
        }
        getImageType(type) {
            let texture = new f.TextureImage();
            switch (type) {
                case TYPE.BUSH_1:
                    texture.image = this.objectIMG[0];
                    break;
                case TYPE.BUSH_2:
                    texture.image = this.objectIMG[1];
                    break;
                case TYPE.BUSH_3:
                    texture.image = this.objectIMG[2];
                    break;
                case TYPE.BUSH_4:
                    texture.image = this.objectIMG[3];
                    break;
                case TYPE.BOX:
                    texture.image = this.objectIMG[4];
                    break;
                case TYPE.MUSHROOM_1:
                    texture.image = this.objectIMG[5];
                    break;
                case TYPE.MUSHROOM_2:
                    texture.image = this.objectIMG[6];
                    break;
                case TYPE.SIGN:
                    texture.image = this.objectIMG[7];
                    break;
                case TYPE.ARROW_SIGN:
                    texture.image = this.objectIMG[8];
                    break;
                case TYPE.STONE:
                    texture.image = this.objectIMG[9];
                    break;
                case TYPE.STUMP:
                    texture.image = this.objectIMG[10];
                    break;
                case TYPE.TREE_1:
                    texture.image = this.objectIMG[11];
                    break;
                case TYPE.TREE_2:
                    texture.image = this.objectIMG[12];
                    break;
            }
            return texture;
        }
    }
    Object.mesh = new f.MeshSprite();
    Object.pivot = ƒ.Matrix4x4.TRANSLATION(ƒ.Vector3.Y(-0.5));
    Platformer.Object = Object;
})(Platformer || (Platformer = {}));
//# sourceMappingURL=Object.js.map