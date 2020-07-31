namespace Platformer {
    import f = FudgeCore;

    export class World extends f.Node {
        
        private static mesh: f.MeshSprite = new f.MeshSprite();
        public sprite: string;
        

        public constructor(name: string) {
            super(name);

            let cmpMesh: f.ComponentMesh = new f.ComponentMesh(World.mesh);
            this.addComponent(cmpMesh);

            let cmpTransform: f.ComponentTransform = new f.ComponentTransform();
            this.addComponent(cmpTransform);
        }
    }
}