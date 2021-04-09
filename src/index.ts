import {Client, Message, MessageEmbed} from "discord.js";
import { config } from "./config";
import {CommandHandler} from "./commands/handle/command_handler";
import {HelpCommand} from "./commands/helpcommand";
import {HelpManager} from "./manager/helpManager";
import onReaction from "./events/reactionEvent";
import {QueueCommand} from "./commands/queuecommand";
import {QueueHandler} from "./queue/queue_handler";

const cfg = config

export const client: Client = new Client()

export const helpManager: HelpManager = new HelpManager()

export const queueHandler: QueueHandler = new QueueHandler()
queueHandler.load()

export const commandHander: CommandHandler = new CommandHandler()
commandHander.registerCommand(new HelpCommand(commandHander))
commandHander.registerCommand(new QueueCommand())

client.on("message", (event: Message) => {
    
    const author = event.author
    const message = event.content
    const guild = event.guild
    const channel = event.channel

    /**
     * Commands
     */

    if(message.includes("%")) {
        var args: Array<string> = message.split(" ")
        if(args[0].startsWith("%")) {
            const cmd: string = args[0].replace("%","")
            args = args.filter(str => str != "%"+cmd)
            if(!commandHander.handle(cmd, author, event, channel, args, guild)) {
                event.delete()
                const messageEmbed = new MessageEmbed({
                    title: "Fehler",
                    description: "Dieser Command existiert nicht",
                    color: "RED"
                })
                channel.send(messageEmbed)
            }
        }
    }

})

client.on("messageReactionAdd", onReaction)

client.login(cfg.token).then(val => {
    console.log(`${cfg.prefix}Logged in as ${client.user?.username}`)
    console.log(`${cfg.prefix}Currently online on ${client.guilds.cache.size} Guilds`)
})
