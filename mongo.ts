import mongoose from "mongoose"
import dotenv from "dotenv"
import announcementSchema from "./schemas/announcements"
import { Announcement } from "./classes/announcement"

dotenv.config()

const mongoPath: string =
    "mongodb+srv://" +
    process.env.DB_USER +
    ":" +
    process.env.DB_TOKEN +
    "@project-kindling.sxowc.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"

const connectToMongoDB = async () => {
    await mongoose.connect(mongoPath, {
        // useNewUrlParser: true,
        // useUnifiedTopology: true
    })
    return mongoose
}

export const peekConnection = async () => {
    await connectToMongoDB().then(async (mongoose) => {
        try {
            console.log("Connection to MongoDB successful!")
        } finally {
            mongoose.connection.close()
        }
    })
}

// export const insertToDB = async () => {
//     await connectToMongoDB().then(async (mongoose) => {
//         try {
//             console.log("Connection to MongoDB successful!")
//             console.log("Attempting to insert!")
//         } finally {
//             /* Announcement obj goes here */
//             const announcement = {
//                 due: 0,
//                 sent: false,
//                 invoker: "Someone",
//                 target: "Someone else",
//                 content: "Content",
//                 // image: Image,
//             }
//             await new announcementSchema(announcement).save()
//             console.log(announcement)
//             mongoose.connection.close()
//         }
//     })
// }

export const insertToDB = async (announcement: Announcement) => {
    await connectToMongoDB().then(async (mongoose) => {
        try {
            console.log("Connection to MongoDB successful!")
            console.log("Attempting to insert!")

            const announcementDoc = {
                title: announcement.title,
                content: announcement.content,
                due: announcement.due,
                target: announcement.target,
                invoker: announcement.invoker,
                sent: false,
            }

            await new announcementSchema(announcementDoc).save()
            console.log("announcementDoc (SENT) ~~> ", announcementDoc)
        } finally {
            mongoose.connection.close()
        }
    })
}

export const pullUnsentFromDB = async () => {
    await connectToMongoDB().then(async (mongoose) => {
        let unsentAnnouncements
        let unsentAnnouncementsLength
        try {
            unsentAnnouncements = await announcementSchema.find({
                sent: false,
            })
            unsentAnnouncementsLength = unsentAnnouncements.length
            console.log("unsentAnnouncements~~> ", unsentAnnouncements)
            console.log(
                "unsentAnnouncements.length ~~> ",
                unsentAnnouncements.length
            )
        } finally {
            mongoose.connection.close()
            return [ unsentAnnouncements, unsentAnnouncementsLength ]
        }
    })
}
