import {Add, Person} from "@mui/icons-material";
import styles from "../../styles/team.module.css";
import Team from "../../types/team";
import Joker, {Jokers} from "../../types/joker";
import {getIconByJoker} from "../../data/jokers";
import {IconButton} from "@mui/material";

export default function TeamDisplay({ teams, jokers, currentJokerName, handleJokerAdd, handleJokerAssign  }: { teams: Team[], jokers: Joker[], currentJokerName: Jokers | undefined, handleJokerAdd: (team: Team, jokerName: Jokers) => void, handleJokerAssign: (jokerId: string) => void }) {

    return (
        <div className={styles.container}>
            <h3>Teams</h3>
            <div>
                {teams.map((t, index) => {
                    const teamJokers = jokers.filter((j) => j.teamId === t._id);

                    return (
                        <div key={index} className={styles.teamItem}>
                            <div>
                                <p>{t.name}</p>
                                <div>
                                    {[...Array(t.numOfPlayers)].map((e, index) => (
                                        <Person style={{color: t.color}} key={"p_" + index}/>
                                    ))}
                                </div>
                            </div>
                            <div style={{ display: "flex", alignItems: "center", gap: 8, borderLeft: "1px solid #111111B0", paddingLeft: 16 }}>
                                {currentJokerName && !jokers.find((j) => j.name === currentJokerName && j.teamId === t._id) && <IconButton style={{ borderRadius: "50%", backgroundColor: "#222" }} onClick={() => handleJokerAdd(t, currentJokerName)}>
                                    <Add style={{ color: "white" }} />
                                </IconButton>}
                                {teamJokers.map((j) => (
                                    <div key={j._id} onClick={() => handleJokerAssign(j._id!)} style={{ cursor: "pointer" }}>
                                        {getIconByJoker(j.name, j.assignedQuestionId ? t.color + "30" : t.color, 32, 32)}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
