import { Sprite } from "pixi.js";
import { GameConstant } from "../constants";

var keyState = {};

export default class PlayerController extends Sprite {
    constructor(sprite) {
        super();
        this.sprite = sprite;

        window.addEventListener("keydown", function (e) {
            keyState[e.keyCode || e.which] = true;
        }, true);
        window.addEventListener('keyup', function (e) {
            keyState[e.keyCode || e.which] = false;
        }, true);
    }

    update(delta) {
        if (keyState[37]) {
            this.sprite.x -= GameConstant.EXPLORER_MOVE * delta;
        }
        if (keyState[38]) {
            this.sprite.y -= GameConstant.EXPLORER_MOVE * delta;
        }
        if (keyState[39]) {
            this.sprite.x += GameConstant.EXPLORER_MOVE * delta;
        }
        if (keyState[40]) {
            this.sprite.y += GameConstant.EXPLORER_MOVE * delta;
        }
    }

}
