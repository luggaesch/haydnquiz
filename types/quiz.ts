import Question from "./question";

type Quiz = {
    _id?: string,
    name: string;
    owner: string;
    questions: Question[]
}

export default Quiz;