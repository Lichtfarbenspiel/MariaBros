"use strict";
var Platformer;
(function (Platformer) {
    var f = FudgeCore;
    let TILE;
    (function (TILE) {
        TILE["TILE_LEFT"] = "tile_left";
        TILE["TILE_MIDDLE"] = "tile_middle";
        TILE["TILE_RIGHT"] = "tile_right";
    })(TILE = Platformer.TILE || (Platformer.TILE = {}));
    let TYPE;
    (function (TYPE) {
        TYPE["GROUND"] = "ground";
        TYPE["UNDERGROUND"] = "underground";
        TYPE["FLOATING"] = "floating";
        TYPE["WATER"] = "water";
        TYPE["UNDERWATER"] = "underwater";
    })(TYPE = Platformer.TYPE || (Platformer.TYPE = {}));
    class Platform extends f.Node {
        constructor(posX, posY, posZ = 0, type, tiles, height = 1) {
            super("Platform");
            this.width = tiles;
            this.height = height;
            this.addComponent(new ƒ.ComponentTransform());
            let pivot = new f.Matrix4x4();
            pivot.translate(new f.Vector3(posX, posY - 0.5, posZ));
            let cmpMesh = new f.ComponentMesh(Platform.mesh);
            cmpMesh.pivot = pivot;
            this.addComponent(cmpMesh);
            for (let i = 0; i < tiles; i++) {
                let tileType;
                if (i == 0)
                    tileType = TILE.TILE_LEFT;
                else if (i == tiles - 1)
                    tileType = TILE.TILE_RIGHT;
                else
                    tileType = TILE.TILE_MIDDLE;
                let tile = new Platformer.Tile(i, type, tileType);
                this.appendChild(tile);
            }
        }
        getRectWorld() {
            let rect = f.Rectangle.GET(0, 0, this.width, this.height);
            let topLeft = new f.Vector3(-this.width / 1.8, this.height / 2, 0);
            let bottomRight = new f.Vector3(this.width / 1.8, -this.height / 2, 0);
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
    // private static material: f.Material = new f.Material("Platform", ƒ.ShaderUniColor, new ƒ.CoatColored(ƒ.Color.CSS("green")));
    Platform.pivot = ƒ.Matrix4x4.TRANSLATION(ƒ.Vector3.Y(-0.5));
    Platformer.Platform = Platform;
})(Platformer || (Platformer = {}));
//# sourceMappingURL=Platform.js.map