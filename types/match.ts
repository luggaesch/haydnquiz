import Quiz from "./quiz";
import Team from "./team";
import Answer from "./answer";

export enum GamePhases {
    Playing,
    Transition,
    Solutions,
    Rankings,
    End
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
    pastUploadRounds: number[]
}

export function isMatch(match: Match | any): match is Match {
    return (match as Match).quiz !== undefined;
}

export default Match;
