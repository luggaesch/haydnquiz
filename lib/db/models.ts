import mongoose from "mongoose";
import MatchSchema from "./schemas/match";
import MediaSchema from "./schemas/media";
import QuestionSchema from "./schemas/question";
import QuizSchema from "./schemas/quiz";
import TeamSchema from "./schemas/team";
import Media from "../../types/media";
import Question from "../../types/question";
import Quiz from "../../types/quiz";
import Team from "../../types/team";
import Match from "../../types/match";

let MediaModel: mongoose.Model<Media>;
try {
    MediaModel = mongoose.model<Media>("media");
} catch (err) {
    MediaModel = mongoose.model<Media>("media", MediaSchema);
}

let QuestionModel: mongoose.Model<Question>;
try {
    QuestionModel = mongoose.model<Question>("question");
} catch (err) {
    QuestionModel = mongoose.model<Question>("question", QuestionSchema);
}

let QuizModel: mongoose.Model<Quiz>;
try {
    QuizModel = mongoose.model<Quiz>("quiz");
} catch (err) {
    QuizModel = mongoose.model<Quiz>("quiz", QuizSchema);
}

let TeamModel: mongoose.Model<Team>;
try {
    TeamModel = mongoose.model<Team>("team");
} catch (err) {
    TeamModel = mongoose.model<Team>("team", TeamSchema);
}

let MatchModel: mongoose.Model<Match>;
try {
    MatchModel = mongoose.model<Match>("match");
} catch (err) {
    MatchModel = mongoose.model<Match>("match", MatchSchema);
}

export {MatchModel, MediaModel, QuestionModel, TeamModel, QuizModel};
