import {MessageEmbed, MessageReaction} from "discord.js";
import {client, commandHander, helpManager} from "../index";

export default function onReaction(event: MessageReaction) {

    const page = helpManager.helpMessages.get(event.message)
    const helpMap = commandHander.getHelp();

    if(page) {
        if(event.me) return;
        event.users.cache.forEach((user, key) => {
            if(event.client.user?.id != user.id) {
                event.users.remove(user)
            }
        })
        if(event.emoji.name == "➡️") {
            if(helpMap.has(page+1)) {
                event.message.edit(new MessageEmbed({
                    title: `Hilfe ${page+1}/${helpMap.size}`,
                    description: helpMap.get(page+1),
                    color: "GREEN"
                }))
                helpManager.helpMessages.set(event.message, page+1)
            }
        } else if(event.emoji.name == "⬅️") {
            if(helpMap.has(page-1)) {
                event.message.edit(new MessageEmbed({
                    title: `Hilfe ${page-1}/${helpMap.size}`,
                    description: helpMap.get(page-1),
                    color: "GREEN"
                }))
                helpManager.helpMessages.set(event.message, page-1)
            }
        } else if(event.emoji.name == "❌") {
            event.message.delete()
            helpManager.helpMessages.delete(event.message)
        }
    }

}
