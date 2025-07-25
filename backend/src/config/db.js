import mongoose from "mongoose"

export const connectDB = async () => {
    try{
        await mongoose.connect(process.env.MONGO_URI)
        console.log("MongoDB Connected Successfully")
    } catch(e) {
        console.error(`Error connecting to MongoDB: ${e}`)
        process.exit(1) //exit with failure
    }
}
