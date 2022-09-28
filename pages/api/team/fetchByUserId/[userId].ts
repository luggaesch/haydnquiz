import {NextApiRequest, NextApiResponse} from "next";
import {TeamModel} from "../../../../lib/db/models";
import connectMongo from "../../../../lib/db/connectMongo";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { userId } = req.query;
    if (!userId) {
        res.status(500).send("No User Id provided.");
        return;
    }
    try {
        await connectMongo;
        const teams = await TeamModel.find({ user: userId });
        res.send(JSON.stringify(teams));
    } catch(err) {
        res.status(500).send(JSON.stringify(err));
    }
}