import {Team, useTeamContext} from "../../contexts/TeamContext";
import React, {useState} from "react";
import {IconButton, Input} from "rsuite";
import {Add, Person, PersonAdd} from "@mui/icons-material";
import styles from "../../styles/team.module.css";
import {CheckOutline} from "@rsuite/icons";

const teamColors = ["#d05151", "#51c5d0", "#51d053", "#7151d0", "#d0b751", "#b2c3c0"];

export default function TeamInput({ onSubmit }: { onSubmit: () => void }) {
    const [teams, setCurrentTeams] = useState<Team[]>([]);
    const { setTeams } = useTeamContext();

    function addTeamSlot() {
        setCurrentTeams([...teams, { name: "", members: 0, color: teamColors[teams.length] }])
    }

    function handleTeamChange({index, name, members}: {index: number, name?: string, members?: number}) {
        teams[index].name = name ?? teams[index].name;
        teams[index].members = members ?? teams[index].members;
        setCurrentTeams([...teams]);
    }

    return (
        <div style={{ width: "100vw", height: "100vh", position: "relative", justifyContent: "center", alignItems: "center", flexDirection: "column", display: "flex" }}>
            <div style={{ display: "grid", width: "80%", height: "80vh", gridTemplateColumns: "40% 40%", gridTemplateRows: "30% 30% 30%", gridGap: 10, justifyContent: "center"  }}>
                {teams.map((t, index) => (
                    <div key={index} style={{ backgroundColor: "var(--paper)", padding: 20, fontSize: "3rem", borderRadius: 12, border: `1px solid ${t.color}` }}>
                        <Input placeholder={"Team " + (index+1)} style={{ height: "50%", fontSize: "3rem" }} value={t.name} onChange={(value) => handleTeamChange({ index, name: value })} />
                        <div style={{ display: "flex", flexDirection: "row", alignItems: "center", height: "50%" }}>
                            {[...Array(t.members)].map((e, index) => (
                                <Person style={{ fontSize: "4rem", color: t.color }} key={"p_" + index} />
                            ))}
                            <IconButton onClick={() => handleTeamChange({ index, members: teams[index].members + 1 })} style={{ fontSize: "4rem", backgroundColor: "transparent", color: `${teamColors[index]}80`, width: "5vw", height: "5vw" }} icon={<PersonAdd style={{ fontSize: "inherit" }} />} />
                        </div>
                    </div>
                ))}
                <div style={{ display: "flex", justifyContent: "center", alignItems: "center", border: `1px solid ${teamColors[teams.length]}`, borderRadius: 12 }}>
                    <IconButton onClick={() => addTeamSlot()} style={{ fontSize: "4rem", borderRadius: "50%", marginTop: 10, backgroundColor: teamColors[teams.length] ?? "#000", color: "var(--text)", width: "8vw", height: "8vw" }} icon={<Add style={{ fontSize: "inherit" }} />} />
                </div>
            </div>
            {teams.length > 0 && <IconButton className={styles.submitButton} onClick={() => {
                setTeams(teams);
                onSubmit();
            }} icon={<CheckOutline style={{ fontSize: "inherit" }} />} />}
        </div>
    )
}