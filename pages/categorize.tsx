import QuestionWrapper from "../features/question";
import {QuestionTypes, SolutionTypes} from "../types/questions";
import {Topics} from "../data/topics";
import {Jokers} from "../data/jokers";

export default function Categorize() {

    return (
        <div style={{ width: "100vw", height: "100vh" }}>
            <QuestionWrapper question={{ type: QuestionTypes.Categorize, caption: "Categorize", topic: Topics.Mystery, timeInSeconds: -1, value: -1, jokerReward: Jokers.Wikipedia, solution: "", solutionType: SolutionTypes.Text,
                categories: [{ name: "Mondelez", items: ["Oreo", "Kitkat", "Skittles", "Philadelphia"] }, { name: "Kraft", items: ["Baked Beans", "Ketchup", "Stuff", "Mayonnaise"] }, { name: "Nestlé", items: ["Lipton", "Arizona", "Tommy", "Exquisa"] }]
            }} />
        </div>
    )
}