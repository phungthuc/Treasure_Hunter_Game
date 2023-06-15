import { Container, Sprite, utils } from "pixi.js";
import { getSpriteFromCache } from "../utils/utils";
import { GameConstant } from "../constants";

export default class Door extends Sprite {
    constructor() {
        super(utils.TextureCache[GameConstant.DOOR_IMAGE]);
        this.setPosition();
    }

    update(delta) {
        return [
            this.x,
            this.y
        ];
    }

    setPosition() {
        this.position.set(GameConstant.X_DOOR, GameConstant.Y_DOOR);
    }

    checkCollision() {
    }
}