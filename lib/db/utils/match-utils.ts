import connectMongo from "../connectMongo";
import {MatchModel, QuestionModel, QuizModel, TeamModel} from "../models";

export async function getFullyPopulatedMatchById(matchId: string) {
    await connectMongo;
    return MatchModel.findOne({_id: matchId})
        .populate({path: "quiz", model: QuizModel, populate: {path: "questions", model: QuestionModel}})
        .populate({path: "teams", model: TeamModel});
}