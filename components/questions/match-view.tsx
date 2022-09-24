import {GameState, useGameContext} from "../../contexts/GameContext";
import {useEffect, useMemo, useState} from "react";
import TeamInput from "../view/team-input";
import Slideshow from "../viewgroup/slideshow";
import QuestionWrapper from "./wrapper";
import {QuestionTypes, SolutionTypes} from "../../types/question";
import {getColorByTopic, Topics as TopicList} from "../../data/topics";
import StartButton from "../view/start-button";
import ParticleWrapper from "../view/particle-wrapper";
import Match from "../../types/match";
import QrCarousel from "../view/qr-carousel";
import {Button} from "antd";

export default function MatchView({ match }: { match: Match }) {
    const { gameState, setGameState, currentQuestionNum, setCurrentQuestionNum, setMatch } = useGameContext();
    const questions = useMemo(() => {
        return match.quiz.questions;
    }, [match]);
    const currentQuestion = useMemo(() => {
        return questions[currentQuestionNum];
    }, [questions, currentQuestionNum]);
    const [showAnswerInput, setShowAnswerInput] = useState(currentQuestionNum === Math.ceil(questions.length / 2));

    useEffect(() => {
        setMatch(match);
    }, [match]);

    useEffect(() => {
        if (currentQuestionNum === Math.ceil(questions.length / 2)) {
            setShowAnswerInput(true);
        }
    }, [currentQuestionNum, questions]);

    function getComponent() {
        switch (gameState) {
            case GameState.Before:
                return (
                    <StartButton onClick={() => setGameState(GameState.Playing)}/>
                )
            case GameState.Playing:
                if (showAnswerInput) {
                    return (
                        <QrCarousel match={match} currentQuestion={currentQuestion} setShowAnswerInput={setShowAnswerInput} />
                    )
                }
                return (
                    <Slideshow currentIndex={currentQuestionNum} setCurrentIndex={setCurrentQuestionNum} nodes={questions.map((q) => (
                        <QuestionWrapper question={q} key={q._id} />
                    ))} />
                )
            case GameState.Transition:
                return (
                    <div style={{ overflow: "hidden", padding: 20, width: "100vw", height: "100vh", display: "grid", gridTemplateRows: "70% 30%", gridTemplateColumns: "70%", textAlign: "center", justifyContent: "center", alignItems: "center", fontSize: "10rem" }}>
                        <Button onClick={() => {
                            setGameState(GameState.Solutions);
                            setCurrentQuestionNum(0);
                        }} style={{ fontSize: "3rem", background: "var(--accent)", color: "var(--text)", height: "20vh", width: "100%", padding: 20 }}>
                            Zur Auflösung
                        </Button>
                    </div>
                )
            case GameState.Solutions:
                return (
                    <Slideshow currentIndex={currentQuestionNum} setCurrentIndex={setCurrentQuestionNum} nodes={questions.map((q) => (
                        <QuestionWrapper question={q} key={q._id} />
                    ))} />
                )
            case GameState.End:
                return (
                    <div style={{ overflow: "hidden", fontSize: "10rem", color: "var(--text)", width: "100%", height: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>
                        Ende
                    </div>
                )}
    }

    return (
        <div>
            <main style={{ width: "100vw", height: "100vh", overflow: "hidden" }}>
                <ParticleWrapper color={getColorByTopic(currentQuestion.topic)} />
                {getComponent()}
            </main>
        </div>
    )
}
