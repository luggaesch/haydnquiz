import {NextApiRequest, NextApiResponse} from "next";
import {QuestionModel, QuizModel} from "../../../../lib/db/models";
import connectMongo from "../../../../lib/db/connectMongo";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    try {
        await connectMongo;
        const {userId} = req.query;
        const quizzes = await QuizModel.find({ owner: userId }).populate({ path: "questions", model: QuestionModel }).lean();
        res.send(JSON.stringify(quizzes));
    } catch (err) {
        res.status(500).send(JSON.stringify(err));
    }
}