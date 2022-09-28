import {NextApiRequest, NextApiResponse} from "next";
import {QuestionModel, QuizModel} from "../../../lib/db/models";
import connectMongo from "../../../lib/db/connectMongo";
import {isQuiz} from "../../../types/quiz";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === "POST") {
        const { quiz } = req.body;
        if (!quiz || !isQuiz(quiz)) {
            res.status(500).send("No Quiz provided.");
            return;
        }
        await connectMongo;
        const queriedQuiz = await QuizModel.findOne({ _id: quiz._id });
        if (!queriedQuiz) {
            res.status(400).send("No Quiz with ID in Database");
            return;
        }
        queriedQuiz.name = quiz.name;
        queriedQuiz.questions = quiz.questions;
        queriedQuiz.stops = quiz.stops;
        await queriedQuiz.save();
        res.send(JSON.stringify(await queriedQuiz.populate({ path: "questions", model: QuestionModel })));
    } else {
        res.status(404).send({});
    }
}
