namespace Platformer {
    import f = FudgeCore;

    export enum TYPE {
        BUSH_1 = "bush_1",
        BUSH_2 = "bush_2",
        BUSH_3 = "bush_3",
        BUSH_4 = "bush_4",
        BOX = "box",
        MUSHROOM_1 = "mushroom_1",
        MUSHROOM_2 = "mushroom_2",
        SIGN = "sign",
        ARROW_SIGN = "arrow_sign",
        STONE = "stone",
        STUMP = "STUMP",
        TREE_1 = "tree_1",
        TREE_2 = "tree_2"
    }

    export class Object extends f.Node {
        private static mesh: f.MeshSprite = new f.MeshSprite();
        private static readonly pivot: ƒ.Matrix4x4 = ƒ.Matrix4x4.TRANSLATION(ƒ.Vector3.Y(-0.5));

        public width: number;
        public height: number;
        public type: TYPE;

        private objectIMG: NodeListOf<HTMLImageElement> = document.querySelectorAll("img.object");

        public constructor(posX: number, posY: number, posZ: number = 0, scaleX: number = 1, scaleY: number = 1, type: TYPE) {
            super("Object");
            
            this.width = scaleX;
            this.height = scaleY;
            this.type = type;

            this.addComponent(new ƒ.ComponentTransform());
            this.mtxLocal.translate(new f.Vector3(posX, posY, posZ));
            this.mtxLocal.scaling = new f.Vector3(scaleX, scaleY, 0);
            
            let cmpMesh: f.ComponentMesh = new f.ComponentMesh(Object.mesh);
            this.addComponent(cmpMesh);

            let coat: f.CoatTextured = new f.CoatTextured();
            coat.texture = this.getImageType(type);

            let material: f.Material = new f.Material(type.toString(), f.ShaderTexture, coat);
            this.addComponent(new f.ComponentMaterial(material));
        
        }

        public getRectWorld(): f.Rectangle {
            let rect: f.Rectangle = f.Rectangle.GET(0, 0, this.width, this.height);
            let topLeft: f.Vector3 = new f.Vector3(-this.width / 2, this.height / 2, 0);
            let bottomRight: f.Vector3 = new f.Vector3(this.width / 2, -this.height / 2, 0);

            let mtxResult: f.Matrix4x4 = f.Matrix4x4.MULTIPLICATION(this.mtxWorld, Object.pivot);
            topLeft.transform(mtxResult, true);
            bottomRight.transform(mtxResult, true);

            let size: f.Vector2 = new f.Vector2(bottomRight.x - topLeft.x, bottomRight.y - topLeft.y);
            rect.position = topLeft.toVector2();
            rect.size = size;

            return rect;
        }

        private getImageType(type: TYPE): f.TextureImage {
            
            let texture: f.TextureImage = new f.TextureImage();

            switch (type) {
                case TYPE.BUSH_1:
                    texture.image = this.objectIMG[0];
                    break;
                case TYPE.BUSH_2:
                    texture.image = this.objectIMG[1];
                    break;
                case TYPE.BUSH_3:
                    texture.image = this.objectIMG[2];
                    break;
                case TYPE.BUSH_4:
                    texture.image = this.objectIMG[3];
                    break;
                case TYPE.BOX:
                    texture.image = this.objectIMG[4];
                    break;
                case TYPE.MUSHROOM_1:
                    texture.image = this.objectIMG[5];
                    break;
                case TYPE.MUSHROOM_2:
                    texture.image = this.objectIMG[6];
                    break;
                case TYPE.SIGN:
                    texture.image = this.objectIMG[7];
                    break;
                case TYPE.ARROW_SIGN:
                    texture.image = this.objectIMG[8];
                    break;
                case TYPE.STONE:
                    texture.image = this.objectIMG[9];
                    break;
                case TYPE.STUMP:
                    texture.image = this.objectIMG[10];
                    break;
                case TYPE.TREE_1:
                    texture.image = this.objectIMG[11];
                    break;
                case TYPE.TREE_2:
                    texture.image = this.objectIMG[12];
                    break;
            }
            return texture;
        }
    }
}