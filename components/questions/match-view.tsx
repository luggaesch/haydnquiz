import {GameState, useGameContext} from "../../contexts/GameContext";
import {useEffect, useMemo, useState} from "react";
import Slideshow from "../viewgroup/slideshow";
import QuestionWrapper from "./wrapper";
import {getColorByTopic} from "../../data/topics";
import StartButton from "../view/start-button";
import ParticleWrapper from "../view/particle-wrapper";
import Match from "../../types/match";
import QrCarousel from "../view/qr-carousel";
import {Button} from "antd";
import axios from "axios";

export default function MatchView({ propMatch }: { propMatch: Match }) {
    const { gameState, setGameState, currentQuestionNum, setCurrentQuestionNum, setMatch, match } = useGameContext();
    const questions = useMemo(() => {
        return match ? match.quiz.questions : propMatch.quiz.questions;
    }, [propMatch, match]);
    const currentQuestion = useMemo(() => {
        return questions[currentQuestionNum];
    }, [questions, currentQuestionNum]);
    const [showAnswerInput, setShowAnswerInput] = useState(currentQuestionNum === Math.ceil(questions.length / 2));

    useEffect(() => {
        setMatch(propMatch);
    }, [propMatch]);

    useEffect(() => {
        const currentMatch = match ?? propMatch;
        if (currentMatch.quiz.stops.includes(currentQuestionNum) && !currentMatch.pastUploadRounds.includes(currentMatch.quiz.stops.indexOf(currentQuestionNum))) {
            setShowAnswerInput(true);
        }
    }, [match, currentQuestionNum, questions]);

    function getComponent() {
        switch (gameState) {
            case GameState.Before:
                return (
                    <StartButton onClick={() => setGameState(GameState.Playing)}/>
                )
            case GameState.Playing:
                if (showAnswerInput) {
                    return (
                        <QrCarousel match={propMatch} uploadRound={propMatch.quiz.stops.indexOf(currentQuestionNum)} setShowAnswerInput={setShowAnswerInput} />
                    )
                }
                return (
                    <Slideshow currentIndex={currentQuestionNum} setCurrentIndex={setCurrentQuestionNum} nodes={questions.map((q) => (
                        <QuestionWrapper index={currentQuestionNum} question={q} key={q._id} />
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
                        <QuestionWrapper hideOverlay={true} hideTimer={true} answers={match!.answers.filter((a) => a.questionId === currentQuestion._id)} index={currentQuestionNum} question={q} key={q._id} />
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
