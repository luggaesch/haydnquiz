import React, {ReactNode, SetStateAction, useEffect, useState} from "react";
import Team from "../types/team";
import Match from "../types/match";
import axios from "axios";

export enum GameState {
    Intro,
    EnterTeams,
    Example,
    Before,
    Playing,
    Transition,
    Solutions,
    End
}

interface GameValue {
    setMatch: React.Dispatch<SetStateAction<Match | undefined>>,
    gameState: GameState,
    setGameState: React.Dispatch<SetStateAction<GameState>>,
    currentQuestionNum: number,
    setCurrentQuestionNum: React.Dispatch<SetStateAction<number>>,
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
    const [gameState, setGameState] = useState(GameState.Intro);
    const [currentQuestionNum, setCurrentQuestionNum] = useState(0);
    const [teams, setTeams] = useState<Team[]>([]);

    useEffect(() => {
        if (match) {
            match.state = gameState;
            match.teams = teams;
            match.currentQuestionIndex = currentQuestionNum;
            axios.post("/api/match/update", { match }).then((res) => console.log(res));
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
        setMatch,
        gameState,
        setGameState,
        currentQuestionNum,
        setCurrentQuestionNum,
        teams,
        setTeams
    };

    return <GameContext.Provider value={value}>
        {children}
    </GameContext.Provider>;
};
