import {useMemo} from "react";
import Team from "../../types/team";
import {GiLaurelsTrophy} from "react-icons/gi";
import {TrophyFilled} from "@ant-design/icons";
import Match from "../../types/match";
import CoverOverlay from "../view/cover-overlay";

export default function TrophyScreen({ match }: { match: Match }) {
    const teamResults = useMemo<{ team: Team, points: number}[]>(() => {
        if (!match) return [];
        return match.teams.map((team) => ({
            team,
            points: match!.answers.filter((answer) => answer.teamId === team._id).map((a) => a.points).reduce((partialSum, a) => partialSum + a, 0)
        })).sort((a, b) => {
            if (a.points > b.points) return 1;
            else if (a.points < b.points) return -1;
            return 0;
        }).reverse();
    }, [match]);

    if (teamResults.length === 0) {
        return <div>No Teams!</div>
    }

    return (
        <div style={{ display: "grid", justifyContent: "center", gridTemplateRows: "5fr 1fr", gridTemplateColumns: "1fr", gridGap: 50, width: "100vw", height: "100vh", color: "white", padding: 20 }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", width: "100%" }}>
                <div style={{ display: "flex", justifyContent: "flex-end", flexDirection: "column", alignItems: "center" }}>
                    {teamResults.length >= 2 && <div style={{ position: "relative", border: "3px dashed " + teamResults[1].team.color, width: "80%", fontSize: "3rem", display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center", background: "var(--question-item)", borderRadius: 12, padding: 20, boxShadow: "0 8px 16px rgba(0,0,0,0.19), 0 3px 3px rgba(0,0,0,0.23)" }}>
                        <CoverOverlay />
                        <TrophyFilled style={{ fontSize: "14rem", color: "#909497" }} />
                        <div style={{ fontWeight: "bold" }}>{teamResults[1].team.name}</div>
                        <div>{teamResults[1].points} Points</div>
                    </div>}
                </div>
                <div style={{ width: "100%", display: "flex", justifyContent: "flex-end", flexDirection: "column", alignItems: "center" }}>
                    <div style={{ position: "relative", transform: "translateY(-25%)", border: "4px dashed " + teamResults[0].team.color, width: "100%", fontSize: "4rem", display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center", background: "var(--question-item)", borderRadius: 12, padding: 20, boxShadow: "0 8px 16px rgba(0,0,0,0.19), 0 3px 3px rgba(0,0,0,0.23)" }}>
                        <CoverOverlay />
                        <GiLaurelsTrophy style={{ fontSize: "18rem", color: "#ffd045" }} />
                        <div style={{ fontWeight: "bold" }}>{teamResults[0].team.name}</div>
                        <div>{teamResults[0].points} Points</div>
                    </div>
                </div>
                <div style={{ display: "flex", justifyContent: "flex-end", flexDirection: "column", alignItems: "center" }}>
                    {teamResults.length >= 3 && <div style={{ position: "relative", border: "3px dashed " + teamResults[2].team.color, width: "80%", fontSize: "3rem", display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center", background: "var(--question-item)", borderRadius: 12, padding: 20, boxShadow: "0 8px 16px rgba(0,0,0,0.19), 0 3px 3px rgba(0,0,0,0.23)" }}>
                        <CoverOverlay />
                        <TrophyFilled style={{ fontSize: "11rem", color: "#6a5248" }} />
                        <div style={{ fontWeight: "bold" }}>{teamResults[2].team.name}</div>
                        <div>{teamResults[2].points} Points</div>
                    </div>}
                </div>
            </div>
            <div style={{ display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center", width: "100%", gap: 30 }}>
                {teamResults.slice(3).map((result, index) => (
                    <div key={index} style={{ position: "relative", borderRadius: 12, border: "3px dashed " + result.team.color, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", fontSize: "3em", width: 300, height: 300, background: "#282828", boxShadow: "0 8px 16px rgba(0,0,0,0.19), 0 3px 3px rgba(0,0,0,0.23)" }}>
                        <CoverOverlay />
                        <div style={{ fontWeight: "bold" }}>{result.team.name}</div>
                        <div>{result.points} Points</div>
                    </div>
                ))}
            </div>
        </div>
    )
}