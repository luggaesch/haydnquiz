import Question from "./index";

type ChoiceQuestion = Question & {
    choices: string[];
}

export default ChoiceQuestion;