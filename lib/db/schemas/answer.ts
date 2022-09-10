import mongoose from "mongoose";

const AnswerSchema = new mongoose.Schema({
    team: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Team",
        required: true
    },
    question: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Question",
        required: true
    },
    values: [{
        type: String
    }]
});

export default AnswerSchema;