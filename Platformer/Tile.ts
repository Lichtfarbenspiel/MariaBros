namespace Platformer {
    import f = FudgeCore;

    // export enum TILE {
    //     TILE_LEFT = "tile_left",
    //     TILE_MIDDLE = "tile_middle",
    //     TILE_RIGHT = "tile_right"
    // }

    export class Tile extends f.Node {
        private static mesh: f.MeshSprite = new f.MeshSprite();
        private platformIMG: NodeListOf<HTMLImageElement> = document.querySelectorAll("img.platform");

        public constructor(posX: number, type: TYPE, tile: TILE) {
            super("Tile");

            this.addComponent(new f.ComponentTransform);
            
            let coat: f.CoatTextured = new f.CoatTextured();
            coat.texture = this.getImageType(type, tile);
            
            let pivot: f.Matrix4x4 = new f.Matrix4x4();
            pivot.translate(new f.Vector3(posX, -0.5, 0));
            
            let cmpMesh: f.ComponentMesh = new f.ComponentMesh(Tile.mesh);
            cmpMesh.pivot = pivot;
            this.addComponent(cmpMesh);

            let material: f.Material = new f.Material("Tile", f.ShaderTexture, coat);
            this.addComponent(new f.ComponentMaterial(material));
        }

        public getImageType(type: TYPE, tile?: TILE): f.TextureImage {

            let texture: f.TextureImage = new f.TextureImage();
            switch (type) {
                case TYPE.GROUND:
                    // first file on the left
                    if (tile == TILE.TILE_LEFT || tile == null) {
                        texture.image = this.platformIMG[0];
                    } 
                    // last file on the right
                    else if (tile == TILE.TILE_RIGHT) {
                        texture.image = this.platformIMG[2];
                    } 
                    // middle tile
                    else if (tile == TILE.TILE_MIDDLE) {
                        texture.image = this.platformIMG[1];
                    }
                    break;
                case TYPE.MIDDLEGROUND:
                    // first file on the left
                    if (tile == TILE.TILE_LEFT || tile == null) {
                        texture.image = this.platformIMG[3];
                    } 
                    // last file on the right
                    else if (tile == TILE.TILE_RIGHT) {
                        texture.image = this.platformIMG[5];
                    } 
                    // middle tile
                    else if (tile == TILE.TILE_MIDDLE) {
                        texture.image = this.platformIMG[4];
                    }
                    break;
                case TYPE.UNDERGROUND:
                    // first file on the left
                    if (tile == TILE.TILE_LEFT || tile == null) {
                        texture.image = this.platformIMG[6];
                    } 
                    // last file on the right
                    else if (tile == TILE.TILE_RIGHT) {
                        texture.image = this.platformIMG[8];
                    } 
                    // middle tile
                    else if (tile == TILE.TILE_MIDDLE) {
                        texture.image = this.platformIMG[7];
                    }
                    break;
                case TYPE.FLOATING:
                    this.cmpTransform.local.scaleY(0.5);
                    // first file on the left
                    if (tile == TILE.TILE_LEFT || tile == null) {
                        texture.image = this.platformIMG[9];
                    } 
                    // last file on the right
                    else if (tile == TILE.TILE_RIGHT) {
                        texture.image = this.platformIMG[11];
                    } 
                    // middle tile
                    else if (tile == TILE.TILE_MIDDLE) {
                        texture.image = this.platformIMG[10];
                    }  
                    break;
                case TYPE.WATER:
                    texture.image = this.platformIMG[12];
                    break;
                case TYPE.UNDERWATER:
                    texture.image = this.platformIMG[13];
                    break;
                
            }
            return texture;
        }
    }
}