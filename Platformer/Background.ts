namespace Platformer {
    import f = FudgeCore;

    export class Background extends f.Node {
        private static mesh: f.MeshSprite = new f.MeshSprite();
        public name: string;

        public constructor(posX: number, sprite: f.TextureImage) {
            super("Background");
            this.name = name;

            this.addComponent(new f.ComponentTransform);
            let coat: f.CoatTextured = new f.CoatTextured();
            coat.texture = sprite;
        
            let pivot: f.Matrix4x4 = new f.Matrix4x4();
            pivot.translate(new f.Vector3(posX - 0.5, 0, -1));
            let cmpMesh: f.ComponentMesh = new f.ComponentMesh(Background.mesh);
            cmpMesh.pivot = pivot;
            this.addComponent(cmpMesh);

            let material: f.Material = new f.Material("Background", f.ShaderTexture, coat);
            this.addComponent(new f.ComponentMaterial(material));
        }
    }
}