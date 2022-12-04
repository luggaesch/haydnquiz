import Match from "../../types/match";
import {FaPlay} from "react-icons/fa";
import TeamDisplay from "../../components/match/team-display";
import QuestionWrapper from "../question";
import Link from "next/link";
import styles from "./match.module.css";

export default function MatchItem({ match }: { match: Match }) {

    return (
        <div className={styles.matchItem}>
            <div className={styles.matchDate}>Match from: {new Date(Date.parse(match.startTime)).toDateString()}</div>
            <div className={styles.matchOverview}>
                <div className={styles.quizStateContainer}>
                    <div className={styles.quizStateInfo}>
                        <div>Quiz: {match.quiz.name}</div>
                        <div>State: {match.phase}</div>
                        <div>Answers: {match.answers.length}</div>
                        <div>Current Question: </div>
                    </div>
                    <QuestionWrapper fontSize={5} hideTimer={true} hideOverlay={true} question={match.quiz.questions[match.currentQuestionIndex]} />
                </div>
                <TeamDisplay jokers={match.jokers} currentJokerName={undefined} handleJokerAdd={() => {}} handleJokerAssign={() => {}} teams={match.teams} />
            </div>
            <div className={styles.resumeContainer}>
                <Link href={"/quiz/play/" + match._id}>
                    <a>
                        <FaPlay />
                        <div>Resume</div>
                    </a>
                </Link>
            </div>
        </div>
    )
}
