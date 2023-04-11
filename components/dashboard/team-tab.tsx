import Team from "../../types/team";
import styles from "../../styles/dashboard.module.css";
import {FaPlus} from "react-icons/fa";
import Popover from '@mui/material/Popover';
import PopupState, {bindPopover, bindTrigger} from 'material-ui-popup-state';
import TeamInput from "../view/team-input";
import {Person} from "@mui/icons-material";
import React from "react";

export default function TeamTab({ teams, updateTeams }: { teams: Team[], updateTeams: (name: string, numOfMembers: number, color: string) => void }) {

    return (
        <div className={styles.dashboardTab}>
            <div style={{ width: "100%", height: "100%", padding: 20, display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gridAutoRows: 300, gridGap: 20, overflowY: "scroll" }}>
                <PopupState variant="popover" popupId="demo-popup-popover">
                    {(popupState) => (
                        <div>
                            <div style={{ width: "100%", height: "100%", border: "2px dashed var(--text)", borderRadius: 12, display: "flex", justifyContent: "center", alignItems: "center", fontSize: "2em" }} {...bindTrigger(popupState)}>
                                <FaPlus />
                            </div>
                            <Popover
                                {...bindPopover(popupState)}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'center',
                                }}
                                transformOrigin={{
                                    vertical: -5,
                                    horizontal: 'center',
                                }}
                                style={{ background: "transparent" }}
                            >
                                <div style={{ background: "#282828", height: 400, width: 400, borderRadius: 12 }}>
                                    <TeamInput onSubmit={(name, numOfMembers, color) => {
                                        updateTeams(name, numOfMembers, color);
                                        popupState.close()
                                    }} />
                                </div>
                            </Popover>
                        </div>
                    )}
                </PopupState>
                {teams.map((t) => (
                    <div key={t._id} style={{ borderRadius: 12, backgroundColor: "var(--question-item)", display: "grid", gridTemplateRows: "1fr 3fr" }}>
                        <div style={{ textAlign: "center", fontSize: "3em", borderBottom: "1px solid var(--dark-paper)" }}>{t.name}</div>
                        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", padding: 10 }}>
                            {[...Array(t.players.length)].map((e, index) => (
                                <Person style={{ cursor: "pointer", fontSize: "4rem", color: t.color }} key={"p_" + index} />
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}