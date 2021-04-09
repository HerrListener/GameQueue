import {User} from "discord.js";

export class QueueGame {

    private _name: string
    private _queue: Array<User>

    constructor(name: string) {
        this._name = name
        this._queue = new Array()
    }


    get name(): string {
        return this._name;
    }

    set name(value: string) {
        this._name = value;
    }

    get queue(): Array<User> {
        return this._queue;
    }

    set queue(value: Array<User>) {
        this._queue = value;
    }
}
