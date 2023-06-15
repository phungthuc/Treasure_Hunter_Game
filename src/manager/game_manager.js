import { eventEmitter } from "../utils/utils";

export default class GameManager {
    constructor(app, healthBar) {
        this.app = app;
        this.healthBar = healthBar;

        this.status = undefined;
    }

    checkEventEmitter() {
        eventEmitter.on("gameLoss", () => {
            this.status = "loss";
            this.app.end(this.status);
        });
        eventEmitter.on("winGame", () => {
            this.status = "win";
            this.app.end(this.status);
        });
        eventEmitter.on("onCollision", () => {
            this.healthBar.setPercentHealthBar(30);
        });
    }
}