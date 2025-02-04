import mongoose,{Schema} from "mongoose";
const imageSchema = new Schema(
    {
        eventId:{
            type: String,
            required: true,
            index: true,
        },
        imageCollection:{
            type:[String],
        },
        title:{
            type: String,
        },
        description:{
            type: String,
        },
        createdAt:{
            type: String,
        },
    }
)
export const images = mongoose.model("images",imageSchema);