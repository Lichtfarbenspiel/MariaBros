namespace Platformer {
    import f = FudgeCore;

    export enum TILE {
        TILE_LEFT = "tile_left",
        TILE_MIDDLE = "tile_middle",
        TILE_RIGHT = "tile_right"
    }

    export enum TYPE {
        GROUND = "ground",
        UNDERGROUND = "underground",
        FLOATING = "floating",
        WATER = "water",
        UNDERWATER = "underwater"
    }

    export class Platform extends f.Node {
        private static mesh: f.MeshSprite = new f.MeshSprite();
        // private static material: f.Material = new f.Material("Platform", ƒ.ShaderUniColor, new ƒ.CoatColored(ƒ.Color.CSS("green")));
        private static readonly pivot: ƒ.Matrix4x4 = ƒ.Matrix4x4.TRANSLATION(ƒ.Vector3.Y(-0.5));

        // public platformIMG: NodeListOf<HTMLImageElement> = document.querySelectorAll("img.platform");
        public width: number;
        public height: number;

        public constructor(posX: number, posY: number, posZ: number = 0, type: TYPE, tiles: number, height: number = 1) {
            super("Platform");
           
            this.width = tiles;
            this.height = height;

            this.addComponent(new ƒ.ComponentTransform());
            

            let pivot: f.Matrix4x4 = new f.Matrix4x4();
            pivot.translate(new f.Vector3(posX, posY - 0.5, posZ));
            
            let cmpMesh: f.ComponentMesh = new f.ComponentMesh(Platform.mesh);
            cmpMesh.pivot = pivot;
            this.addComponent(cmpMesh);

            
            for (let i: number = 0; i < tiles; i++) {
                let tileType: TILE;
                if (i == 0)    
                    tileType = TILE.TILE_LEFT;
                else if (i == tiles - 1) 
                    tileType = TILE.TILE_RIGHT;
                else 
                    tileType = TILE.TILE_MIDDLE;

                let tile: Tile = new Tile(i, type, tileType);
                this.appendChild(tile);
            }
        }


        public getRectWorld(): f.Rectangle {
            let rect: f.Rectangle = f.Rectangle.GET(0, 0, this.width, this.height);
            let topLeft: f.Vector3 = new f.Vector3(-this.width / 1.8, this.height / 2, 0);
            let bottomRight: f.Vector3 = new f.Vector3(this.width / 1.8, -this.height / 2, 0);

            let mtxResult: f.Matrix4x4 = f.Matrix4x4.MULTIPLICATION(this.mtxWorld, Platform.pivot);
            topLeft.transform(mtxResult, true);
            bottomRight.transform(mtxResult, true);

            let size: f.Vector2 = new f.Vector2(bottomRight.x - topLeft.x, bottomRight.y - topLeft.y);
            rect.position = topLeft.toVector2();
            rect.size = size;

            return rect;
        }

        // public getImageType(type: TYPE, tile?: TILE): f.TextureImage {

        //     let texture: f.TextureImage = new f.TextureImage();
        //     switch (type) {
        //         case TYPE.GROUND:
        //             // first file on the left
        //             if (tile == TILE.TILE_LEFT || tile == null) {
        //                 texture.image = this.platformIMG[0];
        //             } 
        //             // last file on the right
        //             else if (tile == TILE.TILE_RIGHT) {
        //                 texture.image = this.platformIMG[2];
        //             } 
        //             // middle tile
        //             else if (tile == TILE.TILE_MIDDLE) {
        //                 texture.image = this.platformIMG[1];
        //             }
        //             break;
        //         case TYPE.UNDERGROUND:
        //             // first file on the left
        //             if (tile == TILE.TILE_LEFT || tile == null) {
        //                 texture.image = this.platformIMG[3];
        //             } 
        //             // last file on the right
        //             else if (tile == TILE.TILE_RIGHT) {
        //                 texture.image = this.platformIMG[5];
        //             } 
        //             // middle tile
        //             else if (tile == TILE.TILE_MIDDLE) {
        //                 texture.image = this.platformIMG[4];
        //             }
        //             break;
        //         case TYPE.FLOATING:
        //             // first file on the left
        //             if (tile == TILE.TILE_LEFT || tile == null) {
        //                 texture.image = this.platformIMG[6];
        //             } 
        //             // last file on the right
        //             else if (tile == TILE.TILE_RIGHT) {
        //                 texture.image = this.platformIMG[8];
        //             } 
        //             // middle tile
        //             else if (tile == TILE.TILE_MIDDLE) {
        //                 texture.image = this.platformIMG[7];
        //             }  
        //             break;
        //         case TYPE.WATER:
        //             texture.image = this.platformIMG[9];
        //             break;
        //         case TYPE.UNDERWATER:
        //             texture.image = this.platformIMG[10];
        //             break;
                
        //     }
        //     return texture;
        // }
    }
}