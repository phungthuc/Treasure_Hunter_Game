import { Container, Sprite, utils } from "pixi.js";
import { eventEmitter, getSpriteFromCache } from "../utils/utils";
import ExplorerCollisder from "../collision/explorer_collider";
import { GameConstant } from "../constants";
import PlayerController from "../manager/player_controller";

export default class Explorer extends Sprite {
    constructor() {
        super(utils.TextureCache[GameConstant.EXPLORER_IMAGE]);

        this.action = new PlayerController(this);
        this.explorerCollisder = new ExplorerCollisder();
        this.checkEventEmitter();
    }

    update(delta) {
        //this.alpha = 1;
        this.action.update(delta);
    }

    setPosition() {
        this.position.set(GameConstant.X_EXPLORER, GameConstant.Y_EXPLORER);
    }

    getLocation() {
        return [
            this.x,
            this.y
        ];
    }

    checkCollision() {

        this.collision = this.explorerCollisder.wallCollision(this.x, this.y);
        switch (this.collision) {
            case "bottom":
                this.y = GameConstant.SCREEN_HEIGHT - GameConstant.EXPLORER_HEIGHT * 2;
                break;
            case "top":
                this.y = 0;
                break;
            case "right":
                this.x = GameConstant.SCREEN_HEIGHT - GameConstant.EXPLORER_WIDTH;
                break;
            case "left":
                this.x = GameConstant.EXPLORER_WIDTH;
                break;

            default:
                break;
        }
    }

    checkEventEmitter() {
        // eventEmitter.on("onCollision", () => {
        //     this.alpha = 0.5;
        // });

        eventEmitter.on("blur", () => {
            this.alpha = 0.5;
        });
        eventEmitter.on("dark", () => {
            this.alpha = 1;
        });
    }

}