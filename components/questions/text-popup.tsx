import {WrapperChildProps} from "./wrapper";
import React, {useState} from "react";
import styles from "../../styles/question.module.css";
import {EmojiObjects, ReadMore} from "@mui/icons-material";
import PopupContainer from "../view/popup-container";
import SolutionView from "../view/solution-view";
import {GameState, useGameContext} from "../../contexts/GameContext";
import Image from "next/image";

export default function TextPopupQuestion({ question, ...rest }: WrapperChildProps) {
    if (!question.media) {
        throw "No question.Media supplied";
    }
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
                    <div className={styles.popupButton}
                                onClick={() => {
                        setShowContent(true);
                        setIsInitialScreen(false);
                    }}>
                        <ReadMore style={{ fontSize: "inherit" }} />
                    </div>
                </div>
                <PopupContainer isInitialScreen={isInitialScreen} showContent={showContent} setShowContent={setShowContent}>
                    {question.media.content}
                </PopupContainer>
            </div>
            {gameState === GameState.Solutions && <>
                <div className={styles.solutionButton}
                            onClick={() => {
                    setShowSolution(true);
                    setIsInitialSolutionScreen(false);
                }}>
                    <EmojiObjects style={{ fontSize: "inherit" }} />
                </div>
                <SolutionView showSolution={showSolution} setShowSolution={setShowSolution} isInitialScreen={isInitialSolutionScreen}>
                    {question.solutionIsUrl ?
                        <div className={styles.popupContainerContent}>
                            <Image layout="fill" objectFit="contain" src={question.solution}
                                   style={{background: "white" }} alt=""/>
                        </div>
                        :
                        question.solutionArray ?
                        <div style={{ width: "100%", height: "90%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", fontSize: "4rem" }}>
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
