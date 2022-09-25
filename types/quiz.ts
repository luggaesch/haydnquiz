import Question from "./question";

type Quiz = {
    _id?: string,
    name: string;
    owner: string;
    questions: Question[],
    stops: number[]
}

export function isQuiz(quiz: Quiz | any): quiz is Quiz {
    return (quiz as Quiz).name !== undefined;
}

export default Quiz;