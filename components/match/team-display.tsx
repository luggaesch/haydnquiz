import {Add, Person} from "@mui/icons-material";
import styles from "../../styles/team.module.css";
import Team from "../../types/team";
import Joker, {Jokers} from "../../types/joker";
import {getIconByJoker} from "../../data/jokers";
import {IconButton, Popover} from "@mui/material";
import {usePopupState} from "material-ui-popup-state/hooks";
import {bindPopover, bindTrigger} from "material-ui-popup-state";
import {useGameContext} from "../../contexts/GameContext";

export default function TeamDisplay({ teams, jokers, currentJokerName, handleJokerAdd, handleJokerToggle, handleJokerDelete, handleJokerTransfer  }: { teams: Team[], jokers: Joker[], currentJokerName: Jokers | undefined, handleJokerAdd: (team: Team, jokerName: Jokers) => void, handleJokerToggle: (jokerId: string) => void, handleJokerDelete: (jokerId: string) => void, handleJokerTransfer: (jokerId: string, teamId: string) => void }) {

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
                                {teamJokers.map((j, index) => (
                                    <JokerIcon joker={j} team={t} key={index} handleToggle={() => handleJokerToggle(j._id!)} handleDelete={() => handleJokerDelete(j._id!)} handleTransfer={(teamId) => handleJokerTransfer(j._id!, teamId)}  />
                                ))}
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

function JokerIcon({ joker, team, handleToggle, handleTransfer, handleDelete }: { joker: Joker, team: Team, handleToggle: () => void, handleTransfer: (teamId: string) => void, handleDelete: () => void }) {
    const popupState = usePopupState({
        variant: 'popover',
        popupId: 'demoPopover',
    })

    return (
        <div>
            <div style={{ cursor: "pointer" }} {...bindTrigger(popupState)}>
                {getIconByJoker(joker.name, joker.assignedQuestionId ? team.color + "30" : team.color, 32, 32)}
            </div>
            <Popover
                {...bindPopover(popupState)}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
            >
                <div style={{ backgroundColor: "#222", color: "white", fontSize: 22, width: 200 }}>
                    <div style={{ cursor: "pointer", textAlign: "center", borderBottom: "1px solid #11111180", padding: 10 }} onClick={() => {
                        handleToggle();
                        popupState.close();
                    }}>{!joker.assignedQuestionId ? "Anwenden" : "Lösen"}</div>
                    <div style={{ cursor: "pointer", textAlign: "center", borderBottom: "1px solid #11111180", padding: 10 }} onClick={() => {
                        handleDelete();
                        popupState.close();
                    }}>Entfernen</div>
                    <Transfer handleClick={(teamId) => {
                        handleTransfer(teamId);
                        popupState.close();
                    }} team={team} />
                </div>
            </Popover>
        </div>
    )
}

function Transfer({ team, handleClick }: { team: Team, handleClick: (teamId: string) => void  }) {
    const { match } = useGameContext();
    const popupState = usePopupState({
        variant: 'popover',
        popupId: 'demoPopover',
    })

    return (
        <div>
            <div {...bindTrigger(popupState)} style={{ cursor: "pointer", textAlign: "center", padding: 10 }}>Übertragen</div>
            <Popover
                {...bindPopover(popupState)}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
            >
                <div style={{ backgroundColor: "#222", color: "white", fontSize: 22, width: 200, marginTop: 10 }}>
                    {match.teams.filter((t) => t._id !== team._id).map((t, index) => (
                        <div key={index} style={{ cursor: "pointer", textAlign: "center", borderBottom: "1px solid #11111180", padding: 10 }} onClick={() => {
                            handleClick(t._id!);
                            popupState.close();
                        }}>
                            Zu {t.name}
                        </div>
                    ))}
                </div>
            </Popover>
        </div>
    )
}