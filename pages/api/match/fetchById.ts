import {NextApiRequest, NextApiResponse} from "next";
import connectMongo from "../../../lib/db/connectMongo";
import {unstable_getServerSession} from "next-auth";
import {authOptions} from "../auth/[...nextauth]";
import {MatchModel} from "../../../lib/db/models";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { matchId } = req.body;
    if (!matchId) {
        res.status(500).send("No Match Id provided.");
        return;
    }
    const session = await unstable_getServerSession(req, res, authOptions);
    /*if (!session) {
        res.status(403).send("Access to requested resource prohibited.");
        return;
    }*/
    await connectMongo;
    const match = await MatchModel.findOne({ _id: matchId })
        .populate("teams")
        .populate({ path: "quiz", populate: { path: "questions", model: "Question", populate: { path: "media", model: "Media" } } });
    /*if (match.user._id !== session!.user.id) {
        res.status(403).send("Access to requested resource prohibited.");
        return;
    }*/
    res.send(JSON.stringify(match));
}