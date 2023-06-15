import { GameConstant } from "../constants";
import { eventEmitter } from "../utils/utils";

export default class ExplorerCollider {
    constructor() {

    }

    wallCollision(x, y) {
        let collision = undefined;
        if (y > GameConstant.SCREEN_HEIGHT - GameConstant.EXPLORER_HEIGHT * 2) {
            collision = "bottom";
        } else if (y < 0) {
            collision = "top";
        } else if (x < GameConstant.EXPLORER_WIDTH) {
            collision = "left";
        } else if (x > GameConstant.SCREEN_HEIGHT - GameConstant.EXPLORER_WIDTH) {
            collision = "right";
        }
        return collision;
    }

}