import {NextApiRequest, NextApiResponse} from "next";
import {MatchModel, QuestionModel} from "../../../lib/db/models";
import {isMatch} from "../../../types/match";
import connectMongo from "../../../lib/db/connectMongo";
import Answer from "../../../types/answer";

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
        const queriedMatch = await MatchModel.findOne({ _id: match._id }).populate({ path: "answers.question", model: QuestionModel });
        match.answers.forEach((a) => {
            const index = queriedMatch.answers.findIndex((qa: Answer) => String(qa.question._id) === String(a.question._id) && String(qa.teamId) === String(a.teamId));
            if (index !== -1) {
                queriedMatch.answers[index].values = a.values;
            } else {
                queriedMatch.answers.push(a);
            }
        });
        queriedMatch.save();
        res.send(JSON.stringify(queriedMatch));
    } else {
        res.status(404).send({});
    }
}
