import {NextApiRequest, NextApiResponse} from "next";
import {QuestionModel, QuizModel} from "../../../../lib/db/models";
import connectMongo from "../../../../lib/db/connectMongo";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    await connectMongo;
    const {userId} = req.query;
    const quizzes = await QuizModel.find({ owner: userId }).populate({ path: "questions", model: QuestionModel }).lean();
    console.log(quizzes);
    res.send(JSON.stringify(quizzes));
}