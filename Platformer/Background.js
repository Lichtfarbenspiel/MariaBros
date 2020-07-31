"use strict";
var Platformer;
(function (Platformer) {
    var f = FudgeCore;
    class Background extends f.Node {
        constructor(width, sprite) {
            super("Background");
            this.name = name;
            this.width = width;
            this.addComponent(new f.ComponentTransform);
            let coat = new f.CoatTextured();
            coat.texture = sprite;
            let pivot = new f.Matrix4x4();
            pivot.translate(new f.Vector3(0, 0, 0));
            let cmpMesh = new f.ComponentMesh(Background.mesh);
            cmpMesh.pivot = pivot;
            this.addComponent(cmpMesh);
            let material = new f.Material("Background", f.ShaderTexture, coat);
            this.addComponent(new f.ComponentMaterial(material));
        }
    }
    Background.mesh = new f.MeshSprite();
    Platformer.Background = Background;
})(Platformer || (Platformer = {}));
//# sourceMappingURL=Background.js.map