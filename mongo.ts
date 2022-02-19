import mongoose from "mongoose"
import dotenv from "dotenv"

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

exports = peekConnection
