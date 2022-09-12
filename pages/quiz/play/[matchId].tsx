import {GetServerSideProps} from "next";
import axios from "axios";
import Match from "../../../types/match";
import {GameState, useGameContext} from "../../../contexts/GameContext";
import {useEffect, useMemo, useState} from "react";
import {Button, IconButton} from "rsuite";
import TeamInput from "../../../components/view/team-input";
import RightDrawer from "../../../components/view/right-drawer";
import TeamDisplay from "../../../components/view/team-display";
import Soundcheck from "../../../components/view/soundcheck";
import TopicOverlayToggle from "../../../components/view/topic-overlay";
import TopicQueue from "../../../components/view/topic-queue";
import ProgressControl from "../../../components/view/progress-control";
import FinishButton from "../../../components/view/finish-button";
import {AlignJustify} from "@rsuite/icons/lib/icons/legacy";
import Slideshow from "../../../components/viewgroup/slideshow";
import QuestionWrapper from "../../../components/questions/wrapper";
import {QuestionTypes} from "../../../types/question";
import {getColorByTopic, Topics as TopicList} from "../../../data/topics";
import PopupContainer from "../../../components/view/popup-container";
import Topics from "../../../components/view/topics";
import StartButton from "../../../components/view/start-button";
import ParticleWrapper from "../../../components/view/particle-wrapper";
import {QRCodeCanvas} from "qrcode.react";
import Link from "next/link";
import {Home} from "@mui/icons-material";
import styles from "../../../styles/soundcheck.module.css";
import {PagePrevious} from "@rsuite/icons";

export const getServerSideProps: GetServerSideProps = async (context) => {
    const result = await axios.get(`${process.env.SERVER_URL}/api/match/fetchById/` + context.query.matchId);
    return {
        props: { match: JSON.parse(JSON.stringify(result.data)) }
    }
}

export default function MatchPage({ match }: { match: Match }) {
    const { gameState, setGameState, currentQuestionNum, setCurrentQuestionNum, teams, setMatch } = useGameContext();
    const [open, setOpen] = useState(false);
    const questions = useMemo(() => {
        return match.quiz.questions;
    }, [match]);
    const currentQuestion = useMemo(() => {
        return questions[currentQuestionNum];
    }, [questions, currentQuestionNum]);
    const [showOverlay, setShowOverlay] = useState(false);
    const [isInitialScreen, setIsInitialScreen] = useState(true);
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
            case GameState.Intro:
                return (
                    <div style={{ overflow: "hidden", position: "absolute", top: "0", width: "100vw", height: "100vh", display: "grid", gridTemplateRows: "50% 20%", gridTemplateColumns: "70%", textAlign: "center", justifyContent: "center", alignItems: "center", fontSize: "10rem" }}>
                        <div style={{ height: "100%", zIndex: 5, padding: 50, textAlign: "center", alignItems: "center", display: "flex", justifyContent: "center" }}>Haydnquiz</div>
                        <Button onClick={() => setGameState(GameState.EnterTeams)} style={{ fontSize: "3rem", background: "var(--accent)", color: "var(--text)", height: "20vh", width: "100%", padding: 20 }}>
                            Teams eintragen
                        </Button>
                    </div>
                )
            case GameState.EnterTeams:
                return (
                    <TeamInput onSubmit={() => setGameState(GameState.Example)} />
                )
            case GameState.Example:
                return (
                    <>
                        <RightDrawer open={open} setOpen={setOpen}>
                            <TeamDisplay teams={teams} />
                            <Soundcheck open={open} />
                            <TopicOverlayToggle setShowOverlay={setShowOverlay} setIsInitialScreen={setIsInitialScreen} />
                            <TopicQueue currentQuestionIndex={currentQuestionNum} questions={questions} />
                            <ProgressControl currentIndex={currentQuestionNum} maxIndex={questions.length - 1}  onTransition={(modifier) => setCurrentQuestionNum(currentQuestionNum + modifier)} />
                            {<FinishButton onPress={() => {
                                setGameState(GameState.Before);
                                setOpen(false);
                            }} />}
                        </RightDrawer>
                        <IconButton icon={<AlignJustify />} style={{ borderRadius: "50%", position: "absolute", top: 10, right: 5, zIndex: 10, color: "var(--text)", backgroundColor: "transparent", boxShadow: "0 3px 6px rgba(0,0,0,0.19), 0 2px 2px rgba(0,0,0,0.23)" }} onClick={() => setOpen(!open)}/>
                        <Slideshow currentIndex={currentQuestionNum} setCurrentIndex={setCurrentQuestionNum} nodes={[<QuestionWrapper key={0} question={{ type: QuestionTypes.Basic, topic: TopicList.Music, caption: "Wer ist das größte musikalische Genie unserer Zeit?", solution: "Haftbefehl", value: 2, timeInSeconds: 30 }} />]}/>
                        <PopupContainer isInitialScreen={isInitialScreen} showContent={showOverlay} setShowContent={setShowOverlay}>
                            <Topics />
                        </PopupContainer>
                    </>
                )
            case GameState.Before:
                return (
                    <StartButton onClick={() => setGameState(GameState.Playing)}/>
                )
            case GameState.Playing:
                if (showAnswerInput) {
                    return (
                        <div style={{ background: "white", width: "100vw", height: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
                            <div style={{ background: "white", width: "80%", height: "80%", display: "grid", gridTemplateColumns: "50% 50%", gridTemplateRows: "50% 50%", gridGap: 20 }}>
                                {match.teams.map((team, index) => {
                                    return (
                                        <div key={index} style={{ color: "black", fontSize: "4em", background: "white", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", padding: 20, borderRadius: 8, border: `1px solid ${team.color}` }}>
                                            <p>{team.name}</p>
                                            <p style={{ fontSize: 10 }}>{`http://${location.host}/quiz/play/${match._id}/${questions[0]._id}/${currentQuestion._id}/${team._id}`}</p>
                                            <QRCodeCanvas size={256} value={`http://${location.host}/quiz/play/${match._id}/${questions[0]._id}/${currentQuestion._id}/${team._id}`} />
                                        </div>
                                    )
                                })}
                                <div onClick={() => setShowAnswerInput(false)}>Weiter</div>
                            </div>
                        </div>
                    )
                }
                return (
                    <>
                        <RightDrawer open={open} setOpen={setOpen}>
                            <div style={{ width: "100%", display: "grid", gridTemplateColumns: "1fr 1fr 3fr", gridGap: 10 }}>
                                <Soundcheck open={open} />
                                <TopicOverlayToggle setShowOverlay={setShowOverlay} setIsInitialScreen={setIsInitialScreen} />
                                <Link href={"/dashboard"}>
                                    <a className={styles.container}>
                                        <IconButton style={{ color: "white", background: "transparent", fontSize: "3rem" }} icon={<Home style={{ fontSize: "inherit" }} />} />
                                    </a>
                                </Link>
                            </div>
                            <div style={{ width: "100%", display: "grid", gridTemplateColumns: "1fr 1fr", gridGap: 10, marginTop: 10 }}>
                                <div className={styles.container}>
                                    <IconButton style={{ color: "white", background: "transparent", fontSize: "3rem" }} icon={<PagePrevious style={{ fontSize: "inherit" }} />} onClick={() => setGameState(gameState - 1)} />
                                </div>
                                {currentQuestionNum === questions.length - 1 && <FinishButton onPress={() => setGameState(gameState + 1)} />}
                            </div>
                            <TeamDisplay teams={teams} />
                            <TopicQueue currentQuestionIndex={currentQuestionNum} questions={questions} />
                            <ProgressControl currentIndex={currentQuestionNum} maxIndex={questions.length - 1}  onTransition={(modifier) => setCurrentQuestionNum(currentQuestionNum + modifier)} />
                        </RightDrawer>
                        <IconButton icon={<AlignJustify />} style={{ borderRadius: "50%", position: "absolute", top: 10, right: 5, zIndex: 10, color: "var(--text)", backgroundColor: "transparent", boxShadow: "0 3px 6px rgba(0,0,0,0.19), 0 2px 2px rgba(0,0,0,0.23)" }} onClick={() => setOpen(!open)}/>
                        <Slideshow currentIndex={currentQuestionNum} setCurrentIndex={setCurrentQuestionNum} nodes={questions.map((q) => (
                            <QuestionWrapper question={q} key={q._id} />
                        ))} />
                        <PopupContainer isInitialScreen={isInitialScreen} showContent={showOverlay} setShowContent={setShowOverlay}>
                            <Topics />
                        </PopupContainer>
                    </>
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
                    <>
                        <RightDrawer open={open} setOpen={setOpen}>
                            <div style={{ display: "grid", gridTemplateColumns: "20% 20% 60%", gridGap: 20 }}>
                                <Soundcheck open={open} />
                                <TopicOverlayToggle setShowOverlay={setShowOverlay} setIsInitialScreen={setIsInitialScreen} />
                                {currentQuestionNum === questions.length - 1 && <FinishButton onPress={() => setGameState(GameState.End)} />}
                            </div>
                            <TeamDisplay teams={teams} />
                            <TopicQueue currentQuestionIndex={currentQuestionNum} questions={questions} />
                            <ProgressControl currentIndex={currentQuestionNum} maxIndex={questions.length - 1}  onTransition={(modifier) => setCurrentQuestionNum(currentQuestionNum + modifier)} />
                        </RightDrawer>
                        <IconButton icon={<AlignJustify />} style={{ borderRadius: "50%", position: "absolute", top: 10, right: 5, zIndex: 10, color: "var(--text)", backgroundColor: "transparent", boxShadow: "0 3px 6px rgba(0,0,0,0.19), 0 2px 2px rgba(0,0,0,0.23)" }} onClick={() => setOpen(!open)}/>
                        <Slideshow currentIndex={currentQuestionNum} setCurrentIndex={setCurrentQuestionNum} nodes={questions.map((q) => (
                            <QuestionWrapper question={q} key={q._id} />
                        ))} />
                        <PopupContainer isInitialScreen={isInitialScreen} showContent={showOverlay} setShowContent={setShowOverlay}>
                            <Topics />
                        </PopupContainer>
                    </>
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
