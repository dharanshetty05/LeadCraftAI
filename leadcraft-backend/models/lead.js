const mongoose = require("mongoose")

const LeadSchema = new mongoose.Schema(
    {
        businessName: {
            type: String,
            required: true,
        },
        instagramUsername: {
            type: String,
            required: true,
            unique: true,
        },
        displayName: {
            type: String,
        },
        instagramUrl: {
            type: String,
        },
        bio: {
            type: String,
        },
        category: {
            type: String,
        },
        location: {
            type: String,
        },
        followers: {
            type: Number,
        },
        posts: {
            type: Number,
        },
        summary: {
            type: String,
            required: true,
        },
        opportunity: {
            type: String,
            required: true,
        },
        message: {
            type: String,
            required: true,
        },
        status: {
            type: String,
            enum: ["NEW", "MESSAGE_READY", "MESSAGED", "REPLIED"],
            default: "NEW",
        },
    },
    {
        timestamps: true
    }
)

module.exports = mongoose.model("Lead", LeadSchema)