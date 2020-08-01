"use strict";
var Platformer;
(function (Platformer) {
    var f = FudgeCore;
    // export enum TILE {
    //     TILE_LEFT = "tile_left",
    //     TILE_MIDDLE = "tile_middle",
    //     TILE_RIGHT = "tile_right"
    // }
    class Tile extends f.Node {
        constructor(posX, type, tile) {
            super("Tile");
            this.platformIMG = document.querySelectorAll("img.platform");
            this.addComponent(new f.ComponentTransform);
            let coat = new f.CoatTextured();
            coat.texture = this.getImageType(type, tile);
            let pivot = new f.Matrix4x4();
            pivot.translate(new f.Vector3(posX - 1, -0.5, 0));
            let cmpMesh = new f.ComponentMesh(Tile.mesh);
            cmpMesh.pivot = pivot;
            this.addComponent(cmpMesh);
            let material = new f.Material("Tile", f.ShaderTexture, coat);
            this.addComponent(new f.ComponentMaterial(material));
        }
        getImageType(type, tile) {
            let texture = new f.TextureImage();
            switch (type) {
                case Platformer.TYPE.GROUND:
                    // first file on the left
                    if (tile == Platformer.TILE.TILE_LEFT || tile == null) {
                        texture.image = this.platformIMG[0];
                    }
                    // last file on the right
                    else if (tile == Platformer.TILE.TILE_RIGHT) {
                        texture.image = this.platformIMG[2];
                    }
                    // middle tile
                    else if (tile == Platformer.TILE.TILE_MIDDLE) {
                        texture.image = this.platformIMG[1];
                    }
                    break;
                case Platformer.TYPE.UNDERGROUND:
                    // first file on the left
                    if (tile == Platformer.TILE.TILE_LEFT || tile == null) {
                        texture.image = this.platformIMG[3];
                    }
                    // last file on the right
                    else if (tile == Platformer.TILE.TILE_RIGHT) {
                        texture.image = this.platformIMG[5];
                    }
                    // middle tile
                    else if (tile == Platformer.TILE.TILE_MIDDLE) {
                        texture.image = this.platformIMG[4];
                    }
                    break;
                case Platformer.TYPE.FLOATING:
                    // first file on the left
                    if (tile == Platformer.TILE.TILE_LEFT || tile == null) {
                        texture.image = this.platformIMG[6];
                    }
                    // last file on the right
                    else if (tile == Platformer.TILE.TILE_RIGHT) {
                        texture.image = this.platformIMG[8];
                    }
                    // middle tile
                    else if (tile == Platformer.TILE.TILE_MIDDLE) {
                        texture.image = this.platformIMG[7];
                    }
                    break;
                case Platformer.TYPE.WATER:
                    texture.image = this.platformIMG[9];
                    break;
                case Platformer.TYPE.UNDERWATER:
                    texture.image = this.platformIMG[10];
                    break;
            }
            return texture;
        }
    }
    Tile.mesh = new f.MeshSprite();
    Platformer.Tile = Tile;
})(Platformer || (Platformer = {}));
//# sourceMappingURL=Tile.js.map