class Announcement {
    channelID: string
    title: string
    content: string
    schedule: string
    image: boolean
    constructor(
        channelID: string = "941609833252130846",
        title: string = "",
        content: string = "",
        schedule: string = "",
        image: boolean = false
    ) {
        this.channelID = channelID
        this.title = title
        this.content = content
        this.schedule = schedule
        this.image = image
    }
}

export { Announcement }
