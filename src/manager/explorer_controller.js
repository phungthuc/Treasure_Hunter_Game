import { Container } from "pixi.js";
import Explorer from "../models/explorer";

export default class ExplorerController extends Container {
    constructor() {
        super();

        this.create();
    }

    create() {
        this.explorer = new Explorer();
        this.explorer.setPosition();
        this.addChild(this.explorer);
    }

    update(delta) {
        this.explorer.update(delta);
        this.explorer.checkCollision();
        return this.explorer.getLocation();
    }

}