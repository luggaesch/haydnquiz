import {NextApiRequest, NextApiResponse} from "next";
import {unstable_getServerSession} from "next-auth";
import {authOptions} from "../../auth/[...nextauth]";
import {MatchModel, MediaModel, QuestionModel, QuizModel, TeamModel} from "../../../../lib/db/models";
import connectMongo from "../../../../lib/db/connectMongo";
import {getFullyPopulatedMatchById} from "../../../../lib/db/utils/match-utils";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const matchId = String(req.query.matchId);
    if (!matchId) {
        res.status(500).send("No Match Id provided.");
        return;
    }
    const session = await unstable_getServerSession(req, res, authOptions);
    console.log(session);
    /*if (!session) {
        res.status(403).send("Access to requested resource prohibited.");
        return;
    }*/
    await connectMongo;
    const match = await getFullyPopulatedMatchById(matchId);
    if (!match) {
        res.status(400).send("No Match with ID in Database");
        return;
    }
    res.send(JSON.stringify(match));
}