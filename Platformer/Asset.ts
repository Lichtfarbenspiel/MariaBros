namespace Platformer {
    import f = FudgeCore;

    export class Asset extends f.Node {
        protected static mesh: f.MeshSprite = new f.MeshSprite();
        protected static readonly pivot: ƒ.Matrix4x4 = ƒ.Matrix4x4.TRANSLATION(ƒ.Vector3.Y(-0.5));

        protected width: number;
        protected height: number;
        protected type: TYPE;

        public constructor(name: string = "Asset", scaleX: number = 1, scaleY: number = 1) {
            super(name);
            
            this.width = scaleX;
            this.height = scaleY;
            // this.type = type;

            // this.addComponent(new ƒ.ComponentTransform());
            // this.mtxLocal.translate(new f.Vector3(posX, posY, posZ));
            // this.mtxLocal.scaling = new f.Vector3(scaleX, scaleY, 0);
            
            // let cmpMesh: f.ComponentMesh = new f.ComponentMesh(Asset.mesh);
            // this.addComponent(cmpMesh);        
        }

        public getRectWorld(): f.Rectangle {
            let rect: f.Rectangle = f.Rectangle.GET(0, 0, this.width, this.height);
            let topLeft: f.Vector3 = new f.Vector3(-this.width / 2, this.height / 2, 0);
            let bottomRight: f.Vector3 = new f.Vector3(this.width / 2, -this.height / 2, 0);

            let mtxResult: f.Matrix4x4 = f.Matrix4x4.MULTIPLICATION(this.mtxWorld, Asset.pivot);
            topLeft.transform(mtxResult, true);
            bottomRight.transform(mtxResult, true);

            let size: f.Vector2 = new f.Vector2(bottomRight.x - topLeft.x, bottomRight.y - topLeft.y);
            rect.position = topLeft.toVector2();
            rect.size = size;

            return rect;
        }
    }
}