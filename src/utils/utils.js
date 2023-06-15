import { Sprite, utils } from "pixi.js";
const EventEmitter = require("events");

export function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

export const eventEmitter = new EventEmitter();
