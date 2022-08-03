import {Question} from "../../data/questions";
import {getColorByTopic, getIconByTopic} from "../../data/topics";

export default function TopicQueue({ currentQuestionIndex, questions }: { currentQuestionIndex: number, questions: Question[] }) {

    return (
        <div style={{ display: "grid", gridAutoFlow: "column", overflow: "auto", width: "100%", whiteSpace: "nowrap" }}>
            {questions.slice(currentQuestionIndex).map((q, index) => {
                const Icon = getIconByTopic(q.topic);
                return (
                    <div key={index} style={{ fontSize: "1.8rem", marginRight: 5, height: 50, width: "100%", minWidth: 50, backgroundColor: getColorByTopic(q.topic), color: "var(--text)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <Icon style={{ fontSize: "inherit" }} />
                    </div>
                )
            })}
        </div>
    )
}