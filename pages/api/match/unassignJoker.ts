import {NextApiRequest, NextApiResponse} from "next";
import connectMongo from "../../../lib/db/connectMongo";
import {isJoker} from "../../../types/joker";
import {MatchModel, QuestionModel, QuizModel, TeamModel} from "../../../lib/db/models";
import {getFullyPopulatedMatchById} from "../../../lib/db/utils/match-utils";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === "POST") {
        const { matchId, jokerId } = req.body;
        if (!matchId || !jokerId) {
            res.status(400).send("Malformed Request.");
            return;
        }
        await connectMongo;
        const queriedMatch = await getFullyPopulatedMatchById(matchId);
        if (!queriedMatch) {
            res.status(500).send("Match not found");
            return;
        }
        const index = queriedMatch.jokers.findIndex((j) => String(j._id) === jokerId);
        if (index === -1) {
            res.status(500).send("Joker not found");
            return;
        }
        queriedMatch.jokers[index].assignedQuestionId = undefined;
        await queriedMatch.save();
        res.send(JSON.stringify(queriedMatch));
    } else {
        res.status(404).send({});
    }
}
