import {NextApiRequest, NextApiResponse} from "next";
import {MatchModel, QuestionModel, QuizModel, TeamModel} from "../../../../lib/db/models";
import connectMongo from "../../../../lib/db/connectMongo";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { userId } = req.query;
    if (!userId) {
        res.status(500).send("No User Id provided.");
        return;
    }
    try {
        await connectMongo;
        const matches = await MatchModel.find({ user: userId, finished: false }).populate({ path: "quiz", model: QuizModel, populate: { path: "questions", model: QuestionModel } }).populate({ path: "teams", model: TeamModel });
        res.send(JSON.stringify(matches));
    } catch (err) {
        res.status(500).send(JSON.stringify(err));
    }
}