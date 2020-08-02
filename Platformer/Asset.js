"use strict";
var Platformer;
(function (Platformer) {
    var f = FudgeCore;
    class Asset extends f.Node {
        constructor(name = "Asset", scaleX = 1, scaleY = 1) {
            super(name);
            this.width = scaleX;
            this.height = scaleY;
            // this.type = type;
            // this.addComponent(new ƒ.ComponentTransform());
            // this.mtxLocal.translate(new f.Vector3(posX, posY, posZ));
            // this.mtxLocal.scaling = new f.Vector3(scaleX, scaleY, 0);
            // let cmpMesh: f.ComponentMesh = new f.ComponentMesh(Asset.mesh);
            // this.addComponent(cmpMesh);        
        }
        getRectWorld() {
            let rect = f.Rectangle.GET(0, 0, this.width, this.height);
            let topLeft = new f.Vector3(-this.width / 2, this.height / 2, 0);
            let bottomRight = new f.Vector3(this.width / 2, -this.height / 2, 0);
            let mtxResult = f.Matrix4x4.MULTIPLICATION(this.mtxWorld, Asset.pivot);
            topLeft.transform(mtxResult, true);
            bottomRight.transform(mtxResult, true);
            let size = new f.Vector2(bottomRight.x - topLeft.x, bottomRight.y - topLeft.y);
            rect.position = topLeft.toVector2();
            rect.size = size;
            return rect;
        }
    }
    Asset.mesh = new f.MeshSprite();
    Asset.pivot = ƒ.Matrix4x4.TRANSLATION(ƒ.Vector3.Y(-0.5));
    Platformer.Asset = Asset;
})(Platformer || (Platformer = {}));
//# sourceMappingURL=Asset.js.map