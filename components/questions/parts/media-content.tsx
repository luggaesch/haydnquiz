import styles from "../../../styles/index.module.css";
import ReactPlayer from "react-player";
import Image from "next/image";
import React, {useState} from "react";
import AudioPlayer from "./audio-player";
import Question, {QuestionTypes} from "../../../types/question";
import {FaArrowUp} from "react-icons/fa";
import PopupContainer from "./popup-container";
import SortMiniGameView from "./sort";
import shuffle from "../../../lib/shuffle";
import {MediaTypes} from "../../../types/media";

function getBorderRadiusByImageIndex(index: number) {
    switch (index) {
        case 0:
            return "8px 0 0 0";
        case 3:
            return "0 8px 0 0";
        case 4:
            return "0 0 0 8px";
        case 7:
            return "0 0 8px 0";
        default:
            return "0"
    }
}

function getPopupContentByQuestionType(question: Question) {
    if (question.type === QuestionTypes.Sort) {
        return (
            <SortMiniGameView sortElements={shuffle(question.sortElements!)} unit={question.unit!}/>
        )
    } else if (question.type === QuestionTypes.Guesstimate) {
        return (
            <></>
        )
    } else {
        const media = question.media;
        if (!media) return <div>No Media</div>
        switch (media.type) {
            case MediaTypes.Text:
                return (
                    <div className={styles.popupContainerText}>
                        <p>{media.content}</p>
                    </div>
                )
            case MediaTypes.Video:
                return (
                    <ReactPlayer controls={true} width="100%" height="95%" url={media.content} />
                )
            case MediaTypes.Image: {
                if (media.content) {
                    return (
                        <div style={{ width: "100%", height: "100%" }} className={styles.imageWrap}>
                            <Image layout="fill" objectFit="contain" src={media.content} alt=""/>
                        </div>
                    )
                } else if (media.sources) {
                    if (media.sources.length === 8) {
                        return (
                            <div className={styles.imageGrid} style={{
                                gridTemplateColumns: "1fr 1fr 1fr 1fr"
                            }}>
                                {media.sources.map((url: string, index: number) => (
                                    <div key={index + "_" + url} className={styles.imageWrap}>
                                        <div className={styles.imageLabel}>{index + 1}</div>
                                        <Image layout="fill" objectFit="contain" src={url} alt={""}
                                               style={{borderRadius: getBorderRadiusByImageIndex(index)}}/>
                                    </div>))
                                }
                            </div>
                        )
                    }
                    else if (media.sources.length == 10) {
                        return (
                            <div className={styles.imageGrid} style={{
                                gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr"
                            }}>
                                {media.sources.map((url: string, index: number) => (
                                    <div key={index + "_" + url} className={styles.imageWrap}>
                                        <div className={styles.imageLabel}>{index + 1}</div>
                                        <Image layout="fill" objectFit="contain" src={url} alt={""}
                                               style={{borderRadius: getBorderRadiusByImageIndex(index)}}/>
                                    </div>))
                                }
                            </div>
                        )
                    } else if (media.sources.length === 4) {
                        return (
                            <div className={styles.imageGrid} style={{
                                gridTemplateColumns: "1fr 1fr",
                                gridGap: 10,
                            }}>
                                {media.sources!.map((url: string, index: number) => (
                                    <div key={index + "_" + url} className={styles.imageWrap}
                                         style={{ border: "1px solid #22222240", padding: 10 }}>
                                        <div className={styles.imageLabel}>{index + 1}</div>
                                        <Image layout="fill"
                                               objectFit="contain"
                                               src={url}
                                               alt={""}/>
                                    </div>
                                ))}
                            </div>
                        )
                    } else {
                        return (
                            <div className={styles.imageGrid} style={{
                                gridRowGap: 10,
                                gridTemplateRows: "1fr 1fr 1fr",
                                justifyContent: "center",
                            }}>
                                {media.sources!.map((url: string, index) => (
                                    <div key={index + "_" + url}
                                         style={{
                                             position: "relative",
                                             width: "55vw",
                                             height: "100%",
                                             display: "flex",
                                             justifyContent: "center"
                                         }}>
                                        <Image layout="fill" objectFit="contain" src={url} alt={""}/>
                                    </div>
                                ))}
                            </div>
                        )
                    }
                }
            }
        }
    }
}

export default function MediaContent({ question, rowEnd, shrink, onMediaConsumed }: { question: Question, rowEnd: number, shrink?: boolean, onMediaConsumed: () => void }) {
    const [mediaOpen, setMediaOpen] = useState(false);

    function getBoxContentByQuestionType() {
        switch (question.type) {
            case QuestionTypes.Hearing:
                return <AudioPlayer shrink={shrink} audio={Number(question.media!.content!)} onFinished={() => onMediaConsumed()} />
            case QuestionTypes.Choice:
                return (
                    <div style={{ width: "100%", height: "100%", display: "grid", gridTemplateRows: "1fr 1fr", gridTemplateColumns: "1fr 1fr", gridGap: 5 }}>
                        {question.choices!.map((choice, index) => (
                            <div style={{  borderRadius: 8, background: "#282828", display: "grid", gridTemplateColumns: "1fr 3fr", alignItems: "center", color: "var(--text)", fontSize: "1.5em" }} key={index}>
                                <div style={{ textAlign: "center" }}>{["A", "B", "C", "D"][index]}.</div>
                                <div>{choice}</div>
                            </div>
                        ))}
                    </div>
                )
            default:
                return (
                    <div style={{ width: "100%", height: "100%", display: "flex", justifyContent: "center", alignItems: "center"  }} onClick={() => setMediaOpen(!mediaOpen)}>
                        <FaArrowUp style={{ fontSize: "2em", color: "var(--text)" }} />
                    </div>
                )
        }
    }

    return (
        <div className={styles.mediaContainer} style={{ gridRowStart: rowEnd, background: question.type === QuestionTypes.Choice ? "transparent" : "var(--question-item)" }}>
            {getBoxContentByQuestionType()}
            <PopupContainer open={mediaOpen} setOpen={setMediaOpen}>
                {getPopupContentByQuestionType(question)}
            </PopupContainer>
        </div>
    )
}
