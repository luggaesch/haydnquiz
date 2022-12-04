import {useGameContext} from "../../contexts/GameContext";
import {useState} from "react";
import {GamePhases} from "../../types/match";
import Team from "../../types/team";
import {Jokers} from "../../types/joker";
import {ThemeSwitcherProvider} from "react-css-theme-switcher";
import RightDrawer from "../../components/view/right-drawer";
import Soundcheck from "../../components/match/soundcheck";
import TopicOverlayToggle from "../../components/view/topic-overlay";
import TeamDisplay from "../../components/match/team-display";
import TopicQueue from "../../components/match/topic-queue";
import ProgressControl from "../../components/match/progress-control";
import {FaAlignJustify} from "react-icons/fa";
import PopupContainer from "../../components/questions/parts/popup-container";
import Topics from "../../components/match/topics";
import MatchContent from "./match-content";
import styles from "./match.module.css";

const themes = {
    light: '/theme/light.css',
    dark: '/theme/dark.css',
};

export default function MatchComponent() {
    const { match, setPhase, setCurrentQuestionNum, addJokerToTeam, assignJokerToQuestion } = useGameContext();
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

    function handleJokerAdd(team: Team, jokerName: Jokers) {
        addJokerToTeam(team, jokerName);
    }

    function handleJokerAssign(jokerId: string) {
        assignJokerToQuestion(jokerId, match.quiz.questions[match.currentQuestionIndex]._id!);
    }

    return (
        <ThemeSwitcherProvider defaultTheme="dark" themeMap={themes}>
            <RightDrawer open={open} setOpen={setOpen}>
                <div className={styles.introButtons}>
                    <Soundcheck open={open} />
                    <TopicOverlayToggle setShowOverlay={setShowOverlay} />
                </div>
                <div className={styles.teamContainer}>
                    <TeamDisplay jokers={match.jokers} teams={match.teams} handleJokerAssign={handleJokerAssign} handleJokerAdd={handleJokerAdd} currentJokerName={match.quiz.questions[match.currentQuestionIndex].jokerReward} />
                </div>
                <div className={styles.progressContainer}>
                    <TopicQueue handleQueueItemClick={handleQueueItemClick} currentQuestionIndex={match.currentQuestionIndex} questions={match.quiz.questions} />
                    <ProgressControl currentIndex={match.currentQuestionIndex} maxIndex={match.quiz.questions.length - 1}  onTransition={(modifier) => setCurrentQuestionNum(match.currentQuestionIndex + modifier)} />
                </div>
            </RightDrawer>
            <div className={styles.expandIcon} onClick={() => setOpen(!open)}>
                <FaAlignJustify />
            </div>
            <PopupContainer open={showOverlay} setOpen={setShowOverlay} >
                <Topics />
            </PopupContainer>
            <MatchContent  />
        </ThemeSwitcherProvider>
    )
}