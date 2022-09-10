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
            type: new mongoose.Schema({ name: { type: String, required: true }, numOfPlayers: { type: Number, required: true }, color: { type: String, required: true } }),
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