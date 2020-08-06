"use strict";
var Platformer;
(function (Platformer) {
    var f = FudgeCore;
    let OBJECT;
    (function (OBJECT) {
        OBJECT["BUSH_1"] = "bush_1";
        OBJECT["BUSH_2"] = "bush_2";
        OBJECT["BUSH_3"] = "bush_3";
        OBJECT["BUSH_4"] = "bush_4";
        OBJECT["BOX"] = "box";
        OBJECT["MUSHROOM_1"] = "mushroom_1";
        OBJECT["MUSHROOM_2"] = "mushroom_2";
        OBJECT["SIGN"] = "sign";
        OBJECT["ARROW_SIGN"] = "arrow_sign";
        OBJECT["STONE"] = "stone";
        OBJECT["STUMP"] = "STUMP";
        OBJECT["TREE_1"] = "tree_1";
        OBJECT["TREE_2"] = "tree_2";
        OBJECT["FINISH"] = "finish";
    })(OBJECT = Platformer.OBJECT || (Platformer.OBJECT = {}));
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
            // let rect: f.Rectangle = f.Rectangle.GET(0, 0, this.width, this.height);
            // let topLeft: f.Vector3 = new f.Vector3(-this.width / 2, this.height / 2 , 0);
            // let bottomRight: f.Vector3 = new f.Vector3(this.width / 2, -this.height / 2, 0);
            let rect = ƒ.Rectangle.GET(0, 0, 100, 100);
            let topLeft = new ƒ.Vector3(-0.5, 0.5, 0);
            let bottomRight = new ƒ.Vector3(0.5, -0.5, 0);
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
                case OBJECT.BUSH_1:
                    texture.image = this.objectIMG[0];
                    break;
                case OBJECT.BUSH_2:
                    texture.image = this.objectIMG[1];
                    break;
                case OBJECT.BUSH_3:
                    texture.image = this.objectIMG[2];
                    break;
                case OBJECT.BUSH_4:
                    texture.image = this.objectIMG[3];
                    break;
                case OBJECT.BOX:
                    texture.image = this.objectIMG[4];
                    break;
                case OBJECT.MUSHROOM_1:
                    texture.image = this.objectIMG[5];
                    break;
                case OBJECT.MUSHROOM_2:
                    texture.image = this.objectIMG[6];
                    break;
                case OBJECT.SIGN:
                    texture.image = this.objectIMG[7];
                    break;
                case OBJECT.ARROW_SIGN:
                    texture.image = this.objectIMG[8];
                    break;
                case OBJECT.STONE:
                    texture.image = this.objectIMG[9];
                    break;
                case OBJECT.STUMP:
                    texture.image = this.objectIMG[10];
                    break;
                case OBJECT.TREE_1:
                    texture.image = this.objectIMG[11];
                    break;
                case OBJECT.TREE_2:
                    texture.image = this.objectIMG[12];
                    break;
                case OBJECT.FINISH:
                    return null;
            }
            return texture;
        }
    }
    Object.mesh = new f.MeshSprite();
    Object.pivot = ƒ.Matrix4x4.TRANSLATION(ƒ.Vector3.Y(0));
    Platformer.Object = Object;
})(Platformer || (Platformer = {}));
//# sourceMappingURL=Object.js.map