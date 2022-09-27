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
import Team from "../../types/team";
import {Input} from "antd";

export default function QuestionWrapper({ index, question, answers, teams, hideTimer, hideOverlay, fontSize }: { index?: number, question: Question, answers?: Answer[], teams?: Team[], hideTimer?: boolean, hideOverlay?: boolean, fontSize?: number }) {
    const [play] = useSound(countdownSfx, { volume: 1});
    const [solutionOpen, setSolutionOpen] = useState(false);
    const [hideVisible, setHideVisible] = useState(true);
    const [points, setPoints] = useState(0);

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
                <MetaContainer question={question} style={{ gridColumn: 1, gridRowStart: 1, gridRowEnd: 5 }} />
                <div className={styles.caption} style={{ gridRowEnd: getCaptionRowEnd() }}>
                    {question.jokerReward && <div className={styles.jokerDisplay} style={{}} >
                        {getIconByJoker(question.jokerReward, "var(--text)", 60, 60)} {question.jokerReward}
                    </div>}
                    {index !== undefined && <div style={{ fontSize: "0.6em", position: "absolute", top: 5, left: 10, width: "2.8em", height: "2.8em", display: "flex", justifyContent: "center", alignItems: "center", background: "#222", boxShadow: "0 8px 16px rgba(0,0,0,0.10), 0 3px 3px rgba(0,0,0,0.15)", borderRadius: "50%"}}>#{index + 1}</div>}
                    {question.caption}
                </div>
                {question.type !== QuestionTypes.Basic && <MediaContent question={question} rowEnd={getCaptionRowEnd()} />}
                {(!hideVisible && question.timeInSeconds !== -1 && !hideTimer) && <div className={styles.singleContainer} style={{ gridColumn: 3, gridRow: 1 }}>
                    <TimerControl totalTime={question.timeInSeconds} playCountdown={play} />
                </div>}
                {answers && teams &&
                    <>
                        <div onClick={() => setSolutionOpen(!solutionOpen)} className={styles.singleContainer} style={{ gridColumn: 3, gridRow: 4 }}>
                            <FaLightbulb className={styles.icon} />
                        </div>
                        <PopupContainer open={solutionOpen} setOpen={setSolutionOpen}>
                            <div style={{ width: "100%", height: "100%", color: "var(--text)", display: "grid", gridTemplateRows: "2fr 1fr", padding: 20 }}>
                                <div style={{ display: "grid", gridTemplateColumns: `repeat(${teams.length}, 1fr)`, gridGap: 10 }}>
                                    {teams.map((team) => (
                                        <div key={team._id} style={{ boxShadow: "0 8px 16px rgba(0,0,0,0.19), 0 3px 3px rgba(0,0,0,0.23)", background: "#151515", borderRadius: 20, border: `3px dashed ${team.color}80`, fontSize: "3.5em", display: "grid", gridTemplateRows: "1fr 6fr", padding: "10px 20px"  }}>
                                            <div style={{ display: "flex", justifyContent: "flex-start", alignItems: "center", fontSize: "0.5em" }}>
                                                {team.name}
                                            </div>
                                            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
                                                {answers.find((a) => a.teamId === team._id)?.values.map((v, index) => (
                                                    <div key={index}>{v}</div>
                                                ))}
                                            </div>
                                            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "row", width: "100%", fontSize: "1.5rem", gap: 10 }}>
                                                <Input type={"number"} placeholder={"Points"} style={{ textAlign: "center", border: "none", borderBottom: "1px solid #fff", fontSize: "1.5rem", color: "var(--text)", width: "25%", backgroundColor: "transparent", margin: 0, boxShadow: "none" }} value={points} onChange={(event) => setPoints(Number(event.target.value))} />
                                                <div>Points</div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <SolutionContent type={question.solutionType} text={question.solution} array={question.solutionArray} />
                            </div>
                        </PopupContainer>
                    </>
                }
            </div>
        </div>
    )
}
