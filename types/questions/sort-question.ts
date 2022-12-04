import Question from "./index";

export type SortElement = {
    name: string;
    value: number;
}

type SortQuestion = Question & {
    sortElements: SortElement[];
    unit: string;
}

export default SortQuestion;