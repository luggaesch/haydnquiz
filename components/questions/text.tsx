import React, {useState} from "react";
import {WrapperChildProps} from "./wrapper";
import styles from "../../styles/question.module.css";
import {IconButton} from "rsuite";
import {EmojiObjects} from "@mui/icons-material";
import SolutionView from "../view/solution-view";
import {GameState, useGameContext} from "../../contexts/GameContext";
import Image from "next/image";

export default function TextQuestion({ question, ...rest }: WrapperChildProps) {
    const {gameState} = useGameContext();
    const [showSolution, setShowSolution] = useState(false);
    const [isInitialScreen, setIsInitialScreen] = useState(true);

    console.log(gameState === GameState.Solutions || gameState === GameState.Example);

    return (
        <div {...rest}>
            <div className={styles.content}>
                <p>{question.caption}</p>
            </div>
            {(gameState === GameState.Solutions || gameState === GameState.Example) && <>
                <IconButton className={styles.solutionButton}
                            icon={<EmojiObjects style={{ fontSize: "inherit" }} />} onClick={() => {
                    setShowSolution(true);
                    setIsInitialScreen(false);
                }} />
                <SolutionView showSolution={showSolution} setShowSolution={setShowSolution} isInitialScreen={isInitialScreen}>
                    {question.solutionIsUrl ?
                        <div className={styles.popupContainerContent}>
                            <Image layout="fill" objectFit="contain" src={question.solution}
                                   style={{background: "white" }} alt=""/>
                        </div>
                        :
                        question.solutionArray ?
                        <div style={{ width: "100%", height: "90%", overflowY: "auto", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", fontSize: "4rem" }}>
                            {(question.solutionArray).map((s, index) => (
                                <p key={index}>{s}</p>
                            ))}
                        </div> : <div>{question.solution}</div>
                    }
                </SolutionView>
            </>}
        </div>
    )
}
