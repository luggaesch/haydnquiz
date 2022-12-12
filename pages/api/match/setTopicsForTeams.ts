import {NextApiRequest, NextApiResponse} from "next";
import connectMongo from "../../../lib/db/connectMongo";
import {TeamModel} from "../../../lib/db/models";
import {GamePhases} from "../../../types/match";
import {getFullyPopulatedMatchById} from "../../../lib/db/utils/match-utils";
import Team from "../../../types/team";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === "POST") {
        const { matchId, teams } = req.body;
        if (!matchId) {
            res.status(400).send("No Match provided.");
            return;
        }
        if (!teams) {
            res.status(400).send("No Teams provided");
            return;
        }
        await connectMongo;
        const promises = (teams as Team[]).map((team) => {
            return TeamModel.updateOne({ _id: team._id }, { $set: { selectedTopic: team.selectedTopic } });
        });
        await Promise.all(promises);
        const queriedMatch = await getFullyPopulatedMatchById(matchId);
        if (!queriedMatch) {
            res.status(500).send("Match not found");
            return;
        }
        queriedMatch.phase = GamePhases.Playing;
        await queriedMatch.save();
        res.status(200).send(JSON.stringify(queriedMatch));
    } else {
        res.status(404).send({});
    }
}
