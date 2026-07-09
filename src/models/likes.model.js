import mongoose, {Schema} from "mongoose";

const likesSchema = new Schema(
    {
        video: {
            type: Schema.Types.ObjectId,
            ref: "Videos"
        },
        comment: {
            type: Schema.Types.ObjectId,
            ref: "Comments"
        },
        tweet: {
            type: Schema.Types.ObjectId,
            ref: "Tweets"
        },
        likedBy: {
            type: Schema.Types.ObjectId,
            ref: "Users"
        }

    }, {timestamps: true}
)

export const Likes = mongoose.model("Likes", likesSchema)