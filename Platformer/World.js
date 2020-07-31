"use strict";
var Platformer;
(function (Platformer) {
    var f = FudgeCore;
    class World extends f.Node {
        constructor(name) {
            super(name);
            let cmpMesh = new f.ComponentMesh(World.mesh);
            this.addComponent(cmpMesh);
            let cmpTransform = new f.ComponentTransform();
            this.addComponent(cmpTransform);
        }
    }
    World.mesh = new f.MeshSprite();
    Platformer.World = World;
})(Platformer || (Platformer = {}));
//# sourceMappingURL=World.js.map