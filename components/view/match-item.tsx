import Match from "../../types/match";
import {FaPlay} from "react-icons/fa";
import TeamDisplay from "./team-display";

export default function MatchItem({ match }: { match: Match }) {

    return (
        <div style={{ display: "grid", gridTemplateRows: "1fr 5fr", height: "30vh", background: "var(--dark-paper)", borderRadius: 8, width: "20vw", marginTop: 10 }}>
            <div style={{ fontSize: "1.8em", color: "var(--text)", borderBottom: "1px solid var(--dark-background)", display: "flex", justifyContent: "center", alignItems: "center" }}>{match.quiz.name}</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr",  }}>
                <div style={{ borderRight: "1px solid var(--dark-background)", display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column",  fontSize: "2em" }}>
                    <FaPlay style={{ color: "var(--text)" }} />
                    <div style={{ fontSize: "1em", color: "var(--text)" }}>Resume</div>
                </div>
                <TeamDisplay teams={match.teams} />
            </div>
        </div>
    )
}
