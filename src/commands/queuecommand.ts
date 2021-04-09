import {Command} from "./command";
import {Channel, Guild, Message, User} from "discord.js";

export class QueueCommand extends Command {

    constructor() {
        super("queue", "Trage dich in einer Warteschlange für Spiele ein.");
    }

    execute(author: User, message: Message, channel: Channel, args: string[], guild: Guild | null) {

        /*
        
         */

    }

}
