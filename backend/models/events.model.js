import mongoose,{Schema} from "mongoose";

const eventSchema = new Schema(
    {
        eventId:{
            type: String,
            required: true,
            index: true,
        },
        title:{
            type: String,
            required: true,
        },
        description:{
            type: String,
            required: true,
        },
        thumbnail:{
            type: String,
            required: true,
        },
        images: { 
            type: [String], 
            default: [], 
        },
    },
    {
        timestamps : true,
    }
)

export const Event = mongoose.model("events",eventSchema);
