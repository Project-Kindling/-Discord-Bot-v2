import DiscordJS, {
    Guild,
    GuildMember,
    Interaction,
    Message,
    Role,
} from "discord.js"
import { Announcement } from "../classes/announcement"
import client, { guilds, on } from "../client"
import ready from "../commands"

const announce = async (): Promise<void> => {
    client.on("interactionCreate", async (interaction: Interaction) => {
        if (!interaction.isCommand()) {
            return
        }

        const { commandName, options } = interaction

        if (commandName === "announce") {
            const title = options.getString("title")
            const content = options.getString("content")
            const channel = options.getString("channel")
            const schedule = options.getString("schedule")
            const image = options.getBoolean("image")

            const announcement: Announcement = new Announcement(title!)
            console.log(announcement.title)

            let embed = new DiscordJS.MessageEmbed()
            embed.setTitle(title!)
            embed.setDescription(content!)

            console.log(`interaction ~~> ${interaction}`)
            console.log(`interaction.channelId ~~> ${interaction.channelId}`)
            console.log(`interaction.member ~~> ${interaction.member}`)
            console.log(
                `interaction.memberPermissions ~~> ${interaction.memberPermissions}`
            )

            if (interaction.channelId !== "941609833252130846") {
                await interaction.reply({
                    // embeds: [embed],
                    content:
                        "Announce command can only be invoken in `#announcements` channel!",
                })
                return
            }

            await interaction.reply({
                content: "Please reply the announcement content!",
                ephemeral: true,
            })

            client.once("messageCreate", async (msg) => {
                console.log(`msg ~~> ${msg}`)
                embed.setDescription(msg.content)
                try {
                    await interaction.followUp({
                        embeds: [embed],
                        content: msg.content,
                    })
                } finally {
                    announcement.content = msg.content
                    console.log(
                        `announcement.content  ~~> ${announcement.content}`
                    )
                }
            })

            // await interaction.editReply({
            //     embeds: [embed],
            //     content: "Changed",
            // })

            // interaction.editReply({
            //     embeds: [embed],
            //     // content: embed,
            // })
        }
    })
}

export = announce
