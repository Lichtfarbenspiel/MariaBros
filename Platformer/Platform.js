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
        TYPE["MIDDLEGROUND"] = "middelground";
        TYPE["UNDERGROUND"] = "underground";
        TYPE["FLOATING"] = "floating";
        TYPE["WATER"] = "water";
        TYPE["UNDERWATER"] = "underwater";
    })(TYPE = Platformer.TYPE || (Platformer.TYPE = {}));
    class Platform extends f.Node {
        constructor(posX, posY, posZ = 0, type, tiles, _amountCollectables, _typeCollectables) {
            super("Platform");
            this.width = tiles;
            this.height = 1;
            this.type = type;
            this.addComponent(new ƒ.ComponentTransform());
            this.mtxLocal.translate(new f.Vector3(posX, posY, posZ));
            this.addCollectables(_amountCollectables, _typeCollectables);
            let cmpMesh = new f.ComponentMesh(Platform.mesh);
            this.addComponent(cmpMesh);
            let tile;
            for (let i = 0; i < tiles; i++) {
                let tilePos;
                if (tiles != 1) {
                    if (i == 0)
                        tilePos = TILE.TILE_LEFT;
                    else if (i == tiles - 1)
                        tilePos = TILE.TILE_RIGHT;
                    else
                        tilePos = TILE.TILE_MIDDLE;
                    tile = new Platformer.Tile(i - (tiles / 2.8), this.type, tilePos);
                    this.appendChild(tile);
                }
                else {
                    for (let j = 0; j < 2; j++) {
                        switch (j) {
                            case 0:
                                tilePos = TILE.TILE_LEFT;
                                break;
                            case 1:
                                tilePos = TILE.TILE_RIGHT;
                                break;
                        }
                        tile = new Platformer.Tile(j - (j / 2), this.type, tilePos);
                        tile.cmpTransform.local.scaleX(0.5);
                        this.appendChild(tile);
                    }
                }
            }
        }
        getRectWorld() {
            let rect = f.Rectangle.GET(0, 0, this.width, this.height);
            let topLeft = new f.Vector3(-this.width / 2, this.height / 2, 0);
            let bottomRight = new f.Vector3(this.width / 2, -this.height / 2, 0);
            let mtxResult = f.Matrix4x4.MULTIPLICATION(this.mtxWorld, Platform.pivot);
            topLeft.transform(mtxResult, true);
            bottomRight.transform(mtxResult, true);
            let size = new f.Vector2(bottomRight.x - topLeft.x, bottomRight.y - topLeft.y);
            rect.position = topLeft.toVector2();
            rect.size = size;
            return rect;
        }
        addCollectables(_amount, _type) {
            for (let i = 0; i < _amount; i++) {
                let randPos = new f.Vector3(ƒ.Random.default.getRange(-1, 1), ƒ.Random.default.getRange(-1, 1));
                let platformPos = this.cmpTransform.local.translation;
                Platformer.collectables.appendChild(new Platformer.Collectable(_type.toString(), platformPos.x + randPos.x, platformPos.y + randPos.y, 0.5, 0.5, _type));
            }
        }
    }
    Platform.mesh = new f.MeshSprite();
    Platform.pivot = ƒ.Matrix4x4.TRANSLATION(ƒ.Vector3.Y(-0.5));
    Platformer.Platform = Platform;
})(Platformer || (Platformer = {}));
//# sourceMappingURL=Platform.js.map