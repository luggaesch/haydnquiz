import Quiz from "./quiz";
import Team from "./team";
import {GameState} from "../contexts/GameContext";
import Answer from "./answer";

type Match = {
    _id?: string,
    user: string,
    quiz: Quiz,
    teams: Team[],
    answers: Answer[],
    state: GameState,
    currentQuestionIndex: number,
    startTime: Date,
    finished: boolean,
}

export function isMatch(match: Match | any): match is Match {
    return (match as Match).quiz !== undefined;
}

export default Match;
