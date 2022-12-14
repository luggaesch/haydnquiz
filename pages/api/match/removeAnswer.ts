import {NextApiRequest, NextApiResponse} from "next";
import connectMongo from "../../../lib/db/connectMongo";
import {getFullyPopulatedMatchById} from "../../../lib/db/utils/match-utils";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === "POST") {
        const { matchId, answerId } = req.body;
        if (!matchId || !answerId) {
            res.status(500).send("Malformed Request");
            return;
        }
        await connectMongo;
        const queriedMatch = await getFullyPopulatedMatchById(matchId);
        if (!queriedMatch) {
            res.status(500).send("Match not found");
            return;
        }
        const index = queriedMatch.answers.findIndex((j) => String(j._id) === answerId);
        if (index === -1) {
            res.status(500).send("Answer not found");
            return;
        }
        queriedMatch.answers.splice(index, 1);
        await queriedMatch.save();
        res.send(JSON.stringify(queriedMatch));
    } else {
        res.status(404).send({});
    }
}