import React, {useMemo, useState} from "react";
import Question, {getIconByQuestionType, QuestionTypes, SolutionTypes} from "../types/question";
import {getColorByTopic, getIconByTopic, Topics} from "../data/topics";
import styles from "../styles/index.module.css";
import TimerControl from "../components/view/timer-control";
import useSound from "use-sound";
// @ts-ignore
import countdownSfx from "../assets/sounds/countdown.mp3";
import {getIconByJoker, Jokers} from "../data/jokers";
import {FaArrowUp, FaLightbulb} from "react-icons/fa";
import {MdQuestionAnswer} from "react-icons/md";
import {MediaTypes} from "../data/questions";
import AudioPlayer from "../components/questions/parts/audio-player";

export default function Index({ showSolution, showTeamAnswers }: { showSolution: boolean, showTeamAnswers: boolean }) {
    const [question] = useState<Question>({ topic: Topics.History, type: QuestionTypes.Hearing, media: { type: MediaTypes.Video }, value: -1, jokerReward: Jokers.Telefon, caption: "Welches Land?", solution: "Deutschland", timeInSeconds: 60, solutionType: SolutionTypes.Text });
    const { TopicIcon, TypeIcon } = useMemo(() => {
        return {
            TopicIcon: getIconByTopic(question.topic),
            TypeIcon: getIconByQuestionType(question.type)
        }
    }, [question]);
    const [play] = useSound(countdownSfx, { volume: 1});

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
            <div className={styles.container}>
                <div className={styles.metaContainer}>
                    <div className={styles.topic} style={{ backgroundColor: getColorByTopic(question.topic) }}>
                        <TopicIcon style={{ fontSize: "4em" }}/>
                    </div>
                    <div className={styles.metaItem}>
                        <TypeIcon style={{ fontSize: "3em" }} />
                    </div>
                    {question.value !== -1 && <div className={styles.metaItem}>
                        <p>{question.value}</p>
                    </div>}
                </div>
                <div className={styles.caption} style={{ gridRowEnd: getCaptionRowEnd() }}>
                    {question.jokerReward && <div className={styles.jokerDisplay} style={{}} >
                        {getIconByJoker(question.jokerReward)} {question.jokerReward}
                    </div>}
                    {question.caption}
                </div>
                {question.media && <div className={styles.mediaContainer} style={{ gridRowStart: getCaptionRowEnd() }}>
                    {question.media.type === MediaTypes.Audio ?
                        <AudioPlayer audio={question.media.content!} onFinished={() => {}} />
                        :

                        <FaArrowUp style={{ fontSize: "2em", color: "white" }} />
                    }
                </div>}
                <div className={styles.singleContainer} style={{ gridColumn: 3, gridRow: 1 }}>
                    <TimerControl totalTime={question.timeInSeconds} playCountdown={play} />
                </div>
                {showSolution && <div className={styles.singleContainer} style={{ gridColumn: 3, gridRow: 3,  }}>
                    <FaLightbulb className={styles.icon} />
                </div>}
                {showTeamAnswers && <div className={styles.singleContainer} style={{ gridColumn: 3, gridRow: 4 }}>
                    <MdQuestionAnswer className={styles.icon}/>
                </div>}
            </div>
        </div>
    )
}
