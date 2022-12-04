import {NextApiRequest, NextApiResponse} from "next";
import connectMongo from "../../../lib/db/connectMongo";
import {isJoker} from "../../../types/joker";
import {MatchModel, QuestionModel, QuizModel, TeamModel} from "../../../lib/db/models";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === "POST") {
        const { matchId, joker } = req.body;
        if (!matchId) {
            res.status(400).send("No Match provided.");
            return;
        }
        if (!joker || !isJoker(joker)) {
            res.status(400).send("No Joker provided");
            return;
        }
        await connectMongo;
        MatchModel.findOneAndUpdate({ _id: matchId }, { $push: { jokers: joker } }, { new: true })
            .populate({path: "quiz", model: QuizModel, populate: {path: "questions", model: QuestionModel}})
            .populate({path: "teams", model: TeamModel})
            .exec((err, updatedMatch) => {
                if (err) {
                    res.status(500).send(err.message);
                    return;
                }
                console.log(updatedMatch);
                res.send(JSON.stringify(updatedMatch));
            });
    } else {
        res.status(404).send({});
    }
}
