"use strict";
var Platformer;
(function (Platformer) {
    var f = FudgeCore;
    let TYPE;
    (function (TYPE) {
        TYPE["BUSH_1"] = "bush_1";
        TYPE["BUSH_2"] = "bush_2";
        TYPE["BUSH_3"] = "bush_3";
    })(TYPE = Platformer.TYPE || (Platformer.TYPE = {}));
    class Object extends f.Node {
        constructor(posX, posY, posZ = 0, type) {
            super("Object");
            this.type = type;
            this.addComponent(new ƒ.ComponentTransform());
            this.mtxLocal.translate(new f.Vector3(posX, posY, posZ));
            let cmpMesh = new f.ComponentMesh(Object.mesh);
            this.addComponent(cmpMesh);
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
    }
    Object.mesh = new f.MeshSprite();
    Object.pivot = ƒ.Matrix4x4.TRANSLATION(ƒ.Vector3.Y(-0.5));
    Platformer.Object = Object;
})(Platformer || (Platformer = {}));
//# sourceMappingURL=Object.js.map