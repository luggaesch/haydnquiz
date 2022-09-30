import {GetServerSideProps} from "next";
import axios from "axios";
import Match, {GamePhases} from "../../../types/match";
import MatchView from "../../../components/questions/match-view";
import {ThemeSwitcherProvider} from 'react-css-theme-switcher';
import Soundcheck from "../../../components/view/soundcheck";
import TopicOverlayToggle from "../../../components/view/topic-overlay";
import TeamDisplay from "../../../components/view/team-display";
import TopicQueue from "../../../components/view/topic-queue";
import ProgressControl from "../../../components/view/progress-control";
import RightDrawer from "../../../components/view/right-drawer";
import {useState} from "react";
import {GameProvider, useGameContext} from "../../../contexts/GameContext";
import {FaAlignJustify} from "react-icons/fa";
import Topics from "../../../components/view/topics";
import PopupContainer from "../../../components/questions/parts/popup-container";

const themes = {
    light: '/theme/light.css',
    dark: '/theme/dark.css',
};

export const getServerSideProps: GetServerSideProps = async (context) => {
    const result = await axios.get(`${process.env.SERVER_URL}/api/match/fetchById/` + context.query.matchId);
    return {
        props: { match: JSON.parse(JSON.stringify(result.data)) }
    }
}

export default function MatchWrapper({ match }: { match: Match }) {
    return (
        <GameProvider match={match} >
            <MatchPage />
        </GameProvider>
    )
}

function MatchPage() {
    const { match, setPhase, setCurrentQuestionNum } = useGameContext();
    const [open, setOpen] = useState(false);
    const [showOverlay, setShowOverlay] = useState(false);

    function handleQueueItemClick(index: number) {
        if (match.phase < GamePhases.Playing) {
            setPhase(GamePhases.Playing);
        } else if (match.phase < GamePhases.Solutions && match.phase > GamePhases.Playing) {
            setPhase(GamePhases.Solutions);
        }
        setCurrentQuestionNum(index);
    }

    return (
        <ThemeSwitcherProvider defaultTheme="dark" themeMap={themes}>
            <RightDrawer open={open} setOpen={setOpen}>
                <div style={{ width: "100%", display: "grid", height: 80, gridTemplateColumns: "1fr 1fr 1fr 2fr", gridGap: 10 }}>
                    <Soundcheck open={open} />
                    <TopicOverlayToggle setShowOverlay={setShowOverlay} />
                </div>
                <div style={{ backgroundColor: "#282828", padding: 10, borderRadius: 12, boxShadow: "0 8px 16px rgba(0,0,0,0.10), 0 3px 3px rgba(0,0,0,0.15)" }}>
                    <TeamDisplay teams={match.teams} />
                </div>
                <div style={{ display: "grid", gridTemplateRows: "2fr 3fr" }}>
                    <TopicQueue handleQueueItemClick={handleQueueItemClick} currentQuestionIndex={match.currentQuestionIndex} questions={match.quiz.questions} />
                    <ProgressControl currentIndex={match.currentQuestionIndex} maxIndex={match.quiz.questions.length - 1}  onTransition={(modifier) => setCurrentQuestionNum(match.currentQuestionIndex + modifier)} />
                </div>
            </RightDrawer>
            <div style={{ width: 35, height: 35, display: "flex", justifyContent: "center", alignItems: "center", borderRadius: "50%", position: "absolute", top: 10, right: 5, zIndex: 10, color: "var(--text)", backgroundColor: "transparent", boxShadow: "0 3px 6px rgba(0,0,0,0.19), 0 2px 2px rgba(0,0,0,0.23)" }} onClick={() => setOpen(!open)}>
                <FaAlignJustify />
            </div>
            <PopupContainer open={showOverlay} setOpen={setShowOverlay} >
                <Topics />
            </PopupContainer>
            <MatchView  />
        </ThemeSwitcherProvider>
    )
}
