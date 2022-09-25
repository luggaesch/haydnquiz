import {NextApiRequest, NextApiResponse} from "next";
import {unstable_getServerSession} from "next-auth";
import {authOptions} from "../../auth/[...nextauth]";
import {MatchModel, MediaModel, QuestionModel, QuizModel, TeamModel} from "../../../../lib/db/models";
import connectMongo from "../../../../lib/db/connectMongo";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { matchId } = req.query;
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
    const match = await MatchModel.findOne({ _id: matchId })
        .populate({ path: "teams", model: TeamModel })
        .populate({ path: "quiz", model: QuizModel, populate: { path: "questions", model: QuestionModel, populate: { path: "media", model: MediaModel } } });
    /*if (match.user._id !== session!.user.id) {
        res.status(403).send("Access to requested resource prohibited.");
        return;
    }*/
    res.send(JSON.stringify(match));
}