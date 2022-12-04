import mongoose from "mongoose";
import {GamePhases} from "../../../types/match";
import {Jokers} from "../../../types/joker";

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
                questionId: { type: String, required: true },
                values: [{ type: String }],
                points: { type: Number, default: 0 }
            }),
            default: []
        }
    ],
    jokers: [
        {
            type: new mongoose.Schema({
                name: { type: String, enum: Jokers, required: true },
                teamId: { type: String, required: true },
                assignedQuestionId: { type: String, default: undefined },
            }),
            default: []
        }
    ],
    phase: {
        type: Number,
        enum: GamePhases,
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
    },
    currentlyOpenUploadRound: {
        type: Number,
        default: -1
    },
    pastUploadRounds: [{
        type: Number,
        default: []
    }]
});

export default MatchSchema;
