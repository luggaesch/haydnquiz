import {GameState, useGameContext} from "../../contexts/GameContext";
import {useEffect, useMemo, useState} from "react";
import {Button, IconButton} from "rsuite";
import TeamInput from "../view/team-input";
import RightDrawer from "../view/right-drawer";
import TeamDisplay from "../view/team-display";
import Soundcheck from "../view/soundcheck";
import TopicOverlayToggle from "../view/topic-overlay";
import TopicQueue from "../view/topic-queue";
import ProgressControl from "../view/progress-control";
import FinishButton from "../view/finish-button";
import {AlignJustify} from "@rsuite/icons/lib/icons/legacy";
import Slideshow from "../viewgroup/slideshow";
import QuestionWrapper from "./wrapper";
import {QuestionTypes} from "../../types/question";
import {getColorByTopic, Topics as TopicList} from "../../data/topics";
import PopupContainer from "../view/popup-container";
import Topics from "../view/topics";
import StartButton from "../view/start-button";
import {QRCodeCanvas} from "qrcode.react";
import ParticleWrapper from "../view/particle-wrapper";
import Match from "../../types/match";
import {useThemeSwitcher} from "react-css-theme-switcher";
import styles from "../../styles/drawer.module.css";
import {DarkMode, Hearing, HearingDisabled, LightMode} from "@mui/icons-material";
import {Carousel} from "antd";
import QrCarousel from "../view/qr-carousel";

export default function MatchView({ match }: { match: Match }) {
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
    const { switcher, themes, currentTheme, status } = useThemeSwitcher();
    const [isDarkMode, setIsDarkMode] = useState(false);

    const toggleDarkMode = () => {
        setIsDarkMode(previous => {
            switcher({ theme: previous ? themes.light : themes.dark });
            return !previous;
        });
    };

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
                        <QrCarousel match={match} currentQuestion={currentQuestion} setShowAnswerInput={setShowAnswerInput} />
                    )
                }
                return (
                    <>
                        <RightDrawer open={open} setOpen={setOpen}>
                            <div style={{ width: "100%", display: "grid", height: 80, gridTemplateColumns: "1fr 1fr 1fr 2fr", gridGap: 10 }}>
                                <Soundcheck open={open} />
                                <TopicOverlayToggle setShowOverlay={setShowOverlay} setIsInitialScreen={setIsInitialScreen} />
                                <div className={styles.container} onClick={() => {toggleDarkMode()}}>
                                    {!isDarkMode ? <DarkMode style={{ fontSize: "inherit" }} /> : <LightMode style={{ fontSize: "inherit" }} />}
                                </div>
                            </div>
                            <TeamDisplay teams={teams} />
                            <div style={{ display: "grid", gridTemplateRows: "2fr 3fr" }}>
                                <TopicQueue currentQuestionIndex={currentQuestionNum} questions={questions} />
                                <ProgressControl currentIndex={currentQuestionNum} maxIndex={questions.length - 1}  onTransition={(modifier) => setCurrentQuestionNum(currentQuestionNum + modifier)} />
                            </div>
                        </RightDrawer>
                        <div style={{ background: "var(--paper)", display: "flex", justifyContent: "center", alignItems: "center", width: 35, height: 35, cursor: "pointer", borderRadius: "50%", position: "absolute", top: 10, right: 5, zIndex: 10, color: "var(--text)", backgroundColor: "transparent", boxShadow: "0 3px 6px rgba(0,0,0,0.19), 0 2px 2px rgba(0,0,0,0.23)" }} onClick={() => setOpen(!open)}>
                            <AlignJustify />
                        </div>
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
