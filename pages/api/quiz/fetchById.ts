import {NextApiRequest, NextApiResponse} from "next";
import connectMongo from "../../../lib/db/connectMongo";
import {unstable_getServerSession} from "next-auth";
import {authOptions} from "../auth/[...nextauth]";
import {QuizModel} from "../../../lib/db/models";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { quizId } = req.body;
    if (!quizId) {
        res.status(500).send("No Quiz Id provided.");
        return;
    }
    const session = await unstable_getServerSession(req, res, authOptions);
    if (!session) {
        res.status(403).send("Access to requested resource prohibited.");
        return;
    }
    await connectMongo;
    const quiz = await QuizModel.findOne({ _id: quizId }).populate({ path: "questions", populate: { path: "media", model: "Media" } });
    if (quiz.owner._id !== session!.user.id) {
        res.status(403).send("Access to requested resource prohibited.");
        return;
    }
    res.send(JSON.stringify(quiz));
}