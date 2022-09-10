import {Topics} from "../../../data/topics";
import {Joker} from "../../../data/jokers";
import mongoose from "mongoose";
import {QuestionTypes} from "../../../types/question";

const QuestionSchema = new mongoose.Schema({
    type: {
        type: String,
        enum: QuestionTypes,
        required: true,
    },
    caption: {
        type: String,
        required: true,
    },
    topic: {
        type: String,
        enum: Topics,
        required: true,
    },
    timeInSeconds: {
        type: Number,
        required: true
    },
    value: {
        type: Number,
        required: true,
    },
    jokerReward: {
        type: String,
        enum: Joker,
    },
    solution: {
        type: String,
        required: true,
    },
    solutionIsUrl: {
        type: Boolean,
    },
    solutionArray: [
        {
            type: String,
        }
    ],
    media: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Media",
    },
    choices: [
        {
            type: String,
        }
    ],
    sortElements: [
        {
            type: new mongoose.Schema({ name: { type: String, required: true }, value: { type: Number, required: true } }),
        }
    ],
    unit: {
        type: String
    }
});

export default QuestionSchema;