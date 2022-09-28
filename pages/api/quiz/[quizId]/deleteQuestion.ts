import {NextApiRequest, NextApiResponse} from "next";
import connectMongo from "../../../../lib/db/connectMongo";
import {QuestionModel, QuizModel} from "../../../../lib/db/models";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === "POST") {
        const {questionId} = req.body;
        if (!questionId) {
            res.status(500).send("No Question provided.");
            return;
        }
        const { quizId } = req.query;
        await connectMongo;
        const queriedQuiz = await QuizModel.findOne({ _id: quizId }).populate({ path: "questions", model: QuestionModel });
        if (!queriedQuiz) {
            res.status(500).send("Quiz with ID does not exist.");
            return;
        }
        // @ts-ignore
        await queriedQuiz.questions.pull({ _id: questionId });
        await queriedQuiz.save();
        //TODO: Delete Question from DB?
        res.send(JSON.stringify(queriedQuiz));
    } else {
        res.status(404).send({});
    }
}
