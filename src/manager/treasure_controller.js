import { Container } from "pixi.js";
import Treasure from "../models/treasure";

export default class TreasureController extends Container {
    constructor() {
        super();

        this.create();
    }
    create() {
        this.treasure = new Treasure();
        this.addChild(this.treasure);
    }

    update(delta, explorerLocation, doorLocation) {
        this.treasure.update(delta, explorerLocation, doorLocation);
    }
}