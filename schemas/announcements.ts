// Announcement schema

import mongoose from "mongoose"

const announcementSchema = new mongoose.Schema({
    // | ID                | `?`       |
    // | Due date          | `Date`    |
    // | Sent flag         | `Boolean` |
    // | Invoker           | `String`  |
    // | Target channel ID | `String`  |
    // | Content           | `String`  |
    // | Image             | `image    |

    title: String,
    content: String,
    due: Date,
    target: String,
    invoker: String,
    sent: Boolean,
    // image: String,
    // timer: Timer,
})

export = mongoose.model("announcements", announcementSchema)
