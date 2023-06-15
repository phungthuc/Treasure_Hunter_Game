import { Container, Sprite, utils } from "pixi.js";
import { eventEmitter, getSpriteFromCache } from "../utils/utils";
import { GameConstant } from "../constants";
import BlobCollider from "../collision/blob_collider";
import RectangleCollider from "../collision/rect_collider";

export default class Blob extends Sprite {

    constructor(number) {
        super(utils.TextureCache[GameConstant.BLOB_IMAGE]);
        this.number = number;

        this.number % 2 == 0 ? this.VY_BLOB = GameConstant.VY_BLOB : this.VY_BLOB = - GameConstant.VY_BLOB;
        this.blobCollider = new BlobCollider();
        this.rectangleCollider = new RectangleCollider();
    }

    update(delta, explorerLocation) {
        this.y += this.VY_BLOB;
        this.explorerLocation = explorerLocation;
    }

    setPosition(x, y) {
        this.position.set(x, y);
    }

    checkCollision() {
        if (this.blobCollider.wallCollision(this.y) === "bottom") {
            this.y = GameConstant.SCREEN_HEIGHT - GameConstant.WALL_WIDTH - GameConstant.BLOB_HEIGHT;
            this.VY_BLOB *= -1;
        } else if (this.blobCollider.wallCollision(this.y) === "top") {
            this.y = 0;
            this.VY_BLOB *= -1;
        } else if (this.rectangleCollider.checkCollision(this.x, this.y, GameConstant.BLOB_WIDTH, GameConstant.BLOB_HEIGHT, this.explorerLocation[0], this.explorerLocation[1], GameConstant.EXPLORER_WIDTH, GameConstant.EXPLORER_HEIGHT) != null) {
            eventEmitter.emit("onCollision");
        }


    }
}