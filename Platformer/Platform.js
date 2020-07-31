"use strict";
var Platformer;
(function (Platformer) {
    var f = FudgeCore;
    class Platform extends f.Node {
        constructor() {
            super("Platform");
            this.addComponent(new ƒ.ComponentTransform());
            this.addComponent(new ƒ.ComponentMaterial(Platform.material));
            let cmpMesh = new ƒ.ComponentMesh(Platform.mesh);
            //cmpMesh.pivot.translateY(-0.5);
            cmpMesh.pivot = Platform.pivot;
            this.addComponent(cmpMesh);
        }
        getRectWorld() {
            let rect = f.Rectangle.GET(0, 0, 100, 100);
            let topLeft = new f.Vector3(-0.5, 0.5, 0);
            let bottomRight = new f.Vector3(0.5, -0.5, 0);
            let mtxResult = f.Matrix4x4.MULTIPLICATION(this.mtxWorld, Platform.pivot);
            topLeft.transform(mtxResult, true);
            bottomRight.transform(mtxResult, true);
            let size = new f.Vector2(bottomRight.x - topLeft.x, bottomRight.y - topLeft.y);
            rect.position = topLeft.toVector2();
            rect.size = size;
            return rect;
        }
    }
    Platform.mesh = new f.MeshSprite();
    Platform.material = new f.Material("Platform", ƒ.ShaderUniColor, new ƒ.CoatColored(ƒ.Color.CSS("green")));
    Platform.pivot = ƒ.Matrix4x4.TRANSLATION(ƒ.Vector3.Y(-0.5));
    Platformer.Platform = Platform;
})(Platformer || (Platformer = {}));
//# sourceMappingURL=Platform.js.map