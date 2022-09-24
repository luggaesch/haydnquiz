import mongoose from "mongoose";

const TeamSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    name: {
        type: String,
        required: true
    },
    numOfPlayers: {
        type: Number,
        required: true
    },
    color: {
        type: String,
        required: true
    }
})

export default TeamSchema;