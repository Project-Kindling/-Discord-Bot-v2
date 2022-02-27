import DiscordJS, {
    Guild,
    // GuildMember,
    Interaction,
    // Message,
    // Role,
} from "discord.js"
import { Announcement } from "../classes/announcement"
import client from "../client"
// import ready from "../commands"
import { peekConnection, insertToDB } from "../mongo";

const announce = async (): Promise<void> => {
    client.on("interactionCreate", async (interaction: Interaction) => {
        if (!interaction.isCommand()) {
            return
        }

        const { commandName, options } = interaction

        if (commandName === "announce") {
            const title: string | null = options.getString("title")
            const content: string | null = options.getString("content")
            const channel: string | null = options.getString("channel")
            const schedule: string | null = options.getString("schedule")
            const image: boolean | null = options.getBoolean("image")

            const announcement: Announcement = new Announcement(title!)
            console.log(announcement.title)

            let embed: DiscordJS.MessageEmbed = new DiscordJS.MessageEmbed()
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
                        "The `/announce` command can only be invoked from the `#announcements` channel!",
                })
                return
            }

            await interaction.reply({
                content: "Please reply the announcement content!",
                ephemeral: true,
            })

            const expectInvokerMsg = () => {
                client.once("messageCreate", async (msg) => {
                    if (msg.author.bot === true) {
                        return
                    }
                    console.log(`msg ~~> ${msg}`)
                    const guild: Guild | undefined = client.guilds.cache.get(
                        msg.guildId!
                    )
                    const member = guild?.members.cache.get(msg.author.id)
                    if (member === interaction.member) {
                        embed.setDescription(msg.content)

                        if (msg.attachments.size > 0) {
                            embed.setImage(
                                msg.attachments.first()?.url.toString()!
                            )
                        }

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

                            insertToDB(msg.content)

                        }
                    } else {
                        await msg.reply(
                            "Sorry but you are not the invoker of the command!"
                        )
                        expectInvokerMsg()
                    }
                })
            }

            expectInvokerMsg()

            peekConnection()

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
