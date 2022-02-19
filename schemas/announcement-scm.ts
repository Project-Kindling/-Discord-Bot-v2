import mongoose from "mongoose"

const announcementSchema = new mongoose.Schema({
// | ID                | `?`       |
// | Due date          | `Date`    |
// | Sent flag         | `Boolean` |
// | Invoker           | `String`  |
// | Target channel ID | `String`  |
// | Content           | `String`  |
// | Image             | `image    |
    due: Date,
    sent: Boolean,
    invoker: String,
    target: String,
    content: String,
    image: Image,
})

export = mongoose.model("announcements", announcementSchema)
