import {NextApiRequest, NextApiResponse} from "next";
import connectMongo from "../../../lib/db/connectMongo";
import {TeamModel} from "../../../lib/db/models";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === "POST") {
        const { team } = req.body;
        console.log(team);
        if (!team || !team.user || !team.name || team.numOfPlayers === undefined || !team.color) {
            res.status(500).send("No Team provided or malformed.");
            return;
        }
        await connectMongo;
        const t = await TeamModel.create(team);
        res.send(JSON.stringify(t));
    } else {
        res.status(404).send({});
    }
}