import mongoose from "mongoose";
import {QuestionTypes} from "../../../types/questions";

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
    players: [{
        type: String,
        required: true,
    }],
    color: {
        type: String,
        required: true
    },
    selectedTopic: {
        type: String,
        enum: QuestionTypes,
        required: false,
    }
})

export default TeamSchema;