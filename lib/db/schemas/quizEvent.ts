import mongoose from "mongoose";

const QuizEventSchema = new mongoose.Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    quizId: {
        type: String,
        required: true
    },
    teams: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "team",
            required: true,
            default: []
        }
    ],
    solos: [
        {
            type: new mongoose.Schema({
                name: { type: String, required: true },
                selectedDays: [
                    {
                        type: Date, required: true, default: []
                    }
                ]
            }),
            required: true,
            default: []
        }
    ],
    availableDays: [
        {
            type: Date,
            required: true
        }
    ],
    selectedDaysByTeamId: [
        {
            type: new mongoose.Schema({
                teamId: { type: String, required: true },
                days: [
                    { type: Date, required: true, default: [] }
                ]
            }),
            required: true,
            default: []
        }
    ]
});

export default QuizEventSchema;