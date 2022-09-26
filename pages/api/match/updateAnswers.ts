import {NextApiRequest, NextApiResponse} from "next";
import {MatchModel} from "../../../lib/db/models";
import connectMongo from "../../../lib/db/connectMongo";
import Answer from "../../../types/answer";
import Match from "../../../types/match";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === "POST") {
        const { matchId, answers, uploadRound } = req.body;
        if (!matchId) {
            res.status(500).send("No Match provided.");
            return;
        }
        await connectMongo;
        const queriedMatch = await MatchModel.findOne({ _id: matchId });
        if ((queriedMatch as Match).currentlyOpenUploadRound !== uploadRound) {
            res.status(403).send("Round locked");
            return;
        }
        answers.forEach((a: Answer) => {
            const index = queriedMatch.answers.findIndex((qa: Answer) => String(qa.questionId) === String(a.questionId) && String(qa.teamId) === String(a.teamId));
            if (index !== -1) {
                queriedMatch.answers[index].values = a.values;
            } else {
                queriedMatch.answers.push(a);
            }
        });
        await queriedMatch.save();
        res.send(JSON.stringify(queriedMatch));
    } else {
        res.status(404).send({});
    }
}
