import { Container, Graphics } from "pixi.js";
import { GameConstant } from "../constants";
import { eventEmitter } from "../utils/utils";

export default class HealthBar extends Container {
    constructor(health) {
        super();
        //Health Bar
        this.position.set(GameConstant.X_HEALTH_BAR, GameConstant.Y_HEALTH_BAR);

        this.maxHealth = health;
        this.health = health;

        this.innerBar = new Graphics();
        this.innerBar.beginFill(0x000000);
        this.innerBar.drawRoundedRect(0, 0, GameConstant.HEALTH_BAR_WIDTH, GameConstant.HEALTH_BAR_HEIGHT);
        this.innerBar.endFill;
        this.addChild(this.innerBar);

        this.outerBar = new Graphics();
        this.outerBar.beginFill(0xFF0000);
        this.outerBar.drawRoundedRect(0, 0, GameConstant.HEALTH_BAR_WIDTH, GameConstant.HEALTH_BAR_HEIGHT);
        this.outerBar.endFill();
        this.addChild(this.outerBar);

        this.outer = this.outerBar;
        this.width = GameConstant.HEALTH_BAR_WIDTH;

        this.isRunning = false;
    }

    setPercentHealthBar(percent) {
        let count = 0;

        if (this.isRunning) {
            return;
        }

        this.isRunning = true;

        this.health = this.maxHealth - this.maxHealth * (percent / 100);
        this.healthBar = this.width - this.width * (this.health / this.maxHealth);

        this.outer.width -= this.healthBar;
        //draw progress bar with that healt

        if (this.outer.width <= 0) {
            this.outer.width = 0;
            eventEmitter.emit("gameLoss");
        }

        eventEmitter.emit("blur");
        setInterval(() => {
            if (count < 10) {
                if (count % 2 == 0) {
                    eventEmitter.emit("blur");
                } else {
                    eventEmitter.emit("dark");
                }
                count += 1;
            }
        }, 300);


        setTimeout(() => {
            this.isRunning = false;
        }, 3000);
    }

}