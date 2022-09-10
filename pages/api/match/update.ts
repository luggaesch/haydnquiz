import {NextApiRequest, NextApiResponse} from "next";
import {MatchModel} from "../../../lib/db/models";
import {isMatch} from "../../../types/match";
import connectMongo from "../../../lib/db/connectMongo";

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
        const m = await MatchModel.updateOne({ _id: match._id } ,{
            teams: match.teams,
            currentQuestionIndex: match.currentQuestionIndex,
            state: match.state
        });
        console.log(m);
        res.send(JSON.stringify(m));
    } else {
        res.status(404).send({});
    }
}