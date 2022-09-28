import {NextApiRequest, NextApiResponse} from "next";
import connectMongo from "../../../lib/db/connectMongo";
import Answer from "../../../types/answer";
import {getFullyPopulatedMatchById} from "../../../lib/db/utils/match-utils";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === "POST") {
        const { matchId, answers } = req.body;
        if (!matchId) {
            res.status(500).send("No Match provided.");
            return;
        }
        await connectMongo;
        const queriedMatch = await getFullyPopulatedMatchById(matchId);
        if (!queriedMatch) {
            res.status(400).send("No Match with ID in Database");
            return;
        }
        answers.forEach((a: Answer) => {
            const index = queriedMatch.answers.findIndex((qa: Answer) => String(qa.questionId) === String(a.questionId) && String(qa.teamId) === String(a.teamId));
            if (index !== -1) {
                queriedMatch.answers[index].points = a.points;
            }
        });
        await queriedMatch.save();
        res.send(JSON.stringify(queriedMatch));
    } else {
        res.status(404).send({});
    }
}
