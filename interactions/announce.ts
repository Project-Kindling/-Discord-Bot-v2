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
import { peekConnection, insertToDB } from "../mongo"

const announce = async (): Promise<void> => {
    client.on("interactionCreate", async (interaction: Interaction) => {
        if (!interaction.isCommand()) {
            return
        }

        const { commandName, options } = interaction

        if (commandName === "announce") {
            const title: string | null = options.getString("title")
            const due: string | null = options.getString("due")
            const target: string | null = options.getString("target")

            // title: string = "",
            // content: string = "",
            // due: string = "",
            // target: string = "941609833252130846",
            // invoker: string = "",
            // image: boolean = false

            /* Date locale must be set to Canada */
            // const nowDate = new Date("2022/02/28")
            const nowDate = new Date()
            console.log("nowDate ~~> ", nowDate) // 2022-02-28T12:00:20,386Z
            console.log("newDate.getHours() ~~> ", nowDate.getHours())

            // const offset = nowDate.getTimezoneOffset() * 60 * 1000
            // console.log("offsetDate ~~> ", offset)
            //
            // const offsetDateMs = nowDate.getTime() - offset
            // console.log("offsetDateMs ~~> ", offsetDateMs)
            // const offsetDate = new Date(offsetDateMs)
            // console.log("offsetDate ~~> ", offsetDate)

            const dueDate = new Date(due!)
            const offset = dueDate.getTimezoneOffset() * 60 * 1000
            const offsetDateMs = dueDate.getTime() - offset
            const offsetDate = new Date(offsetDateMs)
            console.log("dueDate ~~> ", dueDate)
            console.log("offsetDate ~~> ", offsetDate)

            // %% TODO
            /* MM-DD-YY hh:mm */
            /* MM-DD-YY */
            /* x minutes (minimum 5) */
            /* x hours */
            /* x days */
            /* Tomorrow */
            // %% End

            const dueDefaultMs = nowDate.getTime() + 5 * 60 * 1000
            console.log("dueDefaultMs.getTime() ~~> ", dueDefaultMs)

            const announcement: Announcement = new Announcement(
                title!,
                "",
                offsetDate,
                "941609833252130846",
                interaction.member?.toString(),
                false
            )

            console.log("announcement.title ~~> ", announcement.title)

            let embed: DiscordJS.MessageEmbed = new DiscordJS.MessageEmbed()
            embed.setTitle(title!)

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
                            // insertToDB()
                            // insertToDB(msg.content)
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

            insertToDB()
            // peekConnection()

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
