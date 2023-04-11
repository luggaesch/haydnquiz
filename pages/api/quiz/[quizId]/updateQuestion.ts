import {NextApiRequest, NextApiResponse} from "next";
import connectMongo from "../../../../lib/db/connectMongo";
import {QuestionModel, QuizModel} from "../../../../lib/db/models";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === "POST") {
        const {question} = req.body;
        if (!question) {
            res.status(500).send("No Question provided.");
            return;
        }
        const { quizId } = req.query;
        await connectMongo;
        await QuestionModel.updateOne({ _id: question._id}, {
            type: question.type, caption: question.caption, topic: question.topic, timeInSeconds: question.timeInSeconds,
            value: question.value,
            jokerReward: question.jokerReward,
            solution: question.solution,
            solutionType: question.solutionType,
            solutionArray: question.solutionArray,
            media: {...question.media},
            choices: question.choices,
            sortElements: question.sortElements,
            unit: question.unit
        });
        const queriedQuiz = await QuizModel.findOne({ _id: quizId }).populate({ path: "questions", model: QuestionModel });
        res.send(JSON.stringify(queriedQuiz));
    } else {
        res.status(404).send({});
    }
}
