import Quiz from "./quiz";
import Team from "./team";
import Answer from "./answer";
import Joker from "./joker";

export enum GamePhases {
    TopicSelection = -2,
    Introduction = -1,
    Playing,
    Transition,
    Solutions,
    Rankings,
}

type Match = {
    _id?: string,
    user: string,
    quiz: Quiz,
    teams: Team[],
    answers: Answer[],
    phase: GamePhases,
    currentQuestionIndex: number,
    startTime: string,
    finished: boolean,
    currentlyOpenUploadRound: number,
    pastUploadRounds: number[],
    jokers: Joker[]
}

export function isMatch(match: Match | any): match is Match {
    return (match as Match).quiz !== undefined;
}

export default Match;
