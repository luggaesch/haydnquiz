import {unstable_getServerSession} from "next-auth"
import {authOptions} from "./auth/[...nextauth]"
import type {NextApiRequest, NextApiResponse} from "next";
import connectMongo from "../../lib/db/connectMongo";
import {Topics} from "../../data/topics";
import {MediaType} from "../../data/questions";
import Question, {QuestionTypes} from "../../types/question";
import Media from "../../types/media";
import {MediaModel, QuestionModel, QuizModel} from "../../lib/db/models";


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
  await connectMongo;

  const question1: Question = {
    type: QuestionTypes.Basic,
    caption: "Test",
    topic: Topics.Mystery,
    timeInSeconds: 60,
    value: 2,
    solution: "Auch Test"
  }
  const q1 = await QuestionModel.create(question1);

  const media2: Media = {
    type: MediaType.Image,
    content: "/images/questions_resized/rolle.webp",
  }

  const m2 = await MediaModel.create(media2);

  const question2: Question = {
    type: QuestionTypes.Image,
    caption: "Wie viele Portionen befinden sich in einer handelsüblichen Packung dieses Produkts?",
    topic: Topics.FoodAndDrinks,
    timeInSeconds: 90,
    value: 2,
    solution: "17",
  }

  const q2 = await QuestionModel.create({ ...question2, media: m2 });

  const session = await unstable_getServerSession(req, res, authOptions);

  const quiz1 = {
    name: req.body,
    owner: session?.user.id,
  }

  const quiz = await QuizModel.create({ ...quiz1, questions: [q1, q2]});

  /*res.send(JSON.stringify(session, null, 2))*/
  res.send(JSON.stringify(await quiz.populate({ path: "questions", model: QuestionModel })));
}