import styles from "../../styles/index.module.css";
import React, {useMemo, useState} from "react";
import useSound from "use-sound";
// @ts-ignore
import countdownSfx from "../../assets/sounds/countdown.mp3"
import TimerControl from "../view/timer-control";
import {getIconByJoker} from "../../data/jokers";
import Question, {getIconByQuestionType, QuestionTypes} from "../../types/question";
import {getColorByTopic, getIconByTopic} from "../../data/topics";
import HideOverlay from "./parts/hide-overlay";
import {FaLightbulb} from "react-icons/fa";
import PopupContainer from "./parts/popup-container";
import MediaContent from "./parts/media-content";
import SolutionContent from "./parts/solution-content";
import Answer from "../../types/answer";
import MetaContainer from "./parts/meta-container";

export default function QuestionWrapper({ question, answers, hideTimer, hideOverlay, fontSize }: { question: Question, answers?: Answer[], hideTimer?: boolean, hideOverlay?: boolean, fontSize?: number }) {
    const [play] = useSound(countdownSfx, { volume: 1});
    const [solutionOpen, setSolutionOpen] = useState(false);
    const [hideVisible, setHideVisible] = useState(true);

    function getCaptionRowEnd() {
        switch (question.type) {
            case QuestionTypes.Basic:
                return 5;
            case QuestionTypes.Guesstimate:
            case QuestionTypes.Choice:
                return 3;
            default:
                return 4;
        }
    }

    return (
        <div className={styles.root} style={{ fontSize: fontSize ?? 16  }}>
            {!hideOverlay && <HideOverlay visible={hideVisible} setVisible={setHideVisible} />}
            <div className={styles.container}>
                <MetaContainer question={question} styles={{ gridColumn: 1, gridRowStart: 1, gridRowEnd: 5 }} />
                <div className={styles.caption} style={{ gridRowEnd: getCaptionRowEnd() }}>
                    {question.jokerReward && <div className={styles.jokerDisplay} style={{}} >
                        {getIconByJoker(question.jokerReward, "var(--text)", 50, 50)} {question.jokerReward}
                    </div>}
                    {question.caption}
                </div>
                {question.type !== QuestionTypes.Basic && <MediaContent question={question} rowEnd={getCaptionRowEnd()} />}
                {(!hideVisible && question.timeInSeconds !== -1 && !hideTimer) && <div className={styles.singleContainer} style={{ gridColumn: 3, gridRow: 1 }}>
                    <TimerControl totalTime={question.timeInSeconds} playCountdown={play} />
                </div>}
                {answers && <div className={styles.singleContainer} style={{ gridColumn: 3, gridRow: 4 }}>
                    <div style={{ width: "100%", height: "100%", display: "flex", justifyContent: "center", alignItems: "center" }} onClick={() => setSolutionOpen(!solutionOpen)}>
                        <FaLightbulb className={styles.icon} />
                    </div>
                    <PopupContainer open={solutionOpen} setOpen={setSolutionOpen}>
                        <SolutionContent type={question.solutionType} text={question.solution} array={question.solutionArray} />
                    </PopupContainer>
                </div>}
            </div>
        </div>
    )
}
