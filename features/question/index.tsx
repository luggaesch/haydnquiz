import styles from "../../styles/index.module.css";
import React, {useState} from "react";
import useSound from "use-sound";
// @ts-ignore
import countdownSfx from "../../assets/sounds/countdown.mp3"
import TimerControl from "../../components/view/timer-control";
import {getIconByJoker} from "../../data/jokers";
import Question, {QuestionTypes} from "../../types/questions";
import HideOverlay from "../../components/questions/parts/hide-overlay";
import {FaLightbulb} from "react-icons/fa";
import PopupContainer from "../../components/questions/parts/popup-container";
import MediaContent from "../../components/questions/parts/media-content";
import Answer from "../../types/answer";
import MetaContainer from "../../components/questions/parts/meta-container";
import Team from "../../types/team";
import CreditDistribution, {Credit} from "../../components/questions/parts/credit-distribution";
import Joker from "../../types/joker";
import {useMediaQuery} from "react-responsive";

interface WrapperProps {
    index?: number,
    question: Question,
    answers?: Answer[],
    teams?: Team[],
    jokers?: Joker[],
    hideTimer?: boolean,
    hideOverlay?: boolean,
    fontSize?: number,
    uploadCredits?: (credits: Credit[], questionId: string) => void
}

export default function QuestionWrapper(props: WrapperProps) {
    const isMobile = useMediaQuery({ query: "(orientation: portrait)" })

    return isMobile ?
        (
            <QuestionViewMobile {...props} />
        )
            :
        (
        <QuestionView {...props} />
    )
}

function QuestionView({ index, question, answers, teams, jokers, hideTimer, hideOverlay, fontSize, uploadCredits  }: WrapperProps) {
    const [play] = useSound(countdownSfx, { volume: 1});
    const [solutionOpen, setSolutionOpen] = useState(false);
    const [hideVisible, setHideVisible] = useState(true);
    const [timerDelayActive, setTimerDelayActive] = useState(question.type === QuestionTypes.Hearing || question.type === QuestionTypes.Video);

    function getCaptionRowEnd() {
        switch (question.type) {
            case QuestionTypes.Basic:
                return 5;
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
                    {index !== undefined && <div style={{ fontSize: "0.6em", position: "absolute", top: 0, left: 0, transform: "translateX(-90%)", width: "2.8em", height: "2.8em", display: "flex", justifyContent: "center", alignItems: "center", background: "var(--question-item)", borderRadius: "12px 0 0 12px"}}>#{index + 1}</div>}
                    {question.caption}
                </div>
                {question.type !== QuestionTypes.Basic && <MediaContent teams={teams} onMediaConsumed={() => setTimerDelayActive(false)} shrink={fontSize !== undefined ? fontSize < 10 : false} question={question} rowEnd={getCaptionRowEnd()} />}
                {(!hideVisible && question.timeInSeconds !== -1 && !hideTimer && !timerDelayActive) && <div className={styles.singleContainer} style={{ gridColumn: 3, gridRow: 1 }}>
                    <TimerControl totalTime={question.timeInSeconds} playCountdown={play} />
                </div>}
                {jokers && teams && <div style={{ gridColumn: 3, gridRow: 1, display: "grid", gridTemplateColumns: "1fr 1fr", justifyContent: "center", gridTemplateRows: "1fr 1fr 1fr", gridColumnGap: 5 }}>
                    {jokers.map((j) => {
                        return (
                            <div key={j._id} style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                                {getIconByJoker(j.name, teams.find((t) => t._id === j.teamId)!.color, 64, 64)}
                            </div>
                        )
                    })}
                </div>}
                {answers && teams && question.value !== -1 &&
                    <>
                        <div onClick={() => setSolutionOpen(!solutionOpen)} className={styles.singleContainer} style={{ gridColumn: 3, gridRow: 4 }}>
                            <FaLightbulb className={styles.icon} />
                        </div>
                        <PopupContainer open={solutionOpen} setOpen={setSolutionOpen}>
                            <CreditDistribution teams={teams} answers={answers} question={question} onFinished={(credits) => {
                                setSolutionOpen(false);
                                uploadCredits && uploadCredits(credits, question._id!);
                            }} />
                        </PopupContainer>
                    </>
                }
            </div>
        </div>
    )
}

function QuestionViewMobile({ index, question, answers, teams, jokers, hideTimer, hideOverlay, fontSize, uploadCredits  }: WrapperProps) {
    const [play] = useSound(countdownSfx, { volume: 1});
    const [solutionOpen, setSolutionOpen] = useState(false);
    const [hideVisible, setHideVisible] = useState(true);
    const [timerDelayActive, setTimerDelayActive] = useState(question.type === QuestionTypes.Hearing || question.type === QuestionTypes.Video);

    function getCaptionRowEnd() {
        let base = 5;
        switch (question.type) {
            case QuestionTypes.Basic:
                return base;
            case QuestionTypes.Choice:
                return base-2;
            default:
                return base-1;
        }
    }

    return (
        <div className={styles.root} style={{ fontSize: fontSize ?? 12  }}>
            {!hideOverlay && <HideOverlay visible={hideVisible} setVisible={setHideVisible} />}
            <div className={styles.container} style={{ gridTemplateRows: "1fr 3fr 1fr 1fr", gridTemplateColumns: "2fr 1fr" }}>
                <MetaContainer question={question} style={{ gridColumn: 1, gridRow: 1, flexDirection: "row", fontSize: 8 }} />
                <div className={styles.caption} style={{ gridRowStart: 2, gridRowEnd: getCaptionRowEnd(), gridColumnStart: 1, gridColumnEnd: 3, fontSize: 36, padding: 5 }}>
                    {question.jokerReward && <div className={styles.jokerDisplay} style={{}} >
                        {getIconByJoker(question.jokerReward, "var(--text)", 60, 60)} {question.jokerReward}
                    </div>}
                    {index !== undefined && <div style={{ fontSize: "0.6em", position: "absolute", top: 0, left: 0, width: "2.8em", height: "2.8em", display: "flex", justifyContent: "center", alignItems: "center", background: "var(--question-item)", borderRadius: "12px 0 0 12px"}}>#{index + 1}</div>}
                    {question.caption}
                </div>
                {question.type !== QuestionTypes.Basic && <MediaContent teams={teams} onMediaConsumed={() => setTimerDelayActive(false)} shrink={fontSize !== undefined ? fontSize < 10 : false} question={question} rowEnd={getCaptionRowEnd()} style={{ gridColumnStart: 1, gridColumnEnd: 3 }} />}
                {(!hideVisible && question.timeInSeconds !== -1 && !hideTimer && !timerDelayActive) && <div className={styles.singleContainer} style={{ gridColumn: 2, gridRow: 1 }}>
                    <TimerControl totalTime={question.timeInSeconds} playCountdown={play} />
                </div>}
                {jokers && teams && <div style={{ gridColumn: 2, gridRow: 1, display: "grid", gridTemplateColumns: "1fr 1fr", justifyContent: "center", gridTemplateRows: "1fr 1fr 1fr", gridColumnGap: 5 }}>
                    {jokers.map((j) => {
                        return (
                            <div key={j._id} style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                                {getIconByJoker(j.name, teams.find((t) => t._id === j.teamId)!.color, 64, 64)}
                            </div>
                        )
                    })}
                </div>}
                {answers && teams && question.value !== -1 &&
                    <>
                        <div onClick={() => setSolutionOpen(!solutionOpen)} className={styles.singleContainer} style={{ gridColumnStart: 1, gridColumnEnd: 3, gridRow: 4 }}>
                            <FaLightbulb className={styles.icon} />
                        </div>
                        <PopupContainer open={solutionOpen} setOpen={setSolutionOpen}>
                            <CreditDistribution teams={teams} answers={answers} question={question} onFinished={(credits) => {
                                setSolutionOpen(false);
                                uploadCredits && uploadCredits(credits, question._id!);
                            }} />
                        </PopupContainer>
                    </>
                }
            </div>
        </div>
    )
}
