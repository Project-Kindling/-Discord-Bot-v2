import { Guild, GuildMember, Message, Role } from "discord.js"
import { Announcement } from "../classes/announcement"
import client from "../client"

const newAnnouncement: Announcement = new Announcement()
console.log("channelID ~~> ", newAnnouncement.channelID)
console.log("title ~~> ", newAnnouncement.title)
console.log("content ~~> ", newAnnouncement.content)
console.log("schedule ~~> ", newAnnouncement.schedule)
console.log("image ~~> ", newAnnouncement.image)

const announce = async (): Promise<void> => {
    client.on("messageCreate", async (msg: Message) => {
        const cmdInvokation: boolean = msg.content === "!announce"

        let guild: Guild | undefined = client.guilds.cache.get(msg.guildId!)

        // const member: GuildMember | undefined = guild!.members.cache.get(msg.author.id)
        // console.log("member ~~> ", member)
        // const role: Role | undefined = guild!.roles.cache.get("941706439913787432") // admin
        // const role: Role | undefined = guild!.roles.cache.get("879212507925995540") // everyone
        // console.log("role ~~> ", role)
        // console.log("role ~~> ", role?.name)
        // console.log("msg.author ~~> ", msg.author)
        // const roles: Role = guild!.roles.everyone
        // console.log("roles ~~> ", roles)
        // console.log("guild ~~> ", guild)
        // console.log("msg.guild.roles ~~> ", msg.guild?.roles)

        console.log(
            "msg.member.roles ~~> ",
            msg.member!.roles.cache.forEach((role: Role) =>
                console.log(role.name, role.id)
            )
        )

        const member: GuildMember | undefined = guild!.members.cache.get(
            msg.author.id
        )
        console.log(`member ~~> ${member}`)
        let roleName: string[] = []
        let roleId: string[] = []
        console.log(
            member?.roles.cache.forEach((role: Role) => {
                console.log(`role.name ~> ${role.name} | role.id ~> ${role.id}`)
                roleName.push(role.name)
                roleId.push(role.id)
                console.log(`roleName ~~> ${roleName}`)
                console.log(`roleId ~~> ${roleId}`)
            })
        )

        if (
            cmdInvokation &&
            msg.channelId !== "941707999968387146" &&
            msg.author.bot === false
        ) {
            await msg.reply(
                "Sorry, `!announce` can only be invoked from `#moderators` channel."
            )
            console.log(`msg.channelId ~~> ${msg.channelId}`)

            return
        }

        const verifyRoles = (): boolean => {
            let roleName: string[] = []
            member?.roles.cache.forEach((role) => {
                roleName.push(role.name)
            })
            if (roleName.includes("admin")) {
                return true
            }
            return false
        }

        if (cmdInvokation && verifyRoles() !== true) {
            await msg.reply(
                "You have to have the `admin` role to schedule announcements!"
            )
        }

        if (cmdInvokation && msg.author.bot === false) {
            console.log(`msg.channelId ~~> ${msg.channelId}`)
        }
    })
}

export = announce
