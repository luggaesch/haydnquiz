import {getIconByQuestionType, Media, Question} from "../../data/questions";
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
import {getColorByTopic, getIconByTopic} from "../../data/topics";
import SortQuestion from "./sort";
import TextPopupQuestion from "./text-popup";
import Joker from "../../public/joker.svg";
import { motion } from "framer-motion";
import TimerControl from "../view/timer-control";
import {getIconByJoker} from "../../data/jokers";
import SolutionView from "../view/solution-view";
import {IconButton} from "rsuite";
import {EmojiObjects} from "@mui/icons-material";
import Link from "next/link";
import {GameState, useGameContext} from "../../contexts/GameContext";

export interface WrapperChildProps {
    question: Question;
    showtimer?: () => void;
    [x: string]: any;
}

function formatQuestionFromType(question: Question, showTimer: () => void) {
    if (question.media) {
        switch (question.media?.type) {
            case Media.Image: {
                return <ImageQuestion className={styles.questionContainer} question={question}/>
            }
            case Media.Audio: {
                return <AudioQuestion showtimer={showTimer} className={styles.questionContainer} question={question}/>
            }
            case Media.Video: {
                return <VideoQuestion showtimer={showTimer} className={styles.questionContainer} question={question}/>
            }
            case Media.Text: {
                return <TextPopupQuestion showtimer={showTimer} className={styles.questionContainer} question={question}/>
            }
        }
    } else if (question.choices) {
        return <ChoiceQuestion className={styles.questionContainer} question={question}/>
    } else if (question.items) {
        return <SortQuestion question={question} className={styles.questionContainer} />
    } else if (typeof question.solution === "number") {
        return <GuesstimateQuestion className={styles.questionContainer} question={question}/>
    } else {
        return <TextQuestion className={styles.questionContainer} question={question}/>
    }
}

export default function QuestionWrapper({question }: { question: Question }) {
    const {gameState} = useGameContext();
    const { TopicIcon, TypeIcon } = useMemo(() => {
        return {
            TopicIcon: getIconByTopic(question.topic),
            TypeIcon: getIconByQuestionType(question)
        }
    }, [question]);
    const [timerHidden, setTimerHidden] = useState(question.media && (question.media.type === Media.Audio || question.media.type == Media.Video))
    const child = useMemo(() => {
        return formatQuestionFromType(question, () => setTimerHidden(false))
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
        <div className={styles.wrapper}>
            <div className={styles.metaContainer}>
                <div className={styles.topic} style={{backgroundColor: getColorByTopic(question.topic) }}>
                    <TopicIcon className={styles.icon}/>
                </div>
                <div className={styles.mediaType}>
                    <TypeIcon className={styles.icon} />
                </div>
                <div className={styles.value}>
                    {typeof question.value === "number" ? <p>{question.value}</p> : <Joker style={{ fill: "var(--text)", width: "100%", height: "100%" }} />}
                </div>
            </div>
            {typeof question.value === "string" && <div className={styles.jokerDisplay}>
                {getIconByJoker(question.value)} {question.value}
            </div>}
            {gameState !== GameState.Solutions && <motion.div className={styles.wrapperOverlay}
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
