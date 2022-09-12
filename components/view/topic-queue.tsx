import {getColorByTopic, getIconByTopic} from "../../data/topics";
import {GameState, useGameContext} from "../../contexts/GameContext";
import Question from "../../types/question";

export default function TopicQueue({ currentQuestionIndex, questions }: { currentQuestionIndex: number, questions: Question[] }) {
    const { setCurrentQuestionNum, gameState, setGameState } = useGameContext();

    function handleQueueItemClick(index: number) {
        if (gameState < GameState.Playing) {
            setGameState(GameState.Playing);
        } else if (gameState < GameState.Solutions && gameState > GameState.Playing) {
            setGameState(GameState.Solutions);
        }
        setCurrentQuestionNum(index);
    }

    return (
        <div style={{ marginTop: 20, display: "grid", gridAutoFlow: "column", overflow: "auto", width: "100%", whiteSpace: "nowrap" }}>
            {questions.slice(currentQuestionIndex).map((q, index) => {
                const Icon = getIconByTopic(q.topic);
                return (
                    <div onClick={() => handleQueueItemClick(questions.indexOf(q))} key={index} style={{ cursor: "pointer", fontSize: "1.8rem", marginRight: 5, height: 50, width: "100%", minWidth: 50, backgroundColor: getColorByTopic(q.topic), color: "var(--text)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <Icon style={{ fontSize: "inherit" }} />
                    </div>
                )
            })}
        </div>
    )
}
