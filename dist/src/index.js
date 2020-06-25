var _a;
import * as PIXI from "pixi.js";
var graphics = new PIXI.Graphics();
var app = new PIXI.Application({
    width: 800, height: 600, backgroundColor: 0x1099bb, resolution: window.devicePixelRatio || 1,
});
(_a = document.getElementById('canvas-container')) === null || _a === void 0 ? void 0 : _a.appendChild(app.view);
graphics.beginFill(0xAA4F08, 1);
graphics.drawEllipse(600, 250, 80, 50);
graphics.endFill();
//# sourceMappingURL=index.js.map