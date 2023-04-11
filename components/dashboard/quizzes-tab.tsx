import Quiz from "../../types/quiz";
import React, {Dispatch, SetStateAction, useState} from "react";
import PopupState, {bindPopover, bindTrigger} from "material-ui-popup-state";
import {FaPlus} from "react-icons/fa";
import styles from "../../styles/dashboard.module.css";
import Popover from "@mui/material/Popover";
import {getColorByTopic, getIconByTopic} from "../../data/topics";
import {EditOutlined, PlayArrowOutlined} from "@mui/icons-material";
import {DashboardTabs} from "../../pages/dashboard";
import {Input} from "antd";
import Link from "next/link";
import Question from "../../types/questions";

export default function QuizzesTab({ quizzes, setTab, setSelectedQuizId, updateQuizzes }: { quizzes: Quiz[], setTab: Dispatch<SetStateAction<DashboardTabs>>, setSelectedQuizId: Dispatch<SetStateAction<string | undefined>>, updateQuizzes: (name: string) => void }) {
    const [quizName, setQuizName] = useState("")

    return (
        <div className={styles.dashboardTab}>
            <div style={{ width: "100%", height: "100%", padding: 20, display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gridAutoRows: 600, gridGap: 20, overflowY: "scroll" }}>
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
                                <div style={{ background: "#282828", height: 300, width: 400, borderRadius: 12 }}>
                                    <div style={{ display: "grid", gridTemplateRows: "1fr 1fr", padding: 10, height: "100%" }}>
                                        <Input type={"text"} placeholder={"Name"} style={{ color: "var(--text)", fontSize: "1.5rem", width: "100%", backgroundColor: "transparent", margin: 0, border: "none", boxShadow: "none" }} value={quizName} onChange={(event) => setQuizName(event.target.value)} />
                                        <div onClick={() => {
                                            updateQuizzes(quizName);
                                            popupState.close();
                                        }} style={{ backgroundColor: "var(--accent)", color: "#222", display: "flex", justifyContent: "center", alignItems: "center", borderRadius: 12 }}>Submit</div>
                                    </div>
                                </div>
                            </Popover>
                        </div>
                    )}
                </PopupState>
                {[...quizzes].reverse().map((quiz) => (
                    <div key={quiz._id} style={{ borderRadius: 12, backgroundColor: "var(--question-item)", display: "grid", gridTemplateRows: "1fr 2fr 1fr" }}>
                        <div style={{ textAlign: "center", display: "flex", flexDirection: "column", justifyContent: "center", fontSize: "3em", borderBottom: "1px solid var(--dark-paper)" }}>{quiz.name}</div>
                        <div style={{ width: "100%", display: "grid", gridTemplateColumns: "repeat(auto-fill, 50px)", marginTop: 20, padding: 20 }}>
                            {quiz.questions.map((q, index) => {
                                const question = q as Question;
                                const Icon = getIconByTopic(question.topic);
                                return (
                                    <div onClick={() => {}} key={index} style={{ cursor: "pointer", fontSize: "1.8rem", height: 50, minWidth: 50, backgroundColor: getColorByTopic(question.topic), color: "#222", display: "flex", alignItems: "center", justifyContent: "center" }}>
                                        <Icon style={{ fontSize: "inherit" }} />
                                    </div>
                                )
                            })}
                        </div>
                        <div style={{ borderTop: "1px solid var(--dark-paper)", display: "grid", gridTemplateColumns: "1fr 1fr" }}>
                            <div onClick={() => {
                                setSelectedQuizId(quiz._id);
                                setTab(DashboardTabs.New);
                            }} style={{ fontSize: "4rem", display: "flex", justifyContent: "center", alignItems: "center" }}>
                                <PlayArrowOutlined fontSize="inherit" />
                            </div>
                            <div style={{ fontSize: "4rem", display: "flex", justifyContent: "center", alignItems: "center", borderRight: "1px solid var(--dark-paper)" }}>
                                <Link href={`/quiz/${quiz._id}`}>
                                    <a>
                                        <EditOutlined fontSize="inherit" style={{ color: "var(--text)" }} />
                                    </a>
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
