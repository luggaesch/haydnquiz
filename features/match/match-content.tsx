import {useGameContext} from "../../contexts/GameContext";
import {useEffect, useState} from "react";
import Slideshow from "../../components/viewgroup/slideshow";
import QuestionWrapper from "../../features/question";
import {getColorByTopic} from "../../data/topics";
import ParticleWrapper from "../../components/view/particle-wrapper";
import {GamePhases} from "../../types/match";
import TrophyScreen from "../../components/questions/trophy-screen";
import UploadRoundDisplay from "../../components/questions/parts/upload-round-display";
import styles from "./match.module.css";
import Tutorial from "../startup/tutorial";
import TopicSelection from "../startup/topic-selection";

export default function MatchContent() {
    const { match, targetUploadRound, setPhase, setCurrentQuestionNum, uploadCredits } = useGameContext();
    const [showQRCodes, setShowQRCodes] = useState(targetUploadRound !== -1);
    const [showTopicSelect, setShowTopicSelect] = useState(false);

    useEffect(() => {
        setShowQRCodes(targetUploadRound !== -1);
    }, [targetUploadRound]);

    function getComponent() {
        switch (match.phase) {
            case GamePhases.TopicSelection:
                match.teams[0].selectedTopic
                return !showTopicSelect ? (
                    <Tutorial onSubmit={() => setShowTopicSelect(true)} />
                ) : <TopicSelection teams={match.teams} onSubmit={() => setPhase(GamePhases.Playing)} />
            case GamePhases.Introduction:
                return (
                    <Tutorial onSubmit={() => setPhase(GamePhases.Playing)} />
                );
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
                    <div className={styles.finish}>
                        <div onClick={() => {
                            setPhase(GamePhases.Solutions);
                            setCurrentQuestionNum(0);
                        }}>
                            Zur Auflösung
                        </div>
                    </div>
                )
            case GamePhases.Solutions:
                return (
                    <Slideshow currentIndex={match.currentQuestionIndex} setCurrentIndex={setCurrentQuestionNum} nodes={match.quiz.questions.map((q) => (
                        <QuestionWrapper jokers={match.jokers.filter((j) => j.assignedQuestionId === match.quiz.questions[match.currentQuestionIndex]._id)}
                                         uploadCredits={uploadCredits}
                                         hideOverlay={true} hideTimer={true}
                                         teams={match.teams}
                                         answers={match.answers.filter((a) => a.questionId === match.quiz.questions[match.currentQuestionIndex]._id)}
                                         index={match.currentQuestionIndex}
                                         question={q}
                                         key={q._id} />
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
            <main className={styles.mainContainer}>
                <ParticleWrapper color={getColorByTopic(match.quiz.questions[match.currentQuestionIndex].topic)} />
                {getComponent()}
            </main>
        </div>
    )
}
