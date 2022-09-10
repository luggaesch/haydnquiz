import {NextApiRequest, NextApiResponse} from "next";
import {MatchModel, QuizModel} from "../../../../lib/db/models";
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
    await connectMongo;
    const matches = await MatchModel.find({ user: userId, finished: false }).populate({ path: "quiz", model: QuizModel });
    res.send(JSON.stringify(matches));
}