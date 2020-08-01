"use strict";
var Platformer;
(function (Platformer) {
    var f = FudgeCore;
    class World extends f.Node {
        constructor(name, width = 5) {
            super(name);
            Platformer.level = this.createPlatform();
            //BACKGROUND
            let texture = new f.TextureImage();
            let bgImg = document.querySelector("img.background");
            for (let i = 0; i < width; i++) {
                texture.image = bgImg;
                let bg = new Platformer.Background(i, texture);
                bg.cmpTransform.local.scaleY(3 * 2);
                bg.cmpTransform.local.scaleX(3 * 2);
                Platformer.level.appendChild(bg);
            }
        }
        createPlatform() {
            let level = new f.Node("Level");
            let platform = new Platformer.Platform();
            platform.cmpTransform.local.scaleY(0.2);
            platform.cmpTransform.local.translateY(-2);
            level.appendChild(platform);
            platform = new Platformer.Platform();
            platform.cmpTransform.local.translateX(2);
            platform.cmpTransform.local.translateY(0.1);
            platform.cmpTransform.local.scaleY(0.2);
            platform.cmpTransform.local.scaleX(2);
            level.appendChild(platform);
            platform = new Platformer.Platform();
            platform.cmpTransform.local.translateY(-1.6);
            platform.cmpTransform.local.translateX(-2.2);
            platform.cmpTransform.local.scaleY(0.5);
            platform.cmpTransform.local.scaleX(10);
            level.appendChild(platform);
            platform = new Platformer.Platform();
            platform.cmpTransform.local.translateY(-1.6);
            platform.cmpTransform.local.translateX(9);
            platform.cmpTransform.local.scaleY(0.5);
            platform.cmpTransform.local.scaleX(10);
            level.appendChild(platform);
            return level;
        }
    }
    Platformer.World = World;
})(Platformer || (Platformer = {}));
//# sourceMappingURL=World.js.map