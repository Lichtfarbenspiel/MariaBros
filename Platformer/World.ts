namespace Platformer {
    import f = FudgeCore;

    export class World extends f.Node {
        
        public sprite: string;

        public constructor(name: string, width: number = 5 ) {
            super(name);

            level = this.createPlatform();
            
            //BACKGROUND
            let texture: f.TextureImage = new f.TextureImage();
            let bgImg: HTMLImageElement = document.querySelector("img.background");

            for (let i: number = 0; i < width; i++) {
                texture.image = bgImg; 
                let bg: Background = new Background(i, texture);
                bg.cmpTransform.local.scaleY(3 * 2);
                bg.cmpTransform.local.scaleX(3 * 2);
                level.appendChild(bg);
            }
        }

        private createPlatform(): f.Node {
            let level: f.Node = new f.Node("Level");
            // let platform: Platform = new Platform();
            // platform.cmpTransform.local.scaleY(0.2);
            // platform.cmpTransform.local.translateY(-2);
            // level.appendChild(platform);
        
            // platform = new Platform();
            // platform.cmpTransform.local.translateX(2);
            // platform.cmpTransform.local.translateY(0.1);
            // platform.cmpTransform.local.scaleY(0.2);
            // platform.cmpTransform.local.scaleX(2);
            // level.appendChild(platform);
        
            // platform = new Platform();
            // platform.cmpTransform.local.translateY(-1.6);
            // platform.cmpTransform.local.translateX(-2.2);
            // platform.cmpTransform.local.scaleY(0.5);
            // platform.cmpTransform.local.scaleX(10);
            // level.appendChild(platform);
        
            // platform = new Platform();
            // platform.cmpTransform.local.translateY(-1.6);
            // platform.cmpTransform.local.translateX(9);
            // platform.cmpTransform.local.scaleY(0.5);
            // platform.cmpTransform.local.scaleX(10);
            // level.appendChild(platform);
        
            return level;
          } 
    }
}