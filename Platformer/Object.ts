namespace Platformer {
    import f = FudgeCore;

    export enum TYPE {
        BUSH_1 = "bush_1",
        BUSH_2 = "bush_2",
        BUSH_3 = "bush_3",
        
    }

    export class Object extends f.Node {
        private static mesh: f.MeshSprite = new f.MeshSprite();
        private static readonly pivot: ƒ.Matrix4x4 = ƒ.Matrix4x4.TRANSLATION(ƒ.Vector3.Y(-0.5));

        public width: number;
        public height: number;
        public type: TYPE;

        public constructor(posX: number, posY: number, posZ: number = 0, type: TYPE) {
            super("Object");
           
            this.type = type;

            this.addComponent(new ƒ.ComponentTransform());
            this.mtxLocal.translate(new f.Vector3(posX, posY, posZ));
            
            let cmpMesh: f.ComponentMesh = new f.ComponentMesh(Object.mesh);
            this.addComponent(cmpMesh);
        
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

    
    }
}