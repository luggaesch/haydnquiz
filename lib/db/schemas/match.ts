import mongoose from "mongoose";
import {GameState} from "../../../contexts/GameContext";

const MatchSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    quiz: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Quiz",
        required: true
    },
    teams: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Team",
            default: []
        }
    ],
    answers: [
        {
            type: new mongoose.Schema({
                teamId: { type: String, required: true },
                question: { type: mongoose.Schema.Types.ObjectId, ref: "Question", required: true },
                values: [{ type: String }]
            }),
            default: []
        }
    ],
    state: {
        type: Number,
        enum: GameState,
        required: true
    },
    currentQuestionIndex: {
        type: Number,
        required: true
    },
    startTime: {
        type: Date,
        default: Date.now()
    },
    finished: {
        type: Boolean,
        default: false
    }
});

export default MatchSchema;
