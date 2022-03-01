import mongoose from "mongoose"

const announcementSchema = new mongoose.Schema({
    // | ID                | `?`       |
    // | Due date          | `Date`    |
    // | Sent flag         | `Boolean` |
    // | Invoker           | `String`  |
    // | Target channel ID | `String`  |
    // | Content           | `String`  |
    // | Image             | `image    |

    // title: String,
    content: String,
    // due: Date,
    due: Number,
    target: String,
    // image: String,
    // timer: Timer,
    invoker: String,
    sent: Boolean,
})

export = mongoose.model("announcements", announcementSchema)
