import { Container, Sprite, utils } from "pixi.js";
import { eventEmitter, getSpriteFromCache } from "../utils/utils";
import { GameConstant } from "../constants";
import RectangleCollider from "../collision/rect_collider";

export default class Treasure extends Sprite {
    constructor() {
        super(utils.TextureCache[GameConstant.TREASURE_IMAGE]);

        this.setPosition();

        this.isCollisionTreasure = false;
        this.rectangleCollider = new RectangleCollider();
    }

    update(delta, explorerLocation, doorCollision) {
        if (this.rectangleCollider.checkCollision(this.x, this.y, GameConstant.TREASURE_WIDTH, GameConstant.TREASURE_HEIGHT,
            explorerLocation[0], explorerLocation[1], GameConstant.EXPLORER_WIDTH, GameConstant.EXPLORER_HEIGHT) != null) {
            this.isCollisionTreasure = true;
        }
        if (this.isCollisionTreasure == true) {
            this.x = explorerLocation[0];
            this.y = explorerLocation[1];
            if (this.rectangleCollider.checkCollision(this.x, this.y, GameConstant.TREASURE_WIDTH, GameConstant.TREASURE_HEIGHT,
                doorCollision[0], doorCollision[1], GameConstant.DOOR_WIDTH, GameConstant.DOOR_HEIGHT) != null) {
                this.setEventEmitter();
            }
        }
    }

    setPosition() {
        this.position.set(GameConstant.X_TREASURE, GameConstant.Y_TREASURE);
    }

    checkCollision() {

    }

    setEventEmitter() {
        eventEmitter.emit("winGame");

    }
}