import mongoose from "mongoose";
import MatchSchema from "./schemas/match";
import MediaSchema from "./schemas/media";
import QuestionSchema from "./schemas/question";
import QuizSchema from "./schemas/quiz";

let MediaModel: mongoose.Model<any>;
try {
    MediaModel = mongoose.model("media");
} catch (err) {
    MediaModel = mongoose.model("media", MediaSchema);
}

let QuestionModel: mongoose.Model<any>;
try {
    QuestionModel = mongoose.model("question");
} catch (err) {
    QuestionModel = mongoose.model("question", QuestionSchema);
}

let QuizModel: mongoose.Model<any>;
try {
    QuizModel = mongoose.model("quiz");
} catch (err) {
    QuizModel = mongoose.model("quiz", QuizSchema);
}

let MatchModel: mongoose.Model<any>;
try {
    MatchModel = mongoose.model("match");
} catch (err) {
    MatchModel = mongoose.model("match", MatchSchema);
}

export {MatchModel, MediaModel, QuestionModel, QuizModel};
