import { Container, Graphics, Sprite, utils } from "pixi.js";
import { getSpriteFromCache } from "../utils/utils";
import { GameConstant } from "../constants";

export default class Dungeon extends Sprite {
    constructor() {
        super(utils.TextureCache[GameConstant.DUNGEON_IMAGE]);

        this.width = GameConstant.SCREEN_WIDTH;
        this.height = GameConstant.SCREEN_HEIGHT;
    }

    update() {

    }

    setPosition() {
        this.position.set(0, 0);
    }

    checkCollision() {
    }

}