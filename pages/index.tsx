import questions from "../data/questions";
import {useMemo, useState} from "react";
import {getColorByTopic, Topics as TopicList} from "../data/topics";
import ParticleWrapper from "../components/view/particle-wrapper";
import {GameState, useGameContext} from "../contexts/GameContext";
import TeamInput from "../components/view/team-input";
import StartButton from "../components/view/start-button";
import RightDrawer from "../components/view/right-drawer";
import TeamDisplay from "../components/view/team-display";
import Soundcheck from "../components/view/soundcheck";
import TopicOverlay from "../components/view/topic-overlay";
import TopicQueue from "../components/view/topic-queue";
import ProgressControl from "../components/view/progress-control";
import {Button, IconButton} from "rsuite";
import Slideshow from "../components/viewgroup/slideshow";
import QuestionWrapper from "../components/questions/wrapper";
import PopupContainer from "../components/view/popup-container";
import Topics from "../components/view/topics";
import {AlignJustify} from "@rsuite/icons/lib/icons/legacy";
import FinishButton from "../components/view/finish-button";
import {v4} from "uuid";
import initializeBasicAuth from 'nextjs-basic-auth'
import {GetServerSideProps} from "next";

const users = [
    { user: 'lukas', password: 'haydnquiz' },
]
const basicAuthCheck = initializeBasicAuth({
    users: users
})

// some-route.js
export const getServerSideProps: GetServerSideProps = async (context) => {
    const {req, res} = context;
    await basicAuthCheck(req, res)
    return {
        props: {}
    }
}

export default function Index() {
    const {gameState, setGameState, currentQuestionNum, setCurrentQuestionNum} = useGameContext();
    const [open, setOpen] = useState(false);
    const currentQuestion = useMemo(() => {
        return questions[currentQuestionNum];
    }, [currentQuestionNum]);
    const [showOverlay, setShowOverlay] = useState(false);
    const [isInitialScreen, setIsInitialScreen] = useState(true);

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
                            <TeamDisplay />
                            <Soundcheck />
                            <TopicOverlay setShowOverlay={setShowOverlay} setIsInitialScreen={setIsInitialScreen} />
                            <TopicQueue currentQuestionIndex={currentQuestionNum} questions={questions} />
                            <ProgressControl currentIndex={currentQuestionNum} maxIndex={questions.length - 1}  onTransition={(modifier) => setCurrentQuestionNum(currentQuestionNum + modifier)} />
                            {<FinishButton onPress={() => {
                                setGameState(GameState.Before);
                                setOpen(false);
                            }} />}
                        </RightDrawer>
                        <IconButton icon={<AlignJustify />} style={{ borderRadius: "50%", position: "absolute", top: 10, right: 5, zIndex: 10, color: "var(--text)", backgroundColor: "transparent", boxShadow: "0 3px 6px rgba(0,0,0,0.19), 0 2px 2px rgba(0,0,0,0.23)" }} onClick={() => setOpen(!open)}/>
                        <Slideshow currentIndex={currentQuestionNum} setCurrentIndex={setCurrentQuestionNum} nodes={[<QuestionWrapper key={0} question={{ id: v4(), topic: TopicList.Music, caption: "Wer ist das größte musikalische Genie unserer Zeit?", solution: "Haftbefehl", solutionUrl: "/images/questions_resized/haftbefehl.webp", value: 2, timeInSeconds: 30 }} />]}/>
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
                return (
                    <>
                        <RightDrawer open={open} setOpen={setOpen}>
                            <TeamDisplay />
                            <Soundcheck />
                            <TopicOverlay setShowOverlay={setShowOverlay} setIsInitialScreen={setIsInitialScreen} />
                            <TopicQueue currentQuestionIndex={currentQuestionNum} questions={questions} />
                            <ProgressControl currentIndex={currentQuestionNum} maxIndex={questions.length - 1}  onTransition={(modifier) => setCurrentQuestionNum(currentQuestionNum + modifier)} />
                            {currentQuestionNum === questions.length - 1 && <FinishButton onPress={() => {
                                setGameState(GameState.Transition);
                                setOpen(false);
                            }} />}
                        </RightDrawer>
                        <IconButton icon={<AlignJustify />} style={{ borderRadius: "50%", position: "absolute", top: 10, right: 5, zIndex: 10, color: "var(--text)", backgroundColor: "transparent", boxShadow: "0 3px 6px rgba(0,0,0,0.19), 0 2px 2px rgba(0,0,0,0.23)" }} onClick={() => setOpen(!open)}/>
                        <Slideshow currentIndex={currentQuestionNum} setCurrentIndex={setCurrentQuestionNum} nodes={questions.map((q) => (
                            <QuestionWrapper question={q} key={q.id} />
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
                            <TeamDisplay />
                            <Soundcheck />
                            <TopicOverlay setShowOverlay={setShowOverlay} setIsInitialScreen={setIsInitialScreen} />
                            <TopicQueue currentQuestionIndex={currentQuestionNum} questions={questions} />
                            <ProgressControl currentIndex={currentQuestionNum} maxIndex={questions.length - 1}  onTransition={(modifier) => setCurrentQuestionNum(currentQuestionNum + modifier)} />
                            {currentQuestionNum === questions.length - 1 && <FinishButton onPress={() => setGameState(GameState.End)} />}
                        </RightDrawer>
                        <IconButton icon={<AlignJustify />} style={{ borderRadius: "50%", position: "absolute", top: 10, right: 5, zIndex: 10, color: "var(--text)", backgroundColor: "transparent", boxShadow: "0 3px 6px rgba(0,0,0,0.19), 0 2px 2px rgba(0,0,0,0.23)" }} onClick={() => setOpen(!open)}/>
                        <Slideshow currentIndex={currentQuestionNum} setCurrentIndex={setCurrentQuestionNum} nodes={questions.map((q) => (
                            <QuestionWrapper question={q} key={q.id} />
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
