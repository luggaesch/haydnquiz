import styles from "../../styles/question.module.css";
import {getColorByTopic, getIconByTopic, Topics} from "../../data/topics";
import Joker from "../../public/joker.svg";
import React, {useMemo} from "react";
import {getIconByQuestionType, QuestionTypes} from "../../types/question";

export default function MetaContainer({ topic, type, value, orientation }: { topic: Topics, type: QuestionTypes, value: number, orientation?: "row" | "column" }) {
    const { TopicIcon, TypeIcon } = useMemo(() => {
        return {
            TopicIcon: getIconByTopic(topic),
            TypeIcon: getIconByQuestionType(type)
        }
    }, [topic, type]);
    
    return (
        <div className={styles.metaContainer} style={{ flexDirection: orientation ? orientation : "row" }}>
            <div className={styles.topic} style={{backgroundColor: getColorByTopic(topic) }}>
                <TopicIcon className={styles.icon}/>
            </div>
            <div className={styles.mediaType}>
                <TypeIcon className={styles.icon} />
            </div>
            <div className={styles.value}>
                {value !== -1 ? <p>{value}</p> : <Joker style={{ fill: "var(--text)", width: "100%", height: "100%" }} />}
            </div>
        </div>
    )
}