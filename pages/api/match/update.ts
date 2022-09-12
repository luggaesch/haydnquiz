import {NextApiRequest, NextApiResponse} from "next";
import {MatchModel, QuestionModel} from "../../../lib/db/models";
import Match, {isMatch} from "../../../types/match";
import connectMongo from "../../../lib/db/connectMongo";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === "POST") {
        const { match } = req.body;
        if (!match || !isMatch(match)) {
            res.status(500).send("No Match provided.");
            return;
        }
        await connectMongo;
        const queriedMatch = (await MatchModel.findOne({ _id: match._id }).populate({ path: "answers.question", model: QuestionModel })) as Match;
        match.answers.forEach((a) => {
            const index = queriedMatch.answers.findIndex((qa) => qa.question._id === a.question._id && qa.teamId === a.teamId);
            if (index !== -1) {
                queriedMatch.answers[index].values = a.values;
            } else {
                queriedMatch.answers.push(a);
            }
        });
        console.log(queriedMatch);
        const m = await MatchModel.updateOne({ _id: match._id } ,{
            teams: match.teams,
            currentQuestionIndex: match.currentQuestionIndex,
            state: match.state,
            answers: queriedMatch.answers
        });
        console.log(m);
        res.send(JSON.stringify(m));
    } else {
        res.status(404).send({});
    }
}
