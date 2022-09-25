import mongoose from "mongoose";

const QuizSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    questions: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Question"
        }
    ],
    stops: [
        {
            type: Number,
            default: []
        }
    ]
});

export default QuizSchema;