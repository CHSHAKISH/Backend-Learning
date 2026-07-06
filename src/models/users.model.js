import mongoose, {Schema} from "mongoose";
import bcrypt from "bcrypt";
import jwt, { sign } from "jsonwebtoken"

const usersSchema = new Schema(
    {
        watchHistory: [
            {
                type: Schema.Types.ObjectId,
                ref: "Videos",
            }
        ],
        username: {
            type: String,
            required: true,
            lowercase: true,
            unique: true,
            trim: true,
            index: true,

        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true, 
            trim: true,
        },
        fullName: {
            type: String,
            required: true,
            trim: true,
            index: true,

        },
        avatar: {
            type: String, // cloudinary url
            required: true,

        },
        coverImage: {
            type: String, // cloudinary url

        },
        password: {
            type: String,
            required: [true, "Password is required!"],

        },
        refreshToken: {
            type: String,
        },
    }, {timestamps: true}
)

usersSchema.pre("save", async function (next) {
    if(!this.isModified("password")) return next();

    this.password = bcrypt.hash(this.password, 10)
    next()
})

usersSchema.method.isPasswordCorrect = async function(password) {
    return await bcrypt.compare(password, this.password)
}

usersSchema.method.generateAccessToken = function() {
    return jwt.sign(
        {
            _id: this._id,
            username: this.username,
            email: this.email,
            fullName: this.fullName
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}

usersSchema.method.generateRefreshToken = function() {
    return sign(
        {
            _id: this._id
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}

export const Users = mongoose.model("Users", "usersSchema")