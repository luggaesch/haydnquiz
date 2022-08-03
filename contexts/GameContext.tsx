import React, {ReactNode, SetStateAction, useState} from "react";
import {TeamProvider} from "./TeamContext";

export const enum GameState {
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
    gameState: GameState,
    setGameState: React.Dispatch<SetStateAction<GameState>>,
    currentQuestionNum: number,
    setCurrentQuestionNum: React.Dispatch<SetStateAction<number>>
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
    const [gameState, setGameState] = useState( GameState.Intro);
    const [currentQuestionNum, setCurrentQuestionNum] = useState(0);

    const value = {
        gameState,
        setGameState,
        currentQuestionNum,
        setCurrentQuestionNum
    };

    return <GameContext.Provider value={value}>
        <TeamProvider>
            {children}
        </TeamProvider>
    </GameContext.Provider>;
};
