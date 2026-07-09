import mongoose, {Schema} from "mongoose";

const playlistsSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        videos: [
            {
                type: Schema.Types.ObjectId,
                ref: "Videos",
            },
        ], 
        owner: {
            type: Schema.Types.ObjectId,
            ref: "Users"
        }

    }, {timestamps: true}
)

export const Playlists = mongoose.model("Playlists", playlistsSchema)