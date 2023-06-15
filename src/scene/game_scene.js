import { Application, Container, Graphics, Loader } from "pixi.js";
import EndScene from "./end_scene";
import Dungeon from "../models/dungeon";
import BlobManager from "../manager/blob_manager";
import Door from "../models/door";
import HealthBar from "../models/health_bar";
import { GameConstant } from "../constants";
import ExplorerController from "../manager/explorer_controller";
import TreasureController from "../manager/treasure_controller";
import GameManager from "../manager/game_manager";

export default class GameScene extends Application {
    constructor() {
        super({
            width: GameConstant.SCREEN_WIDTH,
            height: GameConstant.SCREEN_HEIGHT
        });
        this.renderer.backgroundColor = 0x061639;

        this.renderer.view.style.position = "absolute";
        this.renderer.view.style.top = "50%";
        this.renderer.view.style.left = "50%";
        this.renderer.view.style.transform = "translate(-50%,-50%)";
        this.renderer.view.style.border = "1px solid #d8d8d8";
        document.body.appendChild(this.view);

        this.gameScene = new Container();
        this.stage.addChild(this.gameScene);

    }

    load() {
        Loader.shared
            .add("assets/images/treasureHunter.json")
            .load(() => {
                this.setup();
            });
    }

    setup() {

        this.dungeon = new Dungeon();
        this.gameScene.addChild(this.dungeon);

        this.blobs = new BlobManager();
        this.gameScene.addChild(this.blobs);

        this.door = new Door();
        this.gameScene.addChild(this.door);

        this.treasure = new TreasureController();
        this.gameScene.addChild(this.treasure);

        this.explorer = new ExplorerController();
        this.gameScene.addChild(this.explorer);

        this.healthBar = new HealthBar(500);
        this.gameScene.addChild(this.healthBar);

        this.gameManager = new GameManager(this, this.healthBar);
        this.gameManager.checkEventEmitter();

        this.ticker.add((delta) => {
            this.gameLoop(delta);
        })

    }

    gameLoop(delta) {
        this.explorerLocation = this.explorer.update(delta);
        this.doorLocation = this.door.update(delta);
        this.blobs.update(delta, this.explorerLocation);
        this.treasure.update(delta, this.explorerLocation, this.doorLocation);
    }

    end(status) {
        this.gameScene.visible = false;
        this.endScene = new EndScene(status);
        this.stage.addChild(this.endScene);
    }
}