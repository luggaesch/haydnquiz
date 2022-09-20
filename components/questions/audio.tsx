import {WrapperChildProps} from "./wrapper";
import styles from "../../styles/question.module.css";
import React, {useState} from "react";
import {EmojiObjects} from "@mui/icons-material";
// @ts-ignore
import songSfx from "../../assets/songs/song.mp3"
import SolutionView from "../view/solution-view";
import {GameState, useGameContext} from "../../contexts/GameContext";
import AudioPlayer from "./parts/audio-player";

export default function AudioQuestion({ question, showtimer, ...rest }: WrapperChildProps) {
    if (!question.media) {
        throw "No Media supplied";
    }
    const {gameState} = useGameContext();
    const [showSolution, setShowSolution] = useState(false);
    const [isInitialScreen, setIsInitialScreen] = useState(true);

    return (
        <div {...rest}>
            <div className={styles.content} style={{ top: "15%" }}>
                <p>{question.caption}</p>
            </div>
            <AudioPlayer audio={question.media.content!} onFinished={() => showtimer!()} />
            {gameState === GameState.Solutions && <>
                <div className={styles.solutionButton}
                            onClick={() => {
                    setShowSolution(true);
                    setIsInitialScreen(false);
                }}>
                    <EmojiObjects style={{ fontSize: "inherit" }} />
                </div>
                <SolutionView showSolution={showSolution} setShowSolution={setShowSolution} isInitialScreen={isInitialScreen}>
                    {question.solutionArray ?
                        <div style={{ width: "100%", height: "90%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", fontSize: "4rem" }}>
                            {question.solutionArray.map((s, index) => (
                                <p key={index}>{s}</p>
                            ))}
                        </div> : <div>{question.solution}</div>
                    }
                </SolutionView>
            </>}
        </div>
    )
}
