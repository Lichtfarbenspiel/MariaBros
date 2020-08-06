namespace Platformer {
    import f = FudgeCore;

    export enum TILE {
        TILE_LEFT = "tile_left",
        TILE_MIDDLE = "tile_middle",
        TILE_RIGHT = "tile_right"
    }

    export enum TYPE {
        GROUND = "ground",
        MIDDLEGROUND = "middelground",
        UNDERGROUND = "underground",
        FLOATING = "floating",
        WATER = "water",
        UNDERWATER = "underwater"
    }

    export class Platform extends f.Node {
        private static mesh: f.MeshSprite = new f.MeshSprite();
        private static readonly pivot: ƒ.Matrix4x4 = ƒ.Matrix4x4.TRANSLATION(ƒ.Vector3.Y(-0.5));

        public width: number;
        public height: number;
        public type: TYPE;
        public center: FudgeAid.Node;

        public constructor(posX: number, posY: number, posZ: number = 0, type: TYPE, tiles: number, _amountCollectables?: number, _typeCollectables?: COLLECTABLE) {
            super("Platform");
           
            this.width = tiles;
            this.height = 1;
            this.type = type;

            // this.center = new ƒAid.Node("Center", ƒ.Matrix4x4.TRANSLATION(new ƒ.Vector3(0, 0.5, 0)));

            this.addComponent(new ƒ.ComponentTransform(ƒ.Matrix4x4.TRANSLATION(new f.Vector3(posX, posY, posZ))));
            // this.cmpTransform.local.translate(new f.Vector3(posX, posY, posZ));

            this.addCollectables(_amountCollectables, _typeCollectables);
            
            let cmpMesh: f.ComponentMesh = new f.ComponentMesh(Platform.mesh);
            this.addComponent(cmpMesh);
            
            let tile: Tile;
            
            for (let i: number = 0; i < tiles; i++) {
                let tilePos: TILE;
                if (tiles != 1) {
                    if (i == 0)    
                        tilePos = TILE.TILE_LEFT;
                    else if (i == tiles - 1) 
                        tilePos = TILE.TILE_RIGHT;
                    else 
                        tilePos = TILE.TILE_MIDDLE;

                    tile = new Tile(i - (tiles / 2.8), this.type, tilePos);
                    this.appendChild(tile);
                }
                else  {
                    for (let j: number = 0; j < 2; j++) {
                    
                        switch (j) {
                            case 0:
                                tilePos = TILE.TILE_LEFT;
                                break;
                            case 1: 
                                tilePos = TILE.TILE_RIGHT;
                                break;
                        } 
                        tile = new Tile(j - (j / 2), this.type, tilePos);
                        tile.cmpTransform.local.scaleX(0.5);
                        this.appendChild(tile);
                    }
                }
            }
        }

        public getRectWorld(): f.Rectangle {
            let rect: f.Rectangle = f.Rectangle.GET(0, 0, this.width, this.height);
            let topLeft: f.Vector3 = new f.Vector3(-this.width / 2, this.height / 2, 0);
            let bottomRight: f.Vector3 = new f.Vector3(this.width / 2, -this.height / 2, 0);

            let mtxResult: f.Matrix4x4 = f.Matrix4x4.MULTIPLICATION(this.mtxWorld, Platform.pivot);
            topLeft.transform(mtxResult, true);
            bottomRight.transform(mtxResult, true);

            let size: f.Vector2 = new f.Vector2(bottomRight.x - topLeft.x, bottomRight.y - topLeft.y);
            rect.position = topLeft.toVector2();
            rect.size = size;

            return rect;
        }

        private addCollectables(_amount: number, _type: COLLECTABLE): void {    
            let range: number = this.width / 2;
            for (let i: number = 0; i < _amount; i++) {
                let randPos: f.Vector3 = new f.Vector3(ƒ.Random.default.getRange(-range, range), ƒ.Random.default.getRange(-0.5, 0));
                let platformPos: f.Vector3 = this.cmpTransform.local.translation.copy;

                if (_type != COLLECTABLE.GEM_GOLD) 
                    collectables.appendChild(new Collectable(_type.toString(), platformPos.x + randPos.x, platformPos.y + randPos.y + 1, 0.5, 0.5, _type));
                else
                    collectables.appendChild(new Collectable(_type.toString(), platformPos.x + 1.5, platformPos.y + 1, 0.5, 0.5, _type));
            }
        }
    }
}