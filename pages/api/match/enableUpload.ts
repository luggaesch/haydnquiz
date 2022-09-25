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
        const queriedMatch = await MatchModel.findOne({ _id: matchId }).update({ currentlyOpenUploadRound: uploadRound });
        res.send(JSON.stringify(queriedMatch));
    } else {
        res.status(404).send({});
    }
}
