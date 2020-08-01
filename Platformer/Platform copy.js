"use strict";
var Platformer;
(function (Platformer) {
    var f = FudgeCore;
    // export enum TILE {
    //     TILE_LEFT = "tile_left",
    //     TILE_MIDDLE = "tile_middle",
    //     TILE_RIGHT = "tile_left"
    // }
    // export enum TYPE {
    //     GROUND = "ground",
    //     UNDERGROUND = "underground",
    //     FLOATING = "floating",
    //     WATER = "water",
    //     UNDERWATER = "underwater"
    // }
    class Platform1 extends f.Node {
        constructor(posX, posY, posZ = 0, width, height, type, style) {
            super("Platform");
            this.platformIMG = document.querySelectorAll("img.platform");
            this.addComponent(new ƒ.ComponentTransform());
            let coat = new f.CoatTextured();
            let texture = new f.TextureImage();
            let pivot = new f.Matrix4x4();
            pivot.translate(new f.Vector3(posX, posY - 0.5, posZ));
            let cmpMesh = new f.ComponentMesh(Platformer.Platform.mesh);
            cmpMesh.pivot = pivot;
            this.addComponent(cmpMesh);
            for (let i = 0; i < width; i++) {
                let tile = new f.Node("tile" + i);
                tile.addComponent(new ƒ.ComponentTransform());
                tile.cmpTransform.local.scaling = new f.Vector3(1, 1, 0);
                let pivot = new f.Matrix4x4();
                pivot.translate(new f.Vector3(i, 0, 0));
                let cmpMesh = new f.ComponentMesh(Platformer.Platform.mesh);
                cmpMesh.pivot = pivot;
                switch (type) {
                    case Platformer.TYPE.GROUND:
                        // first file on the left
                        if (i == 0) {
                            texture.image = this.platformIMG[0];
                        }
                        // last file on the right
                        else if (i == width - 1) {
                            texture.image = this.platformIMG[2];
                        }
                        // middle tile
                        else {
                            texture.image = this.platformIMG[1];
                        }
                        break;
                    case Platformer.TYPE.UNDERGROUND:
                        // first file on the left
                        if (i == 0) {
                            texture.image = this.platformIMG[3];
                        }
                        // last file on the right
                        else if (i == width - 1) {
                            texture.image = this.platformIMG[5];
                        }
                        // middle tile
                        else {
                            texture.image = this.platformIMG[4];
                        }
                        break;
                    case Platformer.TYPE.FLOATING:
                        // first file on the left
                        if (i == 0) {
                            texture.image = this.platformIMG[6];
                        }
                        // last file on the right
                        else if (i == width - 1) {
                            texture.image = this.platformIMG[8];
                        }
                        // middle tile
                        else {
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
                coat.texture = texture;
                let material = new f.Material("Platform", f.ShaderTexture, coat);
                tile.addComponent(new f.ComponentMaterial(material));
                this.appendChild(tile);
            }
            // this.addComponent(new ƒ.ComponentMaterial(Platform.material));
            // let cmpMesh: ƒ.ComponentMesh = new ƒ.ComponentMesh(Platform.mesh);
            // //cmpMesh.pivot.translateY(-0.5);
            // cmpMesh.pivot = Platform.pivot;
            // this.addComponent(cmpMesh);
        }
        getRectWorld() {
            let rect = f.Rectangle.GET(0, 0, 100, 100);
            let topLeft = new f.Vector3(-0.5, 0.5, 0);
            let bottomRight = new f.Vector3(0.5, -0.5, 0);
            let mtxResult = f.Matrix4x4.MULTIPLICATION(this.mtxWorld, Platformer.Platform.pivot);
            topLeft.transform(mtxResult, true);
            bottomRight.transform(mtxResult, true);
            let size = new f.Vector2(bottomRight.x - topLeft.x, bottomRight.y - topLeft.y);
            rect.position = topLeft.toVector2();
            rect.size = size;
            return rect;
        }
    }
    Platform1.mesh = new f.MeshSprite();
    // private static material: f.Material = new f.Material("Platform", ƒ.ShaderUniColor, new ƒ.CoatColored(ƒ.Color.CSS("green")));
    Platform1.pivot = ƒ.Matrix4x4.TRANSLATION(ƒ.Vector3.Y(-0.5));
    Platformer.Platform1 = Platform1;
})(Platformer || (Platformer = {}));
//# sourceMappingURL=Platform copy.js.map