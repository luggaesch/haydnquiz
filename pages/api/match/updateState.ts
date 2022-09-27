import {NextApiRequest, NextApiResponse} from "next";
import {MatchModel, QuestionModel, QuizModel, TeamModel} from "../../../lib/db/models";
import connectMongo from "../../../lib/db/connectMongo";
import Match, {isMatch} from "../../../types/match";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === "POST") {
        const { match } = req.body;
        if (!match || !isMatch(match)) {
            res.status(500).send("No Match provided.");
            return;
        }
        await connectMongo;
        const queriedMatch = await MatchModel.findOne({ _id: match._id })
            .populate({ path: "quiz", model: QuizModel, populate: { path: "questions", model: QuestionModel } })
            .populate({ path: "teams", model: TeamModel });
        queriedMatch.currentQuestionIndex = match.currentQuestionIndex;
        queriedMatch.state = match.state;
        queriedMatch.finished = match.finished;
        await queriedMatch.save();
        res.send(JSON.stringify(queriedMatch));
    } else {
        res.status(404).send({});
    }
}
