import Question, {getIconByQuestionType} from "../../../types/questions";
import React, {useMemo} from "react";
import {getColorByTopic, getIconByTopic} from "../../../data/topics";
import styles from "../../../styles/index.module.css";

export default function MetaContainer({ question, ...rest }: { question: Question, [x:string]: any }) {
    const { TopicIcon, TypeIcon } = useMemo(() => {
        return {
            TopicIcon: getIconByTopic(question.topic),
            TypeIcon: getIconByQuestionType(question.type)
        }
    }, [question]);

    return (
        <div className={styles.metaContainer} {...rest}>
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
    )
}