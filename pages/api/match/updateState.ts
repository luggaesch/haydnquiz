import {NextApiRequest, NextApiResponse} from "next";
import {MatchModel, QuestionModel, QuizModel, TeamModel} from "../../../lib/db/models";
import connectMongo from "../../../lib/db/connectMongo";
import Match, {isMatch} from "../../../types/match";
import {getFullyPopulatedMatchById} from "../../../lib/db/utils/match-utils";

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
        const queriedMatch = await getFullyPopulatedMatchById(match._id!);
        if (!queriedMatch) {
            res.status(400).send("No Match with ID in Database");
            return;
        }
        queriedMatch.currentQuestionIndex = match.currentQuestionIndex;
        queriedMatch.phase = match.phase;
        queriedMatch.finished = match.finished;
        await queriedMatch.save();
        res.send(JSON.stringify(queriedMatch));
    } else {
        res.status(404).send({});
    }
}
