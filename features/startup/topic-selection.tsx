import Team from "../../types/team";
import {MenuItem, Select} from "@mui/material";
import {getColorByTopic, getIconByTopic, Topics} from "../../data/topics";
import {useState} from "react";
import {Person} from "@mui/icons-material";
import {getEnumKeys} from "../../lib/utils/enum";
import {useGameContext} from "../../contexts/GameContext";

export default function TopicSelection({ teams, onSubmit }: { teams: Team[], onSubmit: () => void }) {
    const [selectedTopics, setSelectedTopics] = useState<(Topics | string)[]>(teams.map(() => ""));
    const { setSelectedTopics: uploadTopics } = useGameContext();

    function handleSubmit() {
        if (selectedTopics.find((s) => s === "")) return;
        const currentTeams = [...teams];
        currentTeams.forEach((t, index) => {
            t.selectedTopic = selectedTopics[index] as Topics;
        });
        console.log(teams);
        onSubmit();
        uploadTopics(teams);
    }

    return (
        <div style={{ width: "100vw", height: "100vh", overflowY: "scroll", display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", padding: 10 }}>
            <div style={{ width: "100%", overflowY: "scroll", display: "grid", gridTemplateColumns: "1fr 1fr", justifyContent: "center", gap: 20, padding: 20 }}>
                {teams.map((t, index) => {
                    return (
                        <div key={index} style={{ height: 300, zIndex: 2, boxShadow: "var(--elevation-shadow)", borderRadius: 8, backgroundColor: "#222222", padding: 20, display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center", gap: 30  }}>
                            <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", width: 200, borderRight: "2px solid #11111180" }}>
                                <p style={{ color: "white", fontSize: 40 }}>{t.name}</p>
                                <div>
                                    {[...Array(t.players.length)].map((e, index) => (
                                        <Person style={{color: t.color}} key={"p_" + index}/>
                                    ))}
                                </div>
                            </div>
                            <Select style={{ width: 400 }} value={Topics[ selectedTopics[index] as keyof typeof Topics]} onChange={(event) => {
                                const currentSelectedTopics = [...selectedTopics];
                                currentSelectedTopics[index] = event.target.value;
                                console.log(currentSelectedTopics);
                                setSelectedTopics(currentSelectedTopics);
                            }}>
                                {getEnumKeys(Topics).map((key, index) => {
                                    const Icon = getIconByTopic(Topics[key]);
                                    return (
                                        <MenuItem value={Topics[key]} key={index} style={{ display: "flex", justifyContent: "center", alignItems: "center", border: "none" }}>
                                            <div style={{
                                                color: "#222",
                                                fontSize: "4rem",
                                                backgroundColor: getColorByTopic(Topics[key]),
                                                borderRadius: 10,
                                                display: "flex",
                                                justifyContent: "center",
                                                alignItems: "center",
                                                boxShadow: "0 8px 16px rgba(0,0,0,0.19), 0 3px 3px rgba(0,0,0,0.23)",
                                            }}>
                                                <Icon style={{fontSize: "inherit"}}/>
                                            </div>
                                        </MenuItem>
                                    )
                                })}
                            </Select>
                        </div>
                    )
                })}
            </div>
            <div onClick={handleSubmit} style={{ zIndex: 2, cursor: "pointer", width: "50%", backgroundColor: "var(--accent)", fontSize: 24, height: 100, display: "flex", justifyContent: "center", alignItems: "center", borderRadius: 12 }}>Auswahl bestätigen</div>
        </div>

    )
}