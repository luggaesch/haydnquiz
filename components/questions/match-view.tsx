import {useGameContext} from "../../contexts/GameContext";
import {useEffect, useState} from "react";
import Slideshow from "../viewgroup/slideshow";
import QuestionWrapper from "./wrapper";
import {getColorByTopic} from "../../data/topics";
import StartButton from "../view/start-button";
import ParticleWrapper from "../view/particle-wrapper";
import {GamePhases} from "../../types/match";
import {Button} from "antd";
import TrophyScreen from "./trophy-screen";
import UploadRoundDisplay from "./parts/upload-round-display";

export default function MatchView() {
    const { match, targetUploadRound, setPhase, setCurrentQuestionNum, uploadCredits } = useGameContext();
    const [showQRCodes, setShowQRCodes] = useState(targetUploadRound !== -1);

    useEffect(() => {
        setShowQRCodes(targetUploadRound !== -1);
    }, [targetUploadRound]);

    function getComponent() {
        switch (match.phase) {
            case GamePhases.Playing:
                if (showQRCodes) {
                    return (
                        <UploadRoundDisplay onUploadFinished={() => setShowQRCodes(false)} />
                    )
                }
                return (
                    <Slideshow currentIndex={match.currentQuestionIndex} setCurrentIndex={setCurrentQuestionNum} nodes={match.quiz.questions.map((q) => (
                        <QuestionWrapper teams={match.teams} index={match.currentQuestionIndex} question={q} key={q._id} />
                    ))} />
                )
            case GamePhases.Transition:
                if (showQRCodes) {
                    return (
                        <UploadRoundDisplay onUploadFinished={() => setShowQRCodes(false)} />
                    )
                }
                return (
                    <div style={{ overflow: "hidden", padding: 20, width: "100vw", height: "100vh", display: "flex", textAlign: "center", justifyContent: "center", alignItems: "center", fontSize: "10rem" }}>
                        <div onClick={() => {
                            setPhase(GamePhases.Solutions);
                            setCurrentQuestionNum(0);
                        }} style={{ cursor: "pointer", display: "flex", textAlign: "center", justifyContent: "center", alignItems: "center", color: "#222", borderRadius: 50, fontSize: "5rem", background: "var(--accent)", height: "20vh", width: "50%", padding: 20 }}>
                            Zur Auflösung
                        </div>
                    </div>
                )
            case GamePhases.Solutions:
                return (
                    <Slideshow currentIndex={match.currentQuestionIndex} setCurrentIndex={setCurrentQuestionNum} nodes={match.quiz.questions.map((q) => (
                        <QuestionWrapper uploadCredits={uploadCredits} hideOverlay={true} hideTimer={true} teams={match.teams} answers={match.answers.filter((a) => a.questionId === match.quiz.questions[match.currentQuestionIndex]._id)} index={match.currentQuestionIndex} question={q} key={q._id} />
                    ))} />
                )
            case GamePhases.Rankings:
                return (
                    <TrophyScreen match={match} />
                )
        }
    }

    return (
        <div>
            <main style={{ width: "100vw", height: "100vh", overflow: "hidden" }}>
                <ParticleWrapper color={getColorByTopic(match.quiz.questions[match.currentQuestionIndex].topic)} />
                {getComponent()}
            </main>
        </div>
    )
}
