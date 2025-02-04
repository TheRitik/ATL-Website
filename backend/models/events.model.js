import mongoose,{Schema} from "mongoose";

const eventSchema = new Schema(
    {
        eventId:{
            type: Number,
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
    },
    {
        timestamps : true,
    }
)

export const Event = mongoose.model("events",eventSchema);
