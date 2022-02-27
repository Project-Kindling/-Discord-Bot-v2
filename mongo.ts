import mongoose from "mongoose"
import dotenv from "dotenv"
import announcementSchema from "./schemas/announcements"

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

export const insertToDB = async (messageContent: string) => {
    await connectToMongoDB().then(async (mongoose) => {
        try {
            console.log("Connection to MongoDB successful!")
            console.log("Attempting to insert!")
        } finally {
            const announcement = {
                due: "2022-02-19 19:40:20",
                sent: false,
                invoker: "841591263567413248",
                target: "941609833252130846",
                content: messageContent,
                // image: Image,
            }
            await new announcementSchema(announcement).save()
            console.log(announcement)
            mongoose.connection.close()
        }
    })
}

exports = [peekConnection, insertToDB]
