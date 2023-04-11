import QuizEvent from "../../types/quizEvent";
import {useState} from "react";
import TeamInput from "./team-input";

export default function EventPage({ event }: { event: QuizEvent }) {
    const [currentEvent, setCurrentEvent] = useState(event);
    const [teamInputOpen, setTeamInputOpen] = useState(false);

    return (
        <div style={{ width: "100%", height: "100%", position: "relative" }}>
            <div style={{ width: "100%", display: "grid", gridTemplateRows: "1fr 1fr 1fr", padding: 10, color: "white" }}>
                <div style={{ width: "100%", minHeight: 300, borderRadius: 8, backgroundColor: "var(--question-item)" } }>
                    <h1>{currentEvent.name}</h1>
                    <p>Lorem ipsum dolor lorem ispum lorem isoum</p>
                </div>
                <div>
                    <h2>Teams</h2>
                    <p>Aktuelle Teilnehmer: {currentEvent.teams.length === 0 ? 0 : currentEvent.teams.map((t) => t.players.length).reduce((a, b) => a + b)}</p>
                    <div>{currentEvent.teams.map((t) => (
                        <div key={t._id}>{t.name}</div>
                    ))}</div>
                    <div onClick={() => setTeamInputOpen(true)}>Dein Team anmelden</div>
                </div>
                <div>
                    Aktuell führender Tag
                </div>
            </div>
            {teamInputOpen &&
                <div onClick={() => setTeamInputOpen(false)} style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", backgroundColor: "#111111f0", display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <div onClick={(event) => event.stopPropagation()}  style={{ position: "relative", boxShadow: "var(--elevation-shadow)", width: "50%", minWidth: 300, height: "50%", backgroundColor: "#282828", borderRadius: 4 }}>
                        <TeamInput event={event} onSubmit={(event) => {
                            setCurrentEvent(event);
                            setTeamInputOpen(false);
                        }} />
                    </div>
                </div>
            }
        </div>
    )
}