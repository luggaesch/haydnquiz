import {NextApiRequest, NextApiResponse} from "next";
import {unstable_getServerSession} from "next-auth";
import {authOptions} from "../auth/[...nextauth]";
import connectMongo from "../../../lib/db/connectMongo";
import {QuizModel} from "../../../lib/db/models";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === "POST") {
        const { quizName } = req.body;
        if (!quizName) {
            res.status(500).send("No Quiz Name or UserId provided.");
            return;
        }
        const session = await unstable_getServerSession(req, res, authOptions);
        if (!session) {
            res.status(403).send("Access to requested resource prohibited.");
            return;
        }
        await connectMongo;
        const quiz = await QuizModel.create({ name: quizName, owner: session.user.id, questions: [] })
        res.send(JSON.stringify(quiz));
    } else {
        res.status(404).send({});
    }
}