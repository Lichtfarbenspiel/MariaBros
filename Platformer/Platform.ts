namespace Platformer {
    import f = FudgeCore;

    export class Platform extends f.Node {
        private static mesh: f.MeshSprite = new f.MeshSprite();
        private static material: f.Material = new f.Material("Platform", ƒ.ShaderUniColor, new ƒ.CoatColored(ƒ.Color.CSS("green")));
        private static readonly pivot: ƒ.Matrix4x4 = ƒ.Matrix4x4.TRANSLATION(ƒ.Vector3.Y(-0.5));

        public constructor() {
            super("Platform");
            this.addComponent(new ƒ.ComponentTransform());
            this.addComponent(new ƒ.ComponentMaterial(Platform.material));
            let cmpMesh: ƒ.ComponentMesh = new ƒ.ComponentMesh(Platform.mesh);
            //cmpMesh.pivot.translateY(-0.5);
            cmpMesh.pivot = Platform.pivot;
            this.addComponent(cmpMesh);
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