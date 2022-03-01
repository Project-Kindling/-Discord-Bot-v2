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

export const insertToDB = async () => {
    await connectToMongoDB().then(async (mongoose) => {
        try {
            console.log("Connection to MongoDB successful!")
            console.log("Attempting to insert!")
        } finally {
            /* Announcement obj goes here */
            const announcement = {
                due: 0,
                sent: false,
                invoker: "841591263567413248",
                target: "941609833252130846",
                content: "messageContent",
                // image: Image,
            }
            await new announcementSchema(announcement).save()
            console.log(announcement)
            mongoose.connection.close()
        }
    })
}

// export const insertToDB = async () => {
//     await connectToMongoDB().then(async (mongoose) => {
//         try {
//             console.log("Connection to MongoDB successful!")
//             console.log("Attempting to insert!")
//
//             /* Announcement obj goes here */
//             // const announcementDoc = {
//             //     due: announcement.due,
//             //     sent: false,
//             //     invoker: announcement.invoker,
//             //     target: announcement.target,
//             //     content: announcement.content,
//             // }
//
//             const announcementDoc = {
//                 title: "Title",
//                 content: "Hello World!",
//                 // due: Date,
//                 due: "000",
//                 target: "111",
//                 // image: String,
//                 // timer: Timer,
//                 invoker: "Invoker strikes!",
//                 // sent: Boolean,
//
//                 // title: "Title",
//                 // due: "000",
//                 // // sent: false,
//                 // invoker: "841591263567413248",
//                 // target: "941609833252130846",
//                 // content: "Hello World!",
//                 // // image: Image,
//             }
//             await new announcementSchema(announcementDoc).save()
//             console.log("announcementDoc ~~> ", announcementDoc)
//         } finally {
//             mongoose.connection.close()
//         }
//     })
// }

exports = [peekConnection, insertToDB]
