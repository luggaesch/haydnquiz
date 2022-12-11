import Question from "./index";

export type Category = {
    name: string;
    items: string[]
}

type CategorizeQuestion = Question & {
    categories: Category[]
}

export default CategorizeQuestion;