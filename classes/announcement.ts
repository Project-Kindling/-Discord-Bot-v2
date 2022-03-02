import { Timer } from "./timer"

class Announcement {
    title: string // Announcement title
    content: string // Announcement content
    due: Date // Announcement due date
    target: string // Target channel
    invoker: string // Invoker of `/announce` command
    image: boolean // Possible image attachments
    timer: Timer // Timer object

    constructor(
        title: string = "",
        content: string = "",
        due: Date = new Date(),
        target: string = "941609833252130846",
        invoker: string = "",
        image: boolean = false
    ) {
        this.title = title
        this.content = content
        this.due = due
        this.target = target
        this.invoker = invoker
        this.image = image
        this.timer = new Timer()
    }
}

export { Announcement }
