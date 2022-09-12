import {NextApiRequest, NextApiResponse} from "next";
import {unstable_getServerSession} from "next-auth";
import {authOptions} from "../auth/[...nextauth]";
import {GameState} from "../../../contexts/GameContext";
import connectMongo from "../../../lib/db/connectMongo";
import {MatchModel} from "../../../lib/db/models";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === "POST") {
        const { quizId } = req.body;
        if (!quizId) {
            res.status(500).send("No Quiz provided.");
            return;
        }
        const session = await unstable_getServerSession(req, res, authOptions);
        if (!session) {
            res.status(403).send("Access to requested resource prohibited.");
            return;
        }
        await connectMongo;
        const match = await MatchModel.create({
            user: session.user.id,
            quiz: quizId,
            teams: [],
            state: GameState.Intro,
            currentQuestionIndex: 0
        });
        res.send(JSON.stringify(match));
    } else {
        res.status(404).send({});
    }
}