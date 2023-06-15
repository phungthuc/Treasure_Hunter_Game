import { Container } from "pixi.js";
import Blob from "../models/blob";
import { randomInt } from "../utils/utils";
import { GameConstant } from "../constants";
import RectangleCollider from "../collision/rect_collider";

export default class BlobManager extends Container {
    constructor() {
        super();

        this.blobs = [];
        this.create();
    }

    create() {
        for (let i = 0; i < GameConstant.NUM_BLOB; i++) {
            let blob = new Blob(i);
            blob.setPosition(i * GameConstant.SPACING + GameConstant.X_OFF_SET, randomInt(blob.height, GameConstant.SCREEN_HEIGHT - blob.height * 2));
            this.blobs.push(blob);
            this.addChild(blob);
        }
    }

    update(delta, explorerLocation) {
        for (let i = 0; i < this.blobs.length; i++) {
            let blob = this.blobs[i];
            blob.update(delta, explorerLocation);
            blob.checkCollision();
        }
    }
}