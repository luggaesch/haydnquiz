import React, {useMemo, useState} from "react";
import Question, {getIconByQuestionType, QuestionTypes, SolutionTypes} from "../types/question";
import {getColorByTopic, getIconByTopic, Topics} from "../data/topics";
import styles from "../styles/index.module.css";
import TimerControl from "../components/view/timer-control";
import useSound from "use-sound";
// @ts-ignore
import countdownSfx from "../assets/sounds/countdown.mp3";
import {getIconByJoker} from "../data/jokers";
import {FaLightbulb} from "react-icons/fa";
import Answer from "../types/answer";
import MediaContent from "../components/questions/parts/media-content";
import PopupContainer from "../components/questions/parts/popup-container";
import SolutionContent from "../components/questions/parts/solution-content";
import HideOverlay from "../components/questions/parts/hide-overlay";

export default function Index({ answers }: { answers: Answer[] }) {
    const [question] = useState<Question>({ topic: Topics.History, type: QuestionTypes.Sort,
        sortElements: [
            { name: "Der König der Löwen", value: 8.5 },
            { name: "Aladdin", value: 8.00 },
            { name: "Dschungelbuch", value: 7.6 },
            { name: "Frozen", value: 7.4 },
            { name: "Lilo und Stich", value: 7.3 },
            { name: "Pocahontas", value: 6.7 },
            { name: "Der Glöckner v. Notre Dame", value: 7 },
            { name: "Toy Story", value: 8.3 },
            { name: "WALL-E", value: 8.4 },
            { name: "Findet Nemo", value: 8.2 },
        ], unit: "",
        value: 2, caption: "Welches Land?", solution: "Deutschland", timeInSeconds: -1, solutionType: SolutionTypes.Text });
    const { TopicIcon, TypeIcon } = useMemo(() => {
        return {
            TopicIcon: getIconByTopic(question.topic),
            TypeIcon: getIconByQuestionType(question.type)
        }
    }, [question]);
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
        <div className={styles.root}>
            <HideOverlay visible={hideVisible} setVisible={setHideVisible} />
            <div className={styles.container}>
                <div className={styles.metaContainer}>
                    <div className={styles.topic} style={{ backgroundColor: getColorByTopic(question.topic) }}>
                        <TopicIcon style={{ fontSize: "4em" }}/>
                    </div>
                    <div className={styles.metaItem}>
                        <TypeIcon style={{ fontSize: "3em" }} />
                    </div>
                    {question.value !== -1 && <div className={styles.metaItem}>
                        <div style={{ fontSize: "3em" }}>{question.value}</div>
                    </div>}
                </div>
                <div className={styles.caption} style={{ gridRowEnd: getCaptionRowEnd() }}>
                    {question.jokerReward && <div className={styles.jokerDisplay} style={{}} >
                        {getIconByJoker(question.jokerReward)} {question.jokerReward}
                    </div>}
                    {question.caption}
                </div>
                {question.type !== QuestionTypes.Basic && <MediaContent question={question} rowEnd={getCaptionRowEnd()} />}
                {(!hideVisible && question.timeInSeconds !== -1) && <div className={styles.singleContainer} style={{ gridColumn: 3, gridRow: 1 }}>
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
