import Match from "../../types/match";
import {FaPlay} from "react-icons/fa";
import TeamDisplay from "./team-display";
import QuestionWrapper from "../questions/wrapper";

export default function MatchItem({ match }: { match: Match }) {
    console.log(match);

    return (
        <div style={{ display: "grid", gridTemplateRows: "1fr 5fr 1fr", height: "70%", background: "var(--dark-paper)", borderRadius: 8, width: "70%", marginTop: 10, boxShadow: "0 8px 16px rgba(0,0,0,0.19), 0 3px 3px rgba(0,0,0,0.23)" }}>
            <div style={{ fontSize: "1.8em", color: "var(--text)", borderBottom: "1px solid var(--dark-background)", display: "flex", justifyContent: "center", alignItems: "center" }}>Match from: {new Date(Date.parse(match.startTime)).toDateString()}</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr",  }}>
                <div style={{ display: "grid", gridTemplateRows: "2fr 3fr", borderRight: "1px solid var(--dark-background)" }}>
                    <div style={{ fontSize: "1.8em",  padding: 20 }}>
                        <div>Quiz: {match.quiz.name}</div>
                        <div>State: {match.state}</div>
                        <div>Answers: {match.answers.length}</div>
                        <div>Current Question: </div>
                    </div>
                    <QuestionWrapper fontSize={5} hideTimer={true} hideOverlay={true} question={match.quiz.questions[match.currentQuestionIndex]} />
                </div>
                <TeamDisplay teams={match.teams} />
            </div>
            <div style={{ borderTop: "1px solid var(--dark-background)", display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column",  fontSize: "2em" }}>
                <FaPlay style={{ color: "var(--text)" }} />
                <div style={{ fontSize: "1em", color: "var(--text)" }}>Resume</div>
            </div>
        </div>
    )
}
