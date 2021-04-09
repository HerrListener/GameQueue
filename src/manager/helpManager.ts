import {Message} from "discord.js";

export class HelpManager {

    private _helpMessages: Map<Message,number>

    constructor() {
        this._helpMessages = new Map()
    }

    get helpMessages(): Map<Message, number> {
        return this._helpMessages;
    }

    set helpMessages(value: Map<Message, number>) {
        this._helpMessages = value;
    }
}
