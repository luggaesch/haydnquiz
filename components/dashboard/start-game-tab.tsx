import {Empty, Form, Select} from "antd";
import Quiz from "../../types/quiz";
import React, {Dispatch, SetStateAction, useMemo, useState} from "react";
import {DashboardTabs} from "../../pages/dashboard";
import {FaPlay, FaPlus} from "react-icons/fa";
import styles from "../../styles/dashboard.module.css";
import Team from "../../types/team";
import {Person} from "@mui/icons-material";
import PopupState, {bindPopover, bindTrigger} from 'material-ui-popup-state';
import Popover from "@mui/material/Popover";
import axios from "axios";
import {useRouter} from "next/router";
import {Checkbox} from "@mui/material";
import {GamePhases} from "../../types/match";

const {Option} = Select;

export default function NewGameTab({ selectedQuizId, setSelectedQuizId, quizzes, teams, setTab }: { selectedQuizId: string | undefined, setSelectedQuizId: Dispatch<SetStateAction<string | undefined>>, quizzes: Quiz[], teams: Team[], setTab: Dispatch<SetStateAction<DashboardTabs>> }) {
    const { push } = useRouter();
    const [currentlySelectedTeamId, setCurrentlySelectedTeamId] = useState(teams.length > 0 ? teams[0]._id : "");
    const [selectedTeamIds, setSelectedTeamIds] = useState<string[]>([]);
    const selectedTeams = useMemo(() => {
        return teams.filter((t) => selectedTeamIds.includes(t._id!))
    }, [teams, selectedTeamIds]);
    const [showIntro, setShowIntro] = useState(true);
    const [selectableTopics, setSelectableTopics] = useState(true);

    async function handleSubmit() {
        const res = await axios.post("/api/match/create", { quizId: selectedQuizId, phase: selectableTopics ? GamePhases.TopicSelection : showIntro ? GamePhases.Introduction : GamePhases.Playing, teamIds: selectedTeams.map((t) => t._id) });
        push("/quiz/play/" + res.data._id);
    }

    return (
        <div className={styles.dashboardTab}>
            <div style={{ width: "75%", height: "100%", padding: 10, display: "grid", gridTemplateRows: "0.3fr 2fr 0.3fr 0.3fr 0.5fr", gridGap: 15 }}>
                <div className={styles.tabContainer}>
                    <p>Quiz</p>
                    <div>
                        {quizzes.length > 0 ?
                            <div style={{ display: "grid", gridTemplateRows: "1fr 1fr", height: "100%" }}>
                                <Form.Item style={{ background: "transparent" }}>
                                    <Select value={selectedQuizId} onChange={(value) => setSelectedQuizId(value)} style={{ background: "#222" }}>
                                        {quizzes.map((q, index) => (
                                            <Option value={q._id} key={index}>{q.name}</Option>
                                        ))}
                                    </Select>
                                </Form.Item>
                            </div>
                            :
                            <div>
                                <Empty description={false} />
                                <div style={{ width: "100%", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", fontSize: "1em" }}>
                                    <p style={{ margin: "0 0 0.3em 0" }}>No Quizzes yet!</p>
                                    <span onClick={() => setTab(DashboardTabs.Quizzes)} style={{ cursor: "pointer", padding: 10, width: "50%", backgroundColor: "var(--accent)", color: "#222", borderRadius: 50, display: "flex", justifyContent: "center", alignItems: "center",  }}>Create a new Quiz</span>
                                </div>
                            </div>
                        }
                    </div>
                </div>
                <div className={styles.tabContainer} style={{ gridTemplateRows: "1fr 4fr" }}>
                    <div>Teams</div>
                    {teams.length === 0 ?
                        <div>
                            <Empty description={false} />
                            <div style={{ width: "100%", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", fontSize: "1em" }}>
                                <p style={{ margin: "0 0 0.3em 0" }}>No Teams yet!</p>
                                <span onClick={() => setTab(DashboardTabs.Teams)} style={{ cursor: "pointer", padding: 10, width: "50%", backgroundColor: "var(--accent)", color: "#222", borderRadius: 50, display: "flex", justifyContent: "center", alignItems: "center",  }}>Create a new Team</span>
                            </div>
                        </div>
                        :
                        <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gridAutoRows: "14em", fontSize: 12, gridGap: "0.8em" }}>
                            {selectedTeams.length < 10 && <PopupState variant="popover" popupId="demo-popup-popover">
                                {(popupState) => (
                                    <div>
                                        <div {...bindTrigger(popupState)} style={{ height: "100%", border: "2px dashed var(--text)", borderRadius: 12, display: "flex", justifyContent: "center", alignItems: "center", fontSize: "2em" }}> <FaPlus /></div>
                                        <Popover
                                            {...bindPopover(popupState)}
                                            anchorOrigin={{
                                                vertical: 'center',
                                                horizontal: 'right',
                                            }}
                                            transformOrigin={{
                                                vertical: "center",
                                                horizontal: -10,
                                            }}
                                            style={{ background: "transparent" }}
                                        >
                                            <div style={{ background: "#222222", height: 800, width: 800, borderRadius: 12, overflowY: "hidden", padding: 20, display: "flex", justifyContent: "center", flexDirection: "column" }}>
                                                <div style={{ display: "grid", gridAutoRows: 300, gridTemplateColumns: "50%", overflowY: "auto", width: "100%", gridGap: 10, justifyContent: "center", marginBottom: "0.5em" }}>
                                                    {teams.map((t) => (
                                                        <div onClick={() => setCurrentlySelectedTeamId(t._id)} key={t._id} style={{ cursor: "pointer", borderRadius: 12, backgroundColor: t._id === currentlySelectedTeamId ? "#333" : "var(--question-item)", display: "grid", gridTemplateRows: "1fr 3fr", boxShadow: "0 8px 16px rgba(0,0,0,0.19), 0 3px 3px rgba(0,0,0,0.23)" }}>
                                                            <div style={{ textAlign: "center", fontSize: "3em", borderBottom: "1px solid var(--dark-paper)", color: "var(--text)" }}>{t.name}</div>
                                                            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", padding: "0.5em" }}>
                                                                {[...Array(t.players.length)].map((e, index) => (
                                                                    <Person style={{ cursor: "pointer", fontSize: "4em", color: t.color }} key={"p_" + index} />
                                                                ))}
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                                <div onClick={() => {
                                                    setSelectedTeamIds([...selectedTeamIds, currentlySelectedTeamId!]);
                                                    popupState.close();
                                                }} style={{ backgroundColor: "var(--accent)", color: "#222", display: "flex", justifyContent: "center", alignItems: "center", borderRadius: 12, height: "4em", fontSize: "2em" }}>Submit</div>
                                            </div>
                                        </Popover>
                                    </div>
                                )}
                            </PopupState>}
                            {selectedTeams.map((t) => (
                                <div onClick={() => setSelectedTeamIds(selectedTeamIds.filter((id) => t._id !== id))} key={t._id} style={{ cursor: "pointer", borderRadius: 12, backgroundColor: "var(--question-item)", display: "grid", gridTemplateRows: "1fr 3fr", boxShadow: "0 8px 16px rgba(0,0,0,0.19), 0 3px 3px rgba(0,0,0,0.23)" }}>
                                    <div style={{ textAlign: "center", fontSize: "2em", borderBottom: "1px solid var(--dark-paper)" }}>{t.name}</div>
                                    <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", padding: "0.5em" }}>
                                        {[...Array(t.players.length)].map((e, index) => (
                                            <Person style={{ cursor: "pointer", fontSize: "3em", color: t.color }} key={"p_" + index} />
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                        }
                </div>
                <div className={styles.tabContainer}>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 5fr", alignItems: "center" }}><Checkbox onChange={() => setShowIntro(!showIntro)} checked={showIntro} style={{ width: 50 }} />Show Introduction</div>
                </div>
                <div className={styles.tabContainer}>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 5fr", alignItems: "center" }}><Checkbox onChange={() => setSelectableTopics(!selectableTopics)} checked={selectableTopics} style={{ width: 50 }} />Allow Topic Selection</div>
                </div>
                <div onClick={handleSubmit} className={styles.tabSubmit}><FaPlay /> </div>
            </div>
        </div>
    )
}