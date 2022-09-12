import Question from "./question";

type Answer = {
    _id?:string,
    teamId: string,
    question: Question,
    values: string[]
}

export default Answer;
