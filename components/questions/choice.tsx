import {WrapperChildProps} from "./wrapper";
import React, {useMemo, useState} from "react";
import {getColorByTopic, getIconByTopic} from "../../data/topics";
import styles from "../../styles/question.module.css";
import {IconButton} from "rsuite";
import {EmojiObjects} from "@mui/icons-material";
import SolutionView from "../view/solution-view";
import {GameState, useGameContext} from "../../contexts/GameContext";

export default function ChoiceQuestion({ question, ...rest }: WrapperChildProps) {
    const {gameState} = useGameContext();
    const Icon = useMemo(() => {
        return getIconByTopic(question.topic);
    }, [question]);
    const [showSolution, setShowSolution] = useState(false);
    const [isInitialScreen, setIsInitialScreen] = useState(true);

    const options = ["A", "B", "C", "D"];

    return (
        <div {...rest}>
            <div className={styles.content} style={{ top: "15vh", height: "40%" }}>
                <p>{question.caption}</p>
            </div>
            <div className={styles.choiceContainer}>
                {question.choices!.map((c, index) => (
                    <div className={styles.box} key={question.id + "_" + question.choices!.indexOf(c)}>
                        <div>
                            {options[index]}
                        </div>
                        {c}
                    </div>
                ))}
            </div>
            {gameState === GameState.Solutions && <>
                <IconButton className={styles.solutionButton}
                            icon={<EmojiObjects style={{ fontSize: "inherit" }} />} onClick={() => {
                    setShowSolution(true);
                    setIsInitialScreen(false);
                }} />
                <SolutionView showSolution={showSolution} setShowSolution={setShowSolution} isInitialScreen={isInitialScreen}>
                    {question.choices![Number(question.solution)]}
                </SolutionView>
            </>}
        </div>
    )
}
