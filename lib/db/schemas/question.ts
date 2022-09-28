import {Topics} from "../../../data/topics";
import {Jokers} from "../../../data/jokers";
import mongoose from "mongoose";
import {QuestionTypes, SolutionTypes} from "../../../types/question";
import {MediaTypes} from "../../../types/media";

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
        enum: Jokers,
    },
    solution: {
        type: String,
        required: true,
    },
    solutionType: {
        type: String,
        enum: SolutionTypes,
        required: true
    },
    solutionArray: [
        {
            type: String,
        }
    ],
    media: {
        type: new mongoose.Schema({
            type: {
                type: String,
                enum: MediaTypes,
                required: true
            },
            content: {
                type: String
            },
            sources: [
                {
                    type: String
                }
            ]
        })
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