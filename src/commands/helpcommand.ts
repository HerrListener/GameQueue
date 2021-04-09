import {User, Channel, Guild, MessageEmbed, TextChannel, Message, Emoji, ReactionEmoji} from "discord.js";
import {Command} from "./command";
import {CommandHandler} from "./handle/command_handler";
import {client, helpManager} from "../index";

export class HelpCommand extends Command {

    private commandHandler: CommandHandler

    constructor(commandHandler: CommandHandler) {
        super("help", "Ein Hilfe Command");
        this.commandHandler = commandHandler
    }

    execute(author: User, message: Message, channel: Channel, args: string[], guild: Guild | null) {

        const helpMap: Map<number, string> = this.commandHandler.getHelp()

        const textChannel = <TextChannel>channel

        textChannel.send(new MessageEmbed({
            title: `Hilfe 1/${helpMap.size}`,
            description: helpMap.get(1),
            color: "GREEN"
        })).then(msg => {
            helpManager.helpMessages.set(msg, 1)
            //@ts-ignore
            msg.react('⬅️')
            msg.react('➡️')
            msg.react('❌')
        })


    }

}
