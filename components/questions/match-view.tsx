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
            case GamePhases.Before:
                return (
                    <StartButton onClick={() => setPhase(GamePhases.Playing)}/>
                )
            case GamePhases.Playing:
                if (showQRCodes) {
                    return (
                        <UploadRoundDisplay onUploadFinished={() => setShowQRCodes(false)} />
                    )
                }
                return (
                    <Slideshow currentIndex={match.currentQuestionIndex} setCurrentIndex={setCurrentQuestionNum} nodes={match.quiz.questions.map((q) => (
                        <QuestionWrapper index={match.currentQuestionIndex} question={q} key={q._id} />
                    ))} />
                )
            case GamePhases.Transition:
                if (showQRCodes) {
                    return (
                        <UploadRoundDisplay onUploadFinished={() => setShowQRCodes(false)} />
                    )
                }
                return (
                    <div style={{ overflow: "hidden", padding: 20, width: "100vw", height: "100vh", display: "grid", gridTemplateRows: "70% 30%", gridTemplateColumns: "70%", textAlign: "center", justifyContent: "center", alignItems: "center", fontSize: "10rem" }}>
                        <Button onClick={() => {
                            setPhase(GamePhases.Solutions);
                            setCurrentQuestionNum(0);
                        }} style={{ fontSize: "3rem", background: "var(--accent)", color: "var(--text)", height: "20vh", width: "100%", padding: 20 }}>
                            Zur Auflösung
                        </Button>
                    </div>
                )
            case GamePhases.Solutions:
                return (
                    <Slideshow currentIndex={match.currentQuestionIndex} setCurrentIndex={setCurrentQuestionNum} nodes={match.quiz.questions.map((q) => (
                        <QuestionWrapper uploadCredits={uploadCredits} hideOverlay={true} hideTimer={true} teams={match!.teams} answers={match!.answers.filter((a) => a.questionId === match.quiz.questions[match.currentQuestionIndex]._id)} index={match.currentQuestionIndex} question={q} key={q._id} />
                    ))} />
                )
            case GamePhases.Rankings:
                return (
                    <TrophyScreen match={match} />
                )
            case GamePhases.End:
                return (
                    <div style={{ overflow: "hidden", fontSize: "10rem", color: "var(--text)", width: "100%", height: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>
                        Ende
                    </div>
                )}
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
