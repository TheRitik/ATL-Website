import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const connectDb = async () =>{
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
        console.log(`MongoDB Connected! DB Host: ${mongoose.connection.host}`);
        
    } catch (error) {
        console.log("MongoDb connection error : ",error);
    }
}
export default connectDb;