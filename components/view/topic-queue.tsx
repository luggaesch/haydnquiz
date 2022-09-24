import {getColorByTopic, getIconByTopic} from "../../data/topics";
import Question from "../../types/question";

export default function TopicQueue({ currentQuestionIndex, questions, handleQueueItemClick }: { currentQuestionIndex: number, questions: Question[], handleQueueItemClick: (index: number) => void }) {

    return (
        <div style={{ display: "grid", gridAutoFlow: "column", overflow: "auto", width: "100%", whiteSpace: "nowrap" }}>
            {questions.slice(currentQuestionIndex).map((q, index) => {
                const Icon = getIconByTopic(q.topic);
                return (
                    <div onClick={() => handleQueueItemClick(questions.indexOf(q))} key={index} style={{ cursor: "pointer", fontSize: "1.8rem", marginRight: 5, height: 50, width: "100%", minWidth: 50, backgroundColor: getColorByTopic(q.topic), color: "#222", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <Icon style={{ fontSize: "inherit" }} />
                    </div>
                )
            })}
        </div>
    )
}
