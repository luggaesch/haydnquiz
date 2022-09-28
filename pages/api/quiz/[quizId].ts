import {NextApiRequest, NextApiResponse} from "next";
import connectMongo from "../../../lib/db/connectMongo";
import {MediaModel, QuestionModel, QuizModel} from "../../../lib/db/models";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { quizId } = req.query;
    if (!quizId) {
        res.status(500).send("No Quiz Id provided.");
        return;
    }
    await connectMongo;
    const quiz = await QuizModel.findOne({ _id: quizId }).populate({ path: "questions", model: QuestionModel, populate: { path: "media", model: MediaModel } });
    if (!quiz) {
        res.status(400).send("No Quiz with ID in Database");
        return;
    }
    res.send(JSON.stringify(quiz));
}