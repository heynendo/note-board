import mongoose from "mongoose"

//const connectionString = "mongodb+srv://heynendonovan:OFvA9WnxMAOHmALt@cluster0.llvszyj.mongodb.net/<DATABASE-NAME>?retryWrites=true&w=majority&appName=Cluster0"

export const connectDB = async () => {
    try{
        await mongoose.connect(process.env.MONGO_URI)
        console.log("MongoDB Connected Successfully")
    } catch(e) {
        console.error(`Error connecting to MongoDB: ${e}`)
        process.exit(1) //exit with failure
    }
}