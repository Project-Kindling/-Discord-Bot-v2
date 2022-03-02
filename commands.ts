import DiscordJS from "discord.js"
import client from "./client"

const ready = async () => {
    client.on("ready", () => {
        console.log(`<~~~~~~~ ${client.user?.tag} ~~~~~~~>`)
        console.log("--------------- READY ---------------")

        const guildId: string = "879212507925995540"
        const guild: DiscordJS.Guild | undefined =
            client.guilds.cache.get(guildId)

        let commands
        if (guild) {
            commands = guild.commands
        } else {
            commands = client.application?.commands
        }

        commands?.create({
            name: "announce",
            description: "Schedule an announcement!",
            options: [
                {
                    name: "title",
                    description: "Title of announcement",
                    required: true,
                    type: DiscordJS.Constants.ApplicationCommandOptionTypes
                        .STRING,
                },
                {
                    name: "target",
                    description: "The channel where announcement will be made",
                    required: false,
                    type: DiscordJS.Constants.ApplicationCommandOptionTypes
                        .STRING,
                },
                {
                    name: "due",
                    description: "String representing date of announcement",
                    required: false,
                    type: DiscordJS.Constants.ApplicationCommandOptionTypes
                        .STRING,
                },
            ],
        })

        console.log("---------- Commands Loaded ----------")
    })
}

export = ready
