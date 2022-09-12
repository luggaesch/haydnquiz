import TextQuestion from "./text";
import ImageQuestion from "./image";
import styles from "../../styles/question.module.css";
import React, {useMemo, useState} from "react";
import useSound from "use-sound";
// @ts-ignore
import countdownSfx from "../../assets/sounds/countdown.mp3"
import AudioQuestion from "./audio";
import VideoQuestion from "./video";
import ChoiceQuestion from "./choice";
import GuesstimateQuestion from "./guesstimate";
import SortQuestion from "./sort";
import TextPopupQuestion from "./text-popup";
import {motion} from "framer-motion";
import TimerControl from "../view/timer-control";
import {getIconByJoker} from "../../data/jokers";
import {GameState, useGameContext} from "../../contexts/GameContext";
import Question, {QuestionTypes} from "../../types/question";
import MetaContainer from "../view/meta-container";

export interface WrapperChildProps {
    question: Question;
    showtimer?: () => void;
    [x: string]: any;
}

function formatQuestionFromType(question: Question, showTimer: () => void) {
    switch (question.type) {
        case QuestionTypes.Basic:
            return <TextQuestion className={styles.questionContainer} question={question}/>
        case QuestionTypes.Quote:
            return <TextPopupQuestion showtimer={showTimer} className={styles.questionContainer} question={question}/>
        case QuestionTypes.Image:
            return <ImageQuestion className={styles.questionContainer} question={question}/>
        case QuestionTypes.Hearing:
            return <AudioQuestion showtimer={showTimer} className={styles.questionContainer} question={question}/>
        case QuestionTypes.Video:
            return <VideoQuestion showtimer={showTimer} className={styles.questionContainer} question={question}/>
        case QuestionTypes.Choice:
            return <ChoiceQuestion className={styles.questionContainer} question={question}/>
        case QuestionTypes.Sort:
            return <SortQuestion question={question} className={styles.questionContainer}/>
        case QuestionTypes.Guesstimate:
            return <GuesstimateQuestion className={styles.questionContainer} question={question}/>
    }
}

export default function QuestionWrapper({ question, hideOverlay, ...rest }: { question: Question, hideOverlay?: boolean }) {
    const {gameState} = useGameContext();
    const [timerHidden, setTimerHidden] = useState(false /*question.media && (question.media.type === MediaType.Audio || question.media.type == MediaType.Video)*/)
    const child = useMemo(() => {
        return formatQuestionFromType(question,() => setTimerHidden(false))
    }, [question]);
    const [play] = useSound(countdownSfx, { volume: 1});
    const [questionHidden, setQuestionHidden] = useState(true);
    const animation = useMemo(() => {
        return {
            opacity: questionHidden ? [1, 1, 1, 1, 1, 1, 1] : [1, 0.7, 0.4, 0.2, 0.1, 0.05, 0],
            transitionEnd: {
                display: questionHidden ? "flex" : "none"
            }
        }
    }, [questionHidden]);

    return (
        <div className={styles.wrapper} {...rest}>
            <MetaContainer topic={question.topic} type={question.type} value={question.value} />
            {question.jokerReward && <div className={styles.jokerDisplay}>
                {getIconByJoker(question.jokerReward)} {question.jokerReward}
            </div>}
            {gameState !== GameState.Solutions && !hideOverlay && <motion.div className={styles.wrapperOverlay}
                        initial={{ opacity: 1 }}
                        animate={animation}
                        transition={{
                            duration: 1,
                            ease: "easeInOut",
                            times: [0, 0.3, 0.6, 0.8, 0.9, 0.95, 1],
                            repeat: 0,
                        }}
                        onClick={() => setQuestionHidden(false)}
            >?
            </motion.div>}
            {!questionHidden && !timerHidden  && (question.timeInSeconds >= 0) && gameState !== GameState.Solutions && <TimerControl totalTime={question.timeInSeconds} playCountdown={play} style={{position: "absolute", top: 20, right: 5, zIndex: 10}}/>}
            {child}
        </div>
    )
}
