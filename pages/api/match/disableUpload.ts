import {NextApiRequest, NextApiResponse} from "next";
import {MatchModel} from "../../../lib/db/models";
import connectMongo from "../../../lib/db/connectMongo";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === "POST") {
        const { matchId, uploadRound } = req.body;
        console.log(uploadRound);
        if (!matchId || uploadRound === undefined) {
            res.status(500).send("No Match or Round provided.");
            return;
        }
        await connectMongo;
        const queriedMatch = await MatchModel.findOne({ _id: matchId });
        if (!queriedMatch) {
            res.status(400).send("No Match with ID in Database");
            return;
        }
        const result = await queriedMatch.update({ currentlyOpenUploadRound: -1, pastUploadRounds: [...queriedMatch.pastUploadRounds, uploadRound] })
        res.send(JSON.stringify(result));
    } else {
        res.status(404).send({});
    }
}
