namespace Platformer {
    import f = FudgeCore;

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

    export class Platform1 extends f.Node {
        private static mesh: f.MeshSprite = new f.MeshSprite();
        // private static material: f.Material = new f.Material("Platform", ƒ.ShaderUniColor, new ƒ.CoatColored(ƒ.Color.CSS("green")));
        private static readonly pivot: ƒ.Matrix4x4 = ƒ.Matrix4x4.TRANSLATION(ƒ.Vector3.Y(-0.5));

        public platformIMG: NodeListOf<HTMLImageElement> = document.querySelectorAll("img.platform");

        public constructor(posX: number, posY: number, posZ: number = 0, width: number, height: number, type: TYPE, style?: number) {
            super("Platform");

           
            this.addComponent(new ƒ.ComponentTransform());
            let coat: f.CoatTextured = new f.CoatTextured();
            let texture: f.TextureImage = new f.TextureImage();

            let pivot: f.Matrix4x4 = new f.Matrix4x4();
            pivot.translate(new f.Vector3(posX, posY - 0.5, posZ));
            
            let cmpMesh: f.ComponentMesh = new f.ComponentMesh(Platform.mesh);
            cmpMesh.pivot = pivot;
            this.addComponent(cmpMesh);

            
            for (let i: number = 0; i < width; i++) {

                let tile: f.Node = new f.Node("tile" + i);
                tile.addComponent(new ƒ.ComponentTransform());
                tile.cmpTransform.local.scaling = new f.Vector3(1, 1, 0);

                let pivot: f.Matrix4x4 = new f.Matrix4x4();
                pivot.translate(new f.Vector3(i,  0, 0));

                let cmpMesh: f.ComponentMesh = new f.ComponentMesh(Platform.mesh);
                cmpMesh.pivot = pivot;

                switch (type) {
                    case TYPE.GROUND:
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
                    case TYPE.UNDERGROUND:
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
                    case TYPE.FLOATING:
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
                    case TYPE.WATER:
                        texture.image = this.platformIMG[9];
                        break;
                    case TYPE.UNDERWATER:
                        texture.image = this.platformIMG[10];
                        break;
                }
                coat.texture = texture;

                let material: f.Material = new f.Material("Platform", f.ShaderTexture, coat);
                tile.addComponent(new f.ComponentMaterial(material));
                this.appendChild(tile);
            }
            
            // this.addComponent(new ƒ.ComponentMaterial(Platform.material));
            // let cmpMesh: ƒ.ComponentMesh = new ƒ.ComponentMesh(Platform.mesh);
            // //cmpMesh.pivot.translateY(-0.5);
            // cmpMesh.pivot = Platform.pivot;
            // this.addComponent(cmpMesh);
        }


        public getRectWorld(): f.Rectangle {
            let rect: f.Rectangle = f.Rectangle.GET(0, 0, 100, 100);
            let topLeft: f.Vector3 = new f.Vector3(-0.5, 0.5, 0);
            let bottomRight: f.Vector3 = new f.Vector3(0.5, -0.5, 0);

            let mtxResult: f.Matrix4x4 = f.Matrix4x4.MULTIPLICATION(this.mtxWorld, Platform.pivot);
            topLeft.transform(mtxResult, true);
            bottomRight.transform(mtxResult, true);

            let size: f.Vector2 = new f.Vector2(bottomRight.x - topLeft.x, bottomRight.y - topLeft.y);
            rect.position = topLeft.toVector2();
            rect.size = size;

            return rect;
        }
    }
}