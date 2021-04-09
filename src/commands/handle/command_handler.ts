import {Command} from "../command";
import {Channel, Guild, Message, User} from "discord.js";
import { config } from "../../config";

export class CommandHandler {

    private _commands: Array<Command>

    constructor() {
        this._commands = new Array()
    }

    registerCommand(command: Command): void {
        console.log(`${config.prefix}Command ${command.name} registered`)
        this._commands.push(command)
    }

    unregisterCommand(command: string): void {
        this._commands = this._commands.filter(cmd => cmd.name != command)
    }

    handle(commandName: string, author: User, message: Message, channel: Channel, args: string[], guild: Guild | null): boolean {
        const command = this._commands.find(cmd => cmd.name == commandName)
        if(command) {
            message.delete()
            command.execute(author, message, channel, args, guild)
            return true
        }
        return false
    }

    getHelp(): Map<number, string> {

        const map = new Map<number, string>()
        let page = 1
        let i = 1
        let commandList = ""
        commandList += `**Hier werden Dir alle verfügbaren Commands angezeigt**\n`

        this.commands.forEach(command => {
            if(i == 5) {
                map.set(page, commandList)
                ++page
                i = 1
                commandList = "**Hier werden Dir alle verfügbaren Commands angezeigt**\n"
            }
            commandList += `${command.name} | ${command.description}\n`
            ++i
        })

        if(!map.has(page) && commandList.trim() != "") {
            map.set(page, commandList)
        }

        return map

    }

    get commands(): Array<Command> {
        return this._commands
    }

    toJson(obj: Object): Object {
        return JSON.stringify(obj)
    }

}
