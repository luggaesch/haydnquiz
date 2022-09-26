import React, {ReactNode, SetStateAction, useEffect, useMemo, useState} from "react";
import Team from "../types/team";
import Match from "../types/match";
import axios from "axios";

export enum GameState {
    Before,
    Playing,
    Transition,
    Solutions,
    End
}

interface GameValue {
    match: Match | undefined,
    setMatch: React.Dispatch<SetStateAction<Match | undefined>>,
    gameState: GameState,
    setGameState: React.Dispatch<SetStateAction<GameState>>,
    currentQuestionNum: number,
    setCurrentQuestionNum: React.Dispatch<SetStateAction<number>>,
    maxQuestionNum: number,
    teams: Team[],
    setTeams: React.Dispatch<SetStateAction<Team[]>>
}

const GameContext = React.createContext<GameValue | undefined>(undefined);

export function useGameContext() {
    const context = React.useContext(GameContext);
    if (!context) {
        throw Error("Context can only be consumed from within a GameProvider or its children.")
    }
    return context;
}

export const GameProvider = ({ children }: { children: ReactNode } ) => {
    const [match, setMatch] = useState<Match | undefined>(undefined);
    const maxQuestionNum = useMemo(() => {
        return match?.quiz.questions.length || 0;
    }, [match]);
    const [gameState, setGameState] = useState(GameState.Before);
    const [currentQuestionNum, setCurrentQuestionNum] = useState(0);
    const [teams, setTeams] = useState<Team[]>([]);

    useEffect(() => {
        if (match) {
            match.state = gameState;
            match.teams = teams;
            match.currentQuestionIndex = currentQuestionNum;
            axios.post("/api/match/updateState", { match }).then((res) => {
                console.log(res);
                if (res.status === 200) {
                    if (res.data.answers.length > match.answers.length) {
                        setMatch(res.data);
                    }
                }
            }).catch((err) => console.error(err));
        }
    }, [gameState, currentQuestionNum, teams]);

    useEffect(() => {
        if (match) {
            setGameState(match.state);
            setCurrentQuestionNum(match.currentQuestionIndex);
            setTeams(match.teams);
        }
    }, [match]);

    const value = {
        match,
        setMatch,
        gameState,
        setGameState,
        currentQuestionNum,
        setCurrentQuestionNum,
        maxQuestionNum,
        teams,
        setTeams
    };

    return <GameContext.Provider value={value}>
        {children}
    </GameContext.Provider>;
};
