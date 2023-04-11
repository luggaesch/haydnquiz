import QuizEvent from "../../types/quizEvent";
import {useMemo, useState} from "react";
import TeamInput from "./signup/team-input";
import Dialog from "../../components/dialogs";
import {Avatar, Box} from "@mui/material";
import SoloInput from "./signup/solo-input";
import {Check, Group, Person} from "@mui/icons-material";

export default function EventPage({ event }: { event: QuizEvent }) {
    const [currentEvent, setCurrentEvent] = useState(event);
    const votesByDay = useMemo(() => {
        return currentEvent.availableDays.map((day) => ({ day, votes:
                currentEvent.solos.filter((el) => el.selectedDays.includes(day)).length
                +
                currentEvent.selectedDaysByTeamId.filter((el) => el.days.includes(day)).map((el) => currentEvent.teams.find((t) => el.teamId === t._id)?.players.length ?? 0).reduce((a, b) => a + b, 0) } ))
    }, [currentEvent]);

    return (
        <div style={{ width: "100%", overflowY: "auto"  }}>
            <div style={{ width: "100%", padding: 10, color: "white" }}>
                <div style={{ width: "100%", minHeight: 300, borderRadius: 8, backgroundColor: "var(--question-item)", display: "grid", gridTemplateColumns: "1fr 2fr" } }>
                    <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                        <Avatar style={{ width: 80, height: 80 }} src={"/images/haydnquiz.jpg"} />
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
                        <h1 style={{ color: "white", fontWeight: "bold" }}>{currentEvent.name}</h1>
                        <p style={{ fontSize: 15 }}>{currentEvent.description}</p>
                    </div>
                </div>
                <div style={{ marginTop: 10  }}>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", alignItems: "center", marginBottom: 30 }}>
                        <h2 style={{ color: "#bbb", margin: 0,  fontSize: 16,  padding: 0 }}>Teams</h2>
                        <div style={{ padding: 4, borderRadius: 4, display: "flex", flexDirection: "row", gap: 6, justifyContent: "center" }}>
                            <div style={{ display: "flex", flexDirection: "row", alignItems: "center", width: 60, gap: 8, backgroundColor: "#282828", padding: "4px 8px", borderRadius: 8 }}>
                                <Group style={{ fontSize: 18 }} />
                                <p style={{ padding: 0, margin: 0, fontWeight: "bold" }}>{currentEvent.teams.length}</p>
                            </div>
                            <div style={{ display: "flex", flexDirection: "row", alignItems: "center", width: 60, gap: 8, backgroundColor: "#282828", padding: "4px 8px", borderRadius: 8 }}>
                                <Person style={{ fontSize: 18 }} />
                                <p style={{ padding: 0, margin: 0, fontWeight: "bold" }}>{currentEvent.solos.length + (currentEvent.teams.length === 0 ? 0 : currentEvent.teams.map((t) => t.players.length).reduce((a, b) => a + b))}</p>
                            </div>
                        </div>
                    </div>
                    <Dialog HandlerElement={Box} handlerContent={
                        <div style={{ cursor: "pointer", border: "1px solid var(--accent)", borderRadius: 8, backgroundColor: "#28282840", padding: "12px 8px", marginBottom: 8, display: "flex", justifyContent: "center", alignItems: "center" }}>
                            <p style={{ padding: 0, margin: 0 }}>Dein Team anmelden</p>
                        </div>
                    }>
                        <TeamInput event={event} onSubmit={(event) => setCurrentEvent(event)} />
                    </Dialog>
                    <Dialog HandlerElement={Box} handlerContent={
                        <div style={{ cursor: "pointer", border: "1px solid var(--accent)", borderRadius: 8, backgroundColor: "#28282840", padding: "12px 8px", marginBottom: 8, display: "flex", justifyContent: "center", alignItems: "center" }}>
                            <p style={{ padding: 0, margin: 0 }}>Alleine anmelden</p>
                        </div>
                    }>
                        <SoloInput event={event} onSubmit={(event) => setCurrentEvent(event)} />
                    </Dialog>
                </div>
                <div style={{ marginTop: 30  }}>
                    <h2 style={{ color: "#bbb", margin: 0,  fontSize: 16,  padding: 0 }}>Terminabstimmung</h2>
                    <ul style={{ listStyle: "none", padding: 0, display: "flex", flexDirection: "column", gap: 8, alignItems: "center", marginTop: 10 }}>
                        {currentEvent.availableDays.sort((a, b) => {
                            const votesA = votesByDay.find((e) => e.day === a)?.votes ?? 0,
                                votesB = votesByDay.find((e) => e.day === b)?.votes ?? 0;
                            return (votesB - votesA);
                        }).map((d, index) => (
                            <li style={{ display: "flex", flexDirection: "row", gap: 4, backgroundColor: "#282828", padding: "8px 20px", borderRadius: 4 }} key={index}>
                                <div style={{ borderRight: "1px solid #11111180", padding: "0 10px 0 0", fontWeight: "bold" }}>{new Date(Date.parse(d)).toLocaleDateString("de-DE", { day: "numeric", month: "long" })}</div>
                                <div style={{ padding: "0 0 0 10px", display: "flex", alignItems: "center", gap: 4 }}>
                                    <Check style={{ fontSize: 14, color: "var(--accent)" }} />
                                    <p style={{ fontWeight: "bold", padding: 0, margin: 0 }}>{votesByDay.find((e) => e.day === d)?.votes ?? 0}</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    )
}