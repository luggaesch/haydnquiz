import {WrapperChildProps} from "./wrapper";
import React, {useState} from "react";
import styles from "../../styles/question.module.css";
import {IconButton} from "rsuite";
import {EmojiObjects, ReadMore} from "@mui/icons-material";
import PopupContainer from "../view/popup-container";
import SolutionView from "../view/solution-view";
import {GameState, useGameContext} from "../../contexts/GameContext";

export default function TextPopupQuestion({ question, ...rest }: WrapperChildProps) {
    const {gameState} = useGameContext();
    const [showContent, setShowContent] = useState(false);
    const [isInitialScreen, setIsInitialScreen] = useState(true);
    const [showSolution, setShowSolution] = useState(false);
    const [isInitialSolutionScreen, setIsInitialSolutionScreen] = useState(true);

    return (
        <div {...rest}>
            <div className={styles.content}>
                <p>{question.caption}</p>
            </div>
            <div>
                <div className={styles.popupButtonContainer}>
                    <IconButton className={styles.popupButton}
                                icon={<ReadMore style={{ fontSize: "inherit" }} />} onClick={() => {
                        setShowContent(true);
                        setIsInitialScreen(false);
                    }} />
                </div>
                <PopupContainer isInitialScreen={isInitialScreen} showContent={showContent} setShowContent={setShowContent}>
                    {question.media!.content}
                </PopupContainer>
            </div>
            {gameState === GameState.Solutions && <>
                <IconButton className={styles.solutionButton}
                            icon={<EmojiObjects style={{ fontSize: "inherit" }} />} onClick={() => {
                    setShowSolution(true);
                    setIsInitialSolutionScreen(false);
                }} />
                <SolutionView showSolution={showSolution} setShowSolution={setShowSolution} isInitialScreen={isInitialScreen}>
                    {typeof question.solution === "string" ? question.solution :
                        <div style={{ width: "100%", height: "90%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", fontSize: "4rem" }}>
                            {(question.solution as string[]).map((s, index) => (
                                <p key={index}>{s}</p>
                            ))}
                        </div>
                    }
                </SolutionView>
            </>}
        </div>
    )
}
